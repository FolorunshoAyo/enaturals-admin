import React, { useState } from 'react';
import './ProductList.css';

import { DataGrid } from '@mui/x-data-grid';
import { CancelOutlined, Check, DeleteOutline } from '@material-ui/icons';
import { productRows } from '../../data';
import { Link } from 'react-router-dom';


const ProductList = () => {
    const [data, setData] = useState(productRows);

    const handleDelete = id => {
        setData(data.filter(item => item.id !== id));
    };

    const columns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 90 
        },
        {
          field: 'name',
          headerName: 'Product',
          width: 200,
          renderCell: params => {
              return (
                  <div className='productListItem'>
                      <img src={params.row.img} alt="product" className='productListImg'/>
                      {params.row.name}
                  </div>
            );
          }
        },
        {
          field: 'stock',
          headerName: 'Stock',
          width: 90
        },
        {
            field: 'majorProduct',
            headerName: 'Major Product',
            width: 150,
            renderCell: params => {
                return (
                    <div className="majorProductItem">
                        {params.row.majorProduct? <Check /> : <CancelOutlined />}
                    </div>
                )
            }
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 120
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 160
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: params => {
                return(
                    <>
                        <Link to={`/product/${params.row.id}`}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row.id)}/>
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
            <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            />
        </div>
    );
};



export default ProductList;