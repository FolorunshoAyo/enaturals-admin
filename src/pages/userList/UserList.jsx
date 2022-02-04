import React, { useState } from 'react';
import './UserList.css';

import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { userRows } from '../../data';
import { Link } from 'react-router-dom';


const UserList = () => {
    const [data, setData] = useState(userRows);

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
          field: 'user',
          headerName: 'User',
          width: 200,
          renderCell: params => {
              return (
                  <div className='userListUser'>
                      <img src={params.row.avatar} alt="avatar" className='userListImg'/>
                      {params.row.userName}
                  </div>
            );
          }
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 200
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 120
        },
        {
            field: 'transaction',
            headerName: 'Transaction Volume',
            width: 160
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: params => {
                return(
                    <>
                        <Link to={`/user/${params.row.id}`}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row.id)}/>
                    </>
                )
            }
        }
    ];

    return (
        <div className='userList'>
            <div className="pagination">
                Quick Menu &gt; Users
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



export default UserList;