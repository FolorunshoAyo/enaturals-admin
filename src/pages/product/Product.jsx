import React, {useState, useEffect, useMemo} from 'react';
import './Product.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Chart from '../../components/Chart/Chart';
// import { productData } from '../../data';
import { Publish } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { userRequest } from '../../requestMethod';
import Multiselect from "multiselect-react-dropdown";
import { updateProduct } from '../../redux/apiCalls';
import { useForm } from 'react-hook-form';
import app from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { parseCategories, commaListed } from "../../usefulFunc";
import { CircularProgress } from '@material-ui/core';

const Product = () => {
    const { pathname } = useLocation();
    const productID = pathname.split("/")[2];
    const product = useSelector(state => state.products.products.find(product => product._id === productID));
    const [pStats, setPStats] = useState([]);
    const [multiSelectError, setMultiSelectError] = useState("");
    const [discountFieldInView, setDiscountPriceInView] = useState(product.discount);
    const [discount, setDiscount] = useState(String(product.discount));
    const [discountPriceErr, setDiscountPriceErr] = useState("");
    const [productImgName, setProductImgName] = useState(product.img);
    const [productImg, setProductImg] = useState("");
    const [loading, setLoading] = useState(false);
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues:{
            shortDesc: product.shortDesc,
            desc: product.desc,
            img: product.img,
            inStock: String(product.inStock),
            majorProduct: String(product.majorProduct),
            price: String(product.price)
        }
    });

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
      
    const prunedCategoryOptions = product.categories.map(category => categoryOptions.find(option => option.name === category));

    const MONTHS = useMemo(() => 
    [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ],
    []
    );

    useEffect(() => {
        const getProductStats = async () => {
        try{
            const res = await userRequest(`/users/stats?pid=${product.id}`);
            // SORT THE MONTHS BY ID.
            const sortedProductStats = res.data.sort((a,b) => a._id - b._id);

            if(sortedProductStats.length !== 0){
                sortedProductStats.forEach(pStat => {
                    setPStats(prev => [
                        ...prev,
                        {name: MONTHS[pStat._id - 1], "Sales": pStat.total}
                    ]);
                });
            }else{
                setPStats([
                    {
                    name: "Jan",
                    "Sales": 0,
                    },
                    {name: "Dec",
                    "Sales": 0
                    }
                ])
            }
        }catch(error){
            console.log(error);
        }
        }

        getProductStats();
    }, [MONTHS, product.id]);

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

    const [categorySelectedValues, setCategorySelectedValues] = useState(prunedCategoryOptions);
    //const [packingOptionSelectedValues, setPackingOptionSelectedValues] = useState([]);
    const [formattedNo, setFormattedNo] = useState(addCommas(String(product.price)));
    const [discountPrice, setDiscountPrice] = useState(addCommas(String(product.discountPrice)));

    const handleFormattedNo = event => setFormattedNo(addCommas(removeNonNumeric(event.target.value)));
    const handleDiscountPrice = event => setDiscountPrice(addCommas(removeNonNumeric(event.target.value)));

    //   const packingOptions = [
    //     {id: 1, name: "Original"},
    //     {id: 2, name: "Gift"}
    //   ];
    
    const handleCategorySelect = (selectedList) => {
        setCategorySelectedValues(selectedList);
    }
    
    const handleCategoryRemove = (selectedList) => {
        setCategorySelectedValues(selectedList);
    }

    const handleFileChange = (e) => {
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if(!allowedExtensions.exec(e.target.files[0].name)){
            alert("Invalid file type");
        }else{
            setProductImgName(e.target.files[0].name);
            setProductImg(e.target.files[0]);
        }
    };
    
    const handleDiscountView = (event) => {
        if(event.target.value === "true"){
            setDiscount("true");
            setDiscountPriceInView(true);
        }else{
            setDiscount("false");
            setDiscountPrice("");
            setDiscountPriceInView(false);
        }
    };
    //   const handlePackingOptionSelect = (selectedList) => {
    //     setPackingOptionSelectedValues(selectedList);
    //   }
    
    //   const handlePackingOptionRemove = (selectedList) => {
    //     setPackingOptionSelectedValues(selectedList);
    //   }

    const onSubmit = (data) => {
        if(categorySelectedValues.length === 0){
          setMultiSelectError("please select some categories");
          return;
        }else if(categorySelectedValues.length > 3){
          setMultiSelectError("The minimum amount of categories is 3");
          return;
        }else if(discountFieldInView && (discountPrice === "")){
            setDiscountPriceErr("Please provide a discount price");
            return;
        }else if(discountFieldInView && (Number(discountPrice.replaceAll(",", "")) >= Number(data.price.replaceAll(",", "")))){
            setDiscountPriceErr("Discount price cannot be equal to or more than the original price");
            return;
        }else{
          setMultiSelectError("");
          setDiscountPriceErr("");
          const initialEntry = {...data, categories: parseCategories(categorySelectedValues)};
          const updatedProduct = {...initialEntry, inStock: data.inStock === "true"? true : false, discount: discount === "true"? true : false, majorProduct: data.majorProduct === "true"? true : false, price: Number(data.price.replaceAll(",", "")), discountPrice: Number(discountPrice.replaceAll(",", ""))};

          if(productImgName === product.img){
            setLoading(true);

            console.log("updating other data asides image", updatedProduct);
            updateProduct(productID, updatedProduct, dispatch);
            setTimeout(() => setLoading(false), 2000);
          }else{
            setLoading(true);
            console.log("updating other data with image");
            const fileName = `IMG-${new Date().getTime()}-enaturals-product-` + productImgName;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, productImg);
        
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
                    const product = {img: downloadURL, updatedProduct};
                    updateProduct(productID, product, dispatch);
                    setLoading(false);
                });
                }
            );
          }
        }
    };

    return (
        <div className="product">
            <div className="pagination">
                Quick Menu &gt; <Link to="/products" className="paginationLink"> Products </Link> &gt; Product 1
            </div>
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newProduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart title="Sales Performance" data={[
                    {
                    name: "Jan",
                    "Sales": 0,
                    },
                    {name: "Dec",
                    "Sales": 0
                    }
                ]} dataKey={"Sales"} grid/>
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="product" className="productInfoImg" />
                        <span className="productName">{product.productName}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">ID:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem categories">
                            <span className="productInfoKey">Categories:</span>
                            <span className="productInfoValue">{commaListed(product.categories)}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Size:</span>
                            <span className="productInfoValue">{product.size}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">In Stock:</span>
                            <span className="productInfoValue">{product.inStock? "Yes" : "No"}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Major Product:</span>
                            <span className="productInfoValue">{product.majorProduct? "Yes" : "No"}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Discounted:</span>
                            <span className="productInfoValue">{product.discount? "Yes" : "No"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="productFormLeft">
                        {/* <div className="productFormLeftGroup">
                            <label>Product Name</label>
                            <input type="text" placeholder={product.productName} />
                        </div> */}
                        <div className="productFormLeftGroup">
                            <label htmlFor="shortDesc">Short Description</label>
                            <textarea {...register("shortDesc", {required: "Please provide a short description"})} placeholder="Input a short description of product" id="shortDesc"></textarea>
                            {errors.shortDesc && <p className="error">{errors.shortDesc.message}</p>}
                        </div>
                        <div className="productFormLeftGroup">
                            <label htmlFor="desc">Long Description</label>
                            <textarea {...register("desc", {required: "Please provide a long description"})} placeholder="Inpot a long description of product" id="desc"></textarea>
                            {errors.desc && <p className="error">{errors.desc.message}</p>}
                        </div>
                        <div className="productFormLeftGroup">
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
                            {multiSelectError && <p className="error">{multiSelectError}</p>}
                        </div><br /><br />
                        <div className="productFormLeftGroup">
                            <label htmlFor="price">Price</label>
                            <input {...register("price", { required: "please provide a price for product" })} type="text" value={formattedNo} onChange={handleFormattedNo} placeholder={"₦" + addCommas(product.price)} id="price"/>
                            {errors.price && <p className="error">{errors.price.message}</p>}
                        </div>
                        <div className="productFormLeftGroup">
                            <label htmlFor="inStock">In Stock</label>
                            <select {...register("inStock", {required: "Please specify if product is in stock"})}  id="inStock">
                                <option value="">Select Option</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            {errors.inStock && <p className="error">{errors.inStock.message}</p>}
                        </div>
                        <div className="productFormLeftGroup">
                            <label>Discount</label>
                            <select id="active" value={discount} onChange={handleDiscountView}>
                                <option value="">Select Option</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className={`productFormLeftGroup ${discountFieldInView? "show" : "hide"}`}>
                            <label htmlFor="dprice">Discount Price</label>
                            <input type="text" value={discountPrice} onChange={handleDiscountPrice} placeholder={"₦" + addCommas(product.discountPrice)} id="dprice"/>
                            {discountPriceErr && <p className="error">{discountPriceErr}</p>}
                        </div>
                        <div className="productFormLeftGroup">
                            <label htmlFor="majorProduct">Major Product</label>
                            <select {...register("majorProduct", {required: "Major product is required"})} name="majorProduct" id="majorProduct">
                                <option value="">Select Option</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            {errors.majorProduct && <p className="error">{errors.majorProduct.message}</p>}
                        </div> 
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img} alt="product" className="productUploadImg" />
                            <label htmlFor="file">
                                <Publish className="productUploadIcon"/>
                            </label>
                            <input type="file" id="file" onChange={handleFileChange} style={{display: "none"}} />
                            {/* {productImgErr && <p className="error">{productImgErr}</p>} */}
                        </div>
                        <button type="submit" className="productButton">{loading? <CircularProgress size="2rem" className="loader"/> : "Upload"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default Product;