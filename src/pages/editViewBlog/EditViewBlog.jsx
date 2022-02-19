import React from 'react';
import "./EditViewBlog.css";
import { useLocation } from 'react-router-dom';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const EditViewBlog = () => {
    const query = useQuery();

    console.log(query.get("action"))
    return(
        <div className="blogContainer">
            {"params is " + query.get("action")}
        </div>
    );
};



export default EditViewBlog;