import React from 'react';
import './Product.css';

import { Link } from 'react-router-dom';
import Chart from '../../components/Chart/Chart';
import { productData } from '../../data';
import { Publish } from '@material-ui/icons';

const Product = () => {
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
                        <img src="../enaturals/enaturals12.jpg" alt="product" className="productInfoImg" />
                        <span className="productName">Apple Airpods</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">ID:</span>
                            <span className="productInfoValue">123</span>
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
                            <span className="productInfoValue">No</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Major Product:</span>
                            <span className="productInfoValue">No</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <div className="productFormLeftGroup">
                            <label>Product Name</label>
                            <input type="text" placeholder="Whitening Oil" />
                        </div>
                        <div className="productFormLeftGroup">
                            <label>In Stock</label>
                            <select name="inStock" id="inStock">
                                <option value="yes">Yes</option>
                                <option vakue="no">No</option>
                            </select>
                        </div>
                        <div className="productFormLeftGroup">
                            <label>Active</label>
                            <select name="active" id="active">
                                <option value="yes">Yes</option>
                                <option vakue="no">No</option>
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