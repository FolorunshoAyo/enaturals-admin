import React, { useEffect, useState } from 'react';
import './ProductList.css';
import { DataGrid } from '@mui/x-data-grid';
import { CancelOutlined, Check, DeleteOutline } from '@material-ui/icons';
import { productRows } from '../../data';
import { Link } from 'react-router-dom';
import { deleteProducts, getProducts } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { confirm } from 'react-confirm-box';


const ProductList = () => {
    // For dummy data.
    // const [data, setData] = useState(productRows);
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products)

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);

    const handleDelete = async (id) => {
        // For dummy data.
        // setData(data.filter(item => item.id !== id));
        const productToBeDeleted = products.find(product => product._id === id);

        const validateDelete = await confirm(`Are you sure you want to delete ${productToBeDeleted.productName} (${productToBeDeleted.size})?`);

        if(validateDelete){
            deleteProducts(id, dispatch);
        }else{
            return 
        }
    };

    const columns = [
        { 
            field: '_id', 
            headerName: 'ID', 
            width: 220 
        },
        {
          field: 'name',
          headerName: 'Product',
          width: 200,
          renderCell: params => {
              return (
                  <div className='productListItem'>
                      <img src={params.row.img} alt="product" className='productListImg'/>
                      {params.row.productName} {`(${params.row.size})`}
                  </div>
            );
          }
        },
        {
          field: 'inStock',
          headerName: 'In Stock',
          width: 90,
          renderCell: params => {
              return (
                  <div className="inStockContainer">
                      {params.row.inStock? <Check className="checkIcon"/> : <CancelOutlined className="cancelIcon"/>}
                  </div>
              )
          }
        },
        {
            field: 'majorProduct',
            headerName: 'Major Product',
            width: 150,
            renderCell: params => {
                return (
                    <div className="majorProductItem">
                        {params.row.majorProduct? <Check className="checkIcon"/> : <CancelOutlined className="cancelIcon"/>}
                    </div>
                )
            }
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 160,
            renderCell: params => {
                return ( "$" + params.row.price)
            }
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: params => {
                return(
                    <>
                        <Link to={`/product/${params.row._id}`}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row._id)}/>
                    </>
                )
            }
        }
    ];

    return(
        <div className="productList">
            <div className="pagination">
                Quick Menu &gt; Products
            </div>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        rows={products}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                        getRowId={row => row._id}
                        autoHeight
                        disableSelectionOnClick
                    />
                </div>
            </div>
        </div>
    );
};



export default ProductList;