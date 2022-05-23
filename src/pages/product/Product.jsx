import React, {useState, useMemo, useEffect} from 'react';
import './Product.css';
import { Link, useLocation } from 'react-router-dom';
import Chart from '../../components/Chart/Chart';
import { productData } from '../../data';
import { Publish } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { userRequest } from '../../requestMethod';
import Multiselect from "multiselect-react-dropdown";

const Product = () => {
    const { pathname } = useLocation();
    const productID = pathname.split("/")[2];
    const product = useSelector(state => state.products.products.find(product => product._id === productID));
    const [pStats, setPStats] = useState([])

    const categoryOptions = [
        { id: 1, name: "Handmade Soap" },
        { id: 2, name: "Restoring" },
        { id: 3, name: "Refreshing" },
        { id: 4, name: "Scrubbing"}, 
        {id: 5, name: "Repairing"},
        {id: 6, name: "Softening"},
        {id: 7, name: "Brigthening"},
        {id: 8, name: "Body Exfoliant"},
        {id: 9, name: "Rejuvenating"},
        {id: 10, name: "Uncategorized"}
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

            sortedProductStats.forEach(pStat => {
            setPStats(prev => [
                ...prev,
                {name: MONTHS[pStat._id - 1], "Sales": pStat.total}
            ]);
            });

        }catch(error){
            console.log(error);
        }
        }

        getProductStats();
    }, [MONTHS]);

    const [categorySelectedValues, setCategorySelectedValues] = useState(prunedCategoryOptions);
    //const [packingOptionSelectedValues, setPackingOptionSelectedValues] = useState([]);
    const [formattedNo, setFormattedNo] = useState("");
    
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
    
    //   const handlePackingOptionSelect = (selectedList) => {
    //     setPackingOptionSelectedValues(selectedList);
    //   }
    
    //   const handlePackingOptionRemove = (selectedList) => {
    //     setPackingOptionSelectedValues(selectedList);
    //   }
    
      const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");
    
      const handleFormattedNo = event => setFormattedNo(addCommas(removeNonNumeric(event.target.value)));


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
                    <Chart title="Sales Performance" data={productData} dataKey={"Sales"} grid/>
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
                        <div className="productInfoItem">
                            <span className="productInfoKey">Sales:</span>
                            <span className="productInfoValue">$123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Active:</span>
                            <span className="productInfoValue">Yes</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">In Stock:</span>
                            <span className="productInfoValue">{product.inStock? "Yes" : "No"}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Major Product:</span>
                            <span className="productInfoValue">{product.majorProduct? "Yes" : "No"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <div className="productFormLeftGroup">
                            <label>Product Name</label>
                            <input type="text" placeholder={product.productName} />
                        </div>
                        <div className="productFormLeftGroup">
                            <label>Short Description</label>
                            <textarea placeholder={product.shortDesc}></textarea>
                        </div>
                        <div className="productFormLeftGroup">
                            <label>Long Description</label>
                            <textarea placeholder={product.desc}></textarea>
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
                        </div><br /><br />
                        <div className="productFormLeftGroup">
                            <label>Price</label>
                            <input type="text" value={formattedNo} onChange={handleFormattedNo} placeholder={"₦" + addCommas(product.price)} />
                        </div>
                        <div className="productFormLeftGroup">
                            <label>In Stock</label>
                            <select name="inStock" id="inStock">
                                <option value="true">Yes</option>
                                <option vakue="false">No</option>
                            </select>
                        </div>
                        <div className="productFormLeftGroup">
                            <label>Active</label>
                            <select name="active" id="active">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="productFormLeftGroup">
                            <label>Major Product</label>
                            <select name="majorProduct" id="MajorProduct">
                                <option value="yes">Yes</option>
                                <option vakue="no">No</option>
                            </select>
                        </div> 
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src="../enaturals/enaturals12.jpg" alt="product" className="productUploadImg" />
                            <label for="file">
                                <Publish className="productUploadIcon"/>
                            </label>
                            <input type="file" id="file" style={{display: "none"}} />
                        </div>
                        <button className="productButton">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default Product;