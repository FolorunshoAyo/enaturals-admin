import React from 'react';



const InformationalDetails = () => {
    return (
        <div className="currentDisplayBox">
            <img src="../enaturals/enaturals5.jpg" alt="#" className="currentDisplayImg" />
            <div className="displayTypeInfo">
                <div className="displayTypeInfoGroup">
                    <span className="productTitle">Tag</span>
                    <span className="productDetail">Discount !!!</span>
                </div>
                <div className="displayTypeInfoGroup">
                    <span className="productTitle">Title</span>
                    <span className="productDetail">Sales Sales Sales</span>
                </div>
                <div className="displayTypeInfoGroup">
                    <span className="productTitle">Description</span>
                    <span className="productDetail">
                        bla bla my name is folorunsho and i love to make ends meet 
                        and work day in day out to provide for family at all times
                    </span>
                </div>
                <p className="currentDisplayType">Banner</p>
            </div>
        </div>
    );
};




export default InformationalDetails;