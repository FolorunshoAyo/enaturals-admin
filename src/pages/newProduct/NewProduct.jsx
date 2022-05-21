import React, { useState } from "react";
import "./NewProduct.css";
import Multiselect from "multiselect-react-dropdown";

const NewProduct = () => {

  const categoryOptions = [
    { id: 1, name: "Handmade Soap" },
    { id: 2, name: "Restoring" },
    { id: 3, name: "Refreshing" },
    { id: 4, name: "Scrubbing"}, 
    {id: 5, name: "Repairing"},
    {id: 6, name: "Softener"},
    {id: 7, name: "Brigthening"},
    {id: 8, name: "Body Exfoliant"},
    {id: 9, name: "Rejuvenating"},
    {id: 10, name: "Uncategorized"}
  ];

  const packingOptions = [
    {id: 1, name: "Original"},
    {id: 2, name: "Gift"}
  ];

  const [categorySelectedValues, setCategorySelectedValues] = useState([]);
  // const [packingOptionSelectedValues, setPackingOptionSelectedValues] = useState([]);
  const [formattedNo, setFormattedNo] = useState("");

  const handleCategorySelect = (selectedList) => {
      setCategorySelectedValues(selectedList);
  }

  const handleCategoryRemove = (selectedList) => {
      setCategorySelectedValues(selectedList);
  }

  // const handlePackingOptionSelect = (selectedList) => {
  //   setPackingOptionSelectedValues(selectedList);
  // }

  // const handlePackingOptionRemove = (selectedList) => {
  //   setPackingOptionSelectedValues(selectedList);
  // }

  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

  const handleFormattedNo = event => setFormattedNo(addCommas(removeNonNumeric(event.target.value)));

  return (
    <div className="newProduct">
      <div className="pagination">Quick Menu &gt;</div>
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="newProductItem">
          <label>Image</label>
          <input type="file" name="file" id="file" />
        </div>
        <div className="newProductItem">
          <label>Product Name</label>
          <input type="text" placeholder="Whitening Oil" className="productNameInput"/>
        </div>
        <div className="newProductItem">
          <label>Short Description</label>
          <input type="text" placeholder="Add a brief description..." />
        </div>
        <div className="newProductItem">
          <label>Long Description</label>
          <textarea placeholder="More Product Information"></textarea>
        </div>
        <div className="newProductItem">
          <label>Major Product</label>
          <select
            className="newProductSelect"
            name="majorProduct"
            id="majorProduct"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="newProductItem">
          <label>In Stock</label>
          <select className="newProductSelect" name="inStock">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
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
          <select className="newProductSelect" name="size">
            <option value="">No Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className="newProductItem">
          <label>Price</label>
          <div className="priceInputContainer">
            <span className="currency">
              ₦
            </span>
            <input type="text" value={formattedNo} placeholder="Price of Product" className="priceInput" onChange={handleFormattedNo}/>
          </div>
        </div>
        <button className="newProductButton">Create</button>
      </form>
    </div>
  );
};

export default NewProduct;
