import React, {useState,useEffect} from "react";
import "./UserOrders.css"
// import { Orders } from "../../data";
import { DataGrid } from "@mui/x-data-grid";
import { formatDistance } from 'date-fns'
import { Delete } from "@material-ui/icons";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserOrder, getUserOrders } from "../../redux/apiCalls";
import { confirm } from "react-confirm-box";

const UserOrders = ({userID}) => {
    const userOrders = useSelector(state => state.userOrders.userOrders);
    const [selectionModel, setSelectionModel] = useState([]);
    const [orderInView, setOrderInView] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        getUserOrders(userID, dispatch);
    }, [dispatch, userID]);

    const deleteSelectedOrder = async (selectedModels) => {
        const validateDelete = await confirm((selectedModels.length === 1)? "Are you sure you want to delete this order?" : "Are you sure you want to delete these orders?");

        if(validateDelete){
            for(const orderID of selectedModels ){
                deleteUserOrder(orderID, dispatch);
            }
            setOrderInView({});
        }else{
            return;
        }
    };

    const handleViewOrders = (id) => {
        const OrderFetched = userOrders.find(order => order._id === id);
        setOrderInView(OrderFetched);
    };

    const handleOrderClose = () => {
        setOrderInView({});
    };

    const columns = [
        { 
            field: '_id', 
            headerName: 'Order-ID', 
            width: 230
        },
        {
          field: 'username',
          headerName: 'Username',
          width: 150,
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
            width: 150,
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
                        <button className="orderViewBtn" onClick={() => handleViewOrders(params.row._id)}>View</button>
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
                        rows={userOrders}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={row => row._id}
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