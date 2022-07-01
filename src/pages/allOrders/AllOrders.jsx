import React, {useEffect, useState} from "react";
import "./AllOrders.css";
// import { Orders } from "../../data";
import formatDistance from "date-fns/formatDistance";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllOrders, getAllOrders } from "../../redux/apiCalls";

const AllOrders = () => {
    const allOrders = useSelector(state => state.allOrders.allOrders);
    const [selectionModel, setSelectionModel] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getAllOrders(dispatch);
    }, [dispatch]);

    const deleteSelectedOrder = (selectedModels) => {
        for(const orderID of selectedModels ){
            deleteAllOrders(orderID, dispatch);
        }
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
          width: 200,
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
            width: 180,
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
            width: 170,
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
                            rows={allOrders}
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
            </div>
        </div>
    );
};



export default AllOrders;