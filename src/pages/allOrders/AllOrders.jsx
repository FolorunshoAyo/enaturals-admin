import React, {useState} from "react";
import "./AllOrders.css";
import { Orders } from "../../data";
import formatDistance from "date-fns/formatDistance";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

const AllOrders = () => {
    const [orders, setOrders] = useState(Orders);
    const [selectionModel, setSelectionModel] = useState([]);

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

    const columns = [
        { 
            field: 'id', 
            headerName: 'Order-ID', 
            width: 200 
        },
        {
          field: 'username',
          headerName: 'Username',
          width: 170,
        },
        {
          field: 'transaction',
          headerName: 'Transaction',
          width: 120
        },
        {
          field: 'status',
          headerName: 'Delivery status',
          width: 180,
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
            width: 150,
            renderCell: params => {
                return(
                    <>
                        <button className="viewUserOrderBtn">
                            <Link to={`/user/view/${params.row.userID}`} className="viewUserOrderLink">
                                View
                            </Link>
                        </button>
                    </>
                )
            }
        }
    ];


    return (
        <div className='orders'>
            <div className="pagination">
                Quick Menu &gt; Orders
            </div>
            <div className="ordersTable">
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
            </div>
        </div>
    );
};



export default AllOrders;