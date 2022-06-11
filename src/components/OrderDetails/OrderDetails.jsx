import { Close } from "@material-ui/icons";
import React from "react";
import { capitalizeFirstLetterOfWord } from "../../usefulFunc";
import "./OrderDetails.css";

const OrderDetails = ({orderDetail, handleClose}) => {
    return (
        <div className="userOrderDetail">
            <div className="userOrderDetailsTitleContainer">
                <span className="userOrderDetailsTitle">Order Details</span>
                <div className="userOrderDetailsClose">
                    <Close className="closeIcon" onClick={handleClose}/>
                </div>
            </div>

            <div className="userOrderInformation">
                <div className="userOrderIdContainer">
                    4528-123234
                </div>
                <div className="orderItemsContainer">
                    {
                        orderDetail.products.map(orderedItem => {
                            return (
                                <div className="orderItem" key={Math.random() * 10}>
                                    <div className="orderItemImgContainer">
                                        <img src="../../enaturals/enaturals7.jpg" alt="Order Item" className="orderItemImg"/>
                                    </div>
                                    <div className="orderItemInfoContainer">
                                        <div className="orderItemInfo">
                                            <span className="orderItemQuantity">{orderedItem.quantity}x</span>
                                            <span className="orderItemName">{`${orderedItem.product.productName} ${orderedItem.product.productSize !== "No Size"? capitalizeFirstLetterOfWord(orderedItem.product.productSize) : ""}`}</span>
                                        </div>
                                        <span className="orderItemPrice">₦ {orderedItem.price}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="orderTotalContainer">
                    <span className="totalOrderLabel">
                        Total
                    </span>
                    <span className="totalOrderPrice">
                        ₦ {orderDetail.amount}
                    </span>
                </div>

                <div className="actionBtnContainer">
                    <a href="https://github.com" className="actionBtn check">
                        Check
                    </a>
                    <button className="actionBtn confirm">Confirm</button>
                    <button className="actionBtn delivering">On the way</button>
                    <button className="actionBtn delivered">Delivered</button>
                </div>
            </div>
        </div>
    );
};



export default OrderDetails;