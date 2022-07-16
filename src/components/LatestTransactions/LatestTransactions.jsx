import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { userRequest } from "../../requestMethod";
import LatestTransaction from "./LatestTransaction";

// const toastSettings = {
//     position: "top-center",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//  }

const LatestTransactions = () => {
    const [latestOrders, setLatestOrders] = useState([]);

    useEffect(() => {
        const getLatestOrders = async () => {
            try{
                const res = await userRequest.get("/orders/newOrders");
                setLatestOrders(res.data);
            }catch(error){
                // toast.error("Unable to get recent orders (501)", toastSettings);
                console.log(error);
            }
        };

        getLatestOrders();
    }, []);

    return(
        <tr>
            {
                latestOrders.map(latestOrder => (
                    <LatestTransaction
                        key={latestOrder._id}
                        userID={latestOrder.userID}
                        username={latestOrder.username}
                        createdAt={latestOrder.createdAt}
                        amount={latestOrder.amount}
                        status={latestOrder.status}
                    />
                ))
            }
        </tr>
    );
};



export default LatestTransactions;