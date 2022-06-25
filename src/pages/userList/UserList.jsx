import React, { useEffect } from 'react';
import './UserList.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@material-ui/icons';
// import { userRows } from '../../data';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../redux/apiCalls';
import { confirm } from 'react-confirm-box';

const UserList = () => {
    // For dummy data 
    // const [data, setData] = useState(userRows);
    const users = useSelector(state => state.users.users);
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);

    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);

    const handleDelete = async (id) => {
        // For Dummy data
        // setData(data.filter(item => item.id !== id));

        const userToBeDeleted = users.find(product => product._id === id);

        const validateDelete = await confirm(`Are you sure you want to delete ${userToBeDeleted.username}? Doing this will delete all user data. Go ahead?`);

        if(validateDelete){
            deleteUser(id, dispatch);
        }else{
            return; 
        }
    };

    const columns = [
        { 
            field: '_id', 
            headerName: 'ID', 
            width: 220 
        },
        {
          field: 'user',
          headerName: 'User',
          width: 200,
          renderCell: params => {
              return (
                  <div className='userListUser'>
                      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="avatar" className='userListImg'/>
                      {params.row.username}
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
          field: 'phoneno',
          headerName: 'Phone Number',
          width: 120,
          renderCell: params => {
            return(
                <div>
                    {params.row.phoneno}
                </div>
            )
        }
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 160,
            renderCell: params => {
                return(
                    <div>
                        {params.row.gender}
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
                        <Link to={`/user/edit/${params.row._id}`}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <Link to={`/user/view/${params.row._id}`}>
                            <button className="userListView">View</button>
                        </Link>
                        <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row._id)}/>
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
            <div className="createUserBtnContainer">
                <Link to="/newUser" className="createUserLink">
                    <button className="createUserBtn">Create New User</button>
                </Link>
            </div>
            <div style={{ display: 'flex', height: '100%'}}>
                <div style={{ flexGrow: 1, fontSize: "2rem" }}>
                    <DataGrid
                        rows={users}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={row => row._id}
                        autoHeight
                        disableSelectionOnClick
                    />
                </div>
            </div>
        </div>
    );
};



export default UserList;