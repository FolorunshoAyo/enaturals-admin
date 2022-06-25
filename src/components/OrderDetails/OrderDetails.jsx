import { Close } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { updateUserOrder } from "../../redux/apiCalls";
import { capitalizeFirstLetterOfWord } from "../../usefulFunc";
import "./OrderDetails.css";

const OrderDetails = ({orderDetail, handleClose}) => {
    const dispatch = useDispatch();

    const handleOrderUpdate = (status) => {
        updateUserOrder(orderDetail._id, {status: status}, dispatch);
    };

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
                    {orderDetail._id}
                </div>
                <div className="orderItemsContainer">
                    {
                        orderDetail.products.map(orderedItem => {
                            return (
                                <div className="orderItem" key={orderedItem._id}>
                                    <div className="orderItemImgContainer">
                                        <img src={orderedItem.product.productImg} alt="Order Item" className="orderItemImg"/>
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
                    <a href="https://app.flutterwave.com/login" className="actionBtn check">
                        Check
                    </a>
                    <button className="actionBtn confirm" onClick={() => handleOrderUpdate("confirmed")}>Confirm</button>
                    <button className="actionBtn delivering" onClick={() => handleOrderUpdate("on the way")}>On the way</button>
                    <button className="actionBtn delivered" onClick={() => handleOrderUpdate("delivered")}>Delivered</button>
                </div>
            </div>
        </div>
    );
};



export default OrderDetails;