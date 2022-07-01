import React, { useState, useEffect } from "react";
import "./NewProduct.css";
import Multiselect from "multiselect-react-dropdown";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { parseCategories, captitalizeFirstLetterOfEachWord } from "../../usefulFunc";
// import LinearProgress from '@mui/material/LinearProgress';
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { addProducts } from "../../redux/apiCalls";
import { addCommas, removeNonNumeric } from "../../usefulFunc";
import { CircularProgress } from "@mui/material";

const NewProduct = () => {
  const [formData, setFormData] = useState({});
  const adminUser = useSelector(state => state.adminUser.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  

  useEffect(() => {
    if(adminUser === null){
      navigate("/");
    }
  }, [adminUser, navigate]);

  const categoryOptions = [
    {id: 1, name: "Kit"},
    {id: 2, name: "Moisturising"},
    {id: 3, name: "Rejuvenating"},
    {id: 4, name: "Glowing"},
    {id: 5, name: "Lightening"}, 
    {id: 6, name: "Body Exfoliant"},
    {id: 7, name: "Softening"},
    {id: 8, name: "Brighteniing"},
    {id: 9, name: "Repairing"},
    {id: 10, name: "Hydrating"},
    {id: 11, name: "Strengthening"},
    {id: 12, name: "Soothing"},
    {id: 13, name: "Nourishing"},
    {id: 14, name: "Toning"},
    {id: 15, name: "Purifying"},
    {id: 16, name: "Detoxifying"},
    {id: 17, name: "Pimples Treatment"},
    {id: 18, name: "Uncategorized"},
];

   // const [packingOptionSelectedValues, setPackingOptionSelectedValues] = useState([]);

  // const packingOptions = [
  //   {id: 1, name: "Original"},
  //   {id: 2, name: "Gift"}
  // ];

    // const handlePackingOptionSelect = (selectedList) => {
  //   setPackingOptionSelectedValues(selectedList);
  // }

  // const handlePackingOptionRemove = (selectedList) => {
  //   setPackingOptionSelectedValues(selectedList);
  // }

  const [categorySelectedValues, setCategorySelectedValues] = useState([]);
  const [multiSelectError, setMultiSelectError] = useState("");
  const [formattedNo, setFormattedNo] = useState("");
  // const [file, setFile] = useState({file: "", fileError: ""});

  const handleCategorySelect = (selectedList) => {
    setCategorySelectedValues(selectedList);
  }

  const handleCategoryRemove = (selectedList) => {
    setCategorySelectedValues(selectedList);
  }

  const handleFormattedNo = event => {
    setFormattedNo(addCommas(removeNonNumeric(event.target.value)));
    setFormData({
      ...formData,
      [event.target.name]: addCommas(removeNonNumeric(event.target.value))
    })
  };

  const onSubmit = (data) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if(categorySelectedValues.length === 0){
      setMultiSelectError("please select some categories");
      return;
    }else if(categorySelectedValues.length > 3){
      setMultiSelectError("The minimum amount of categories is 3");
      return;
    }else if(!allowedExtensions.exec(data.img[0].name)){
      alert("Invalid file type");
    }else{
      setLoading(true);
      setMultiSelectError("");
      const {img, productName, ...other} = {...data, categories: parseCategories(categorySelectedValues), inStock: data.inStock === "yes"? true : false, majorProduct: data.inStock === "yes"? true : false};
      const fileName = `IMG-${new Date().getTime()}-enaturals-product-` + img[0].name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, img[0]);

      console.log(productName);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        }, 
        (error) => {
          console.log(error);
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = {img: downloadURL, productName: captitalizeFirstLetterOfEachWord(productName), ...other, price: Number(other.price.replaceAll(",", ""))};
            addProducts(product, dispatch);
            setLoading(false);
            reset();
          });
        }
      );
    }
  };

  return (
    <div className="newProduct">
      {/* <div className="progress">
        {(progress !== 0) && <LinearProgress color="success" value={progress}/>}
      </div> */}
      <div className="pagination">Quick Menu &gt; Create new product</div>
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="newProductItem">
          <label>Image</label>
          <input {...register("img", {required: "You need to upload a file"})} type="file" id="file"/>
          {errors.img && <p className="error">{errors.img.message}</p>}
        </div>
        <div className="newProductItem">
          <label>Product Name</label>
          <input {...register("productName", { required: "please provide a product name" })} type="text" placeholder="Whitening Oil" className="productNameInput"/>
          {errors.productName && <p className="error">{errors.productName.message}</p>}
        </div>
        <div className="newProductItem">
          <label>Short Description</label>
          <input {...register("shortDesc", { required: "please provide a short description of the product" })} type="text" placeholder="Add a brief description..." />
          {errors.shortDesc && <p className="error">{errors.shortDesc.message}</p>}
        </div>
        <div className="newProductItem">
          <label>Long Description</label>
          <textarea {...register("desc", { required: "please provide a long description of the product" })} placeholder="More Product Information"></textarea>
          {errors.desc && <p className="error">{errors.desc.message}</p>}
        </div>
        <div className="newProductItem">
          <label>Major Product</label>
          <select
            className="newProductSelect"
            {...register("majorProduct", { required: "please specify if it is a major product" })}
            id="majorProduct"
          >
            <option value="">Choose Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.majorProduct && <p className="error">{errors.majorProduct.message}</p>}
        </div>
        <div className="newProductItem">
          <label>In Stock</label>
          <select className="newProductSelect"
          {...register("inStock", { required: "please specify if it is in stock" })}
          id="inStock"
          >
            <option value="">Choose Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.inStock && <p className="error">{errors.inStock.message}</p>}
        </div>
        <div className="newProductItem">
          <label>Categories</label>
          <Multiselect 
            options={categoryOptions} 
            style={{chips: {
                background: "#acbfa3"
            },
            searchBox: {
                border: "1px solid gray"
            }}}
            selectedValues={categorySelectedValues}
            onSelect={handleCategorySelect}
            onRemove={handleCategoryRemove}
            displayValue={"name"}
          />
          {(multiSelectError !== "") && <p className="error">{multiSelectError}</p>}
        </div>
        {/* <div className="newProductItem">
          <label>Packaging Options</label>
            <Multiselect 
            options={packingOptions} 
            style={{chips: {
                background: "#acbfa3"
            },
            searchBox: {
                border: "1px solid gray"
            }}}
            selectedValues={packingOptionSelectedValues}
            onSelect={handlePackingOptionSelect}
            onRemove={handlePackingOptionRemove}
            displayValue={"name"}
          />
        </div> */}
        <div className="newProductItem">
          <label>Size</label>
          <select className="newProductSelect" 
          {...register("size", { required: "please select a size" })}
          >
            <option value="">Choose Option</option>
            <option value="No Size">No Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          {errors.size && <p className="error">{errors.size.message}</p>}
        </div>
        <div className="newProductItem">
          <label>Price</label>
          <div className="priceInputContainer">
            <span className="currency">
              ₦
            </span>
            <input  {...register("price", { required: "please provide a price for product" })} type="text" value={formattedNo} placeholder="Price of Product" className="priceInput" onChange={handleFormattedNo}/>
          </div>
          {errors.price && <p className="error">{errors.price.message}</p>}
        </div>
        <button className="newProductButton" type="submit" disabled={loading}>{loading? <CircularProgress size="2rem" className="loader" /> : "Create"}</button>
      </form>
    </div>
  );
};

export default NewProduct;
