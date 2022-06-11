import React, {useState} from "react";
import "./UserOrders.css"
import { Orders } from "../../data";
import { DataGrid } from "@mui/x-data-grid";
import { formatDistance } from 'date-fns'
import { Delete } from "@material-ui/icons";
import OrderDetails from "../OrderDetails/OrderDetails";

const UserOrders = () => {
    const [orders, setOrders] = useState(Orders);
    const [selectionModel, setSelectionModel] = useState([]);
    const [orderInView, setOrderInView] = useState({});

    const deleteSelectedOrder = (selectedModels) => {
        let updatedOrders;
        for(const orderID of selectedModels ){
            if(updatedOrders === undefined){
                updatedOrders = orders.filter((order) => order.id !== orderID);
            }else{
                updatedOrders = updatedOrders.filter((order) => order.id !== orderID);
            }
        }
        setOrders(updatedOrders);
    };

    const handleViewOrders = (id) => {
        const OrderFetched = orders.find(order => order.id === id);
        setOrderInView(OrderFetched);
    };

    const handleOrderClose = () => {
        setOrderInView([]);
    };

    const columns = [
        { 
            field: 'id', 
            headerName: 'Order-ID', 
            width: 180 
        },
        {
          field: 'username',
          headerName: 'Username',
          width: 150,
        },
        {
          field: 'transaction',
          headerName: 'Transaction',
          width: 120
        },
        {
          field: 'status',
          headerName: 'Delivery status',
          width: 150,
          renderCell: params => {
            return(
                <div className={`deliveryStatus ${params.row.status === "on the way"? "delivering" : params.row.status}`}>
                    {params.row.status}
                </div>
            )
        }
        },
        {
            field: 'createdAt',
            headerName: 'Time placed',
            width: 120,
            renderCell: params => {
                return(
                    <div>
                        {formatDistance(new Date(params.row.createdAt), new Date()) + " ago"}
                    </div>
                )
            }
        },
        {
            field: "action",
            headerName: "Action",
            width: 120,
            renderCell: params => {
                return(
                    <>
                        <button className="orderViewBtn" onClick={() => handleViewOrders(params.row.id)}>View</button>
                    </>
                )
            }
        }
    ];

    return (
        <div className="userOrdersContainer">
            <div className={`deleteOrdersContainer ${selectionModel.length > 0? "active" : "not-active"}`}>
                <div className="itemsSelected">
                    {selectionModel.length} Order(s) Selected
                </div>
                <div className="deleteIconContainer">
                        <Delete className="userOrderDeleteIcon" onClick={() => deleteSelectedOrder(selectionModel)}/>
                </div>
            </div>
            <div style={{ display: 'flex', height: '100%'}}>
                <div style={{ flexGrow: 1, fontSize: "2rem" }}>
                    <DataGrid
                        rows={orders}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={row => row.id}
                        autoHeight
                        checkboxSelection
                        onSelectionModelChange={setSelectionModel}
                        selectionModel={selectionModel}
                    />
                </div>
            </div>
            <div className={`${Object.keys(orderInView).length !== 0? "orderOpen" : "orderClose"}`}>
                {Object.keys(orderInView).length !== 0? <OrderDetails orderDetail={orderInView} handleClose={handleOrderClose}/> : ""}
            </div>
        </div>
    );
};



export default UserOrders;