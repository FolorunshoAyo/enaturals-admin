import React from 'react';



const NewArrivalDetails = ({productName, discountedAmount, textSnippet, productImg}) => {
    return (
        <div className="currentDisplayBox">
            <img src={productImg} alt="display pic" className="currentDisplayImg" />
            <div className="displayTypeInfo">
                <div className="displayTypeInfoGroup">
                    <span className="productName">Product Name</span>
                    <span className="productDetail">{productName}</span>
                </div>
                <div className="displayTypeInfoGroup">
                    <span className="productTitle">Discount</span>
                    <span className="productDetail">{discountedAmount? `Yes (${discountedAmount}%)` : 'No'}</span>
                </div>
                <div className="displayTypeInfoGroup">
                    <span className="productTitle">Product Description</span>
                    <span className="productDetail">
                        {textSnippet + "I like big but in a can i like and you other brithers can't deny, heavy loads everywhere."}
                    </span>
                </div>
                <p className="currentDisplayType">New Banner</p>
            </div>
        </div>
    );
};




export default NewArrivalDetails;