import React from 'react';
import './NewProduct.css';


const NewProduct = () => {
    return (
        <div className="newProduct">
            <div className="pagination">
                Quick Menu &gt; 
            </div>
            <h1 className="addProductTitle">New Product</h1>
            <form className="addProductForm">
                <div className="newProductItem">
                    <label>Image</label>
                    <input type="file" name="file" id="file" />
                </div>
                <div className="newProductItem">
                    <label>Name</label>
                    <input type="text" placeholder="Whitening Oil"/>
                </div>
                <div className="newProductItem">
                    <label>Description</label>
                    <input type="text" placeholder="Add a brief description..."/>
                </div>
                <div className="newProductItem">
                    <label>Additional Info</label>
                    <input type="text" placeholder="More Product Information"/>
                </div>
                <div className="newProductItem">
                    <label>Stock</label>
                    <input type="email" placeholder="123" />
                </div>
                <div className="newProductItem">
                    <label>Major Product</label>
                    <select className="newProductSelect" name="majorProduct" id="majorProduct">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="newProductItem">
                    <label>Active</label>
                    <select className="newProductSelect" name="active" id="active">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="newProductItem">
                    <label>Tag</label>
                    <select className="newProductSelect" name="tag" id="tag">
                        <option value="">Select Product Tag</option>
                        <option>Handmade Soap</option>
                        <option>Restoring</option>
                        <option>Refreshing</option>
                        <option>Scrubbing</option>
                        <option>Uncategorized</option>

                    </select>
                </div>
                <button className="newProductButton">Create</button>
            </form>
        </div>
    );
}


export default NewProduct;