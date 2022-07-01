import React, { useState, useEffect } from 'react';
import "./EditViewBlog.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { AccessTime, ArrowBackIos, CalendarTodayOutlined, Edit, RemoveRedEyeOutlined, Save } from '@material-ui/icons';
import CommentAndReply from '../../components/CommentAndReply/CommentAndReply';
import { useSelector } from 'react-redux';
import { capitalizeWords } from '../../usefulFunc';
import { useForm } from 'react-hook-form';
import { CircularProgress } from '@material-ui/core';
import app from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateBlog } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const toastSettings = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

function useQuery() {
    return new URLSearchParams(useLocation().search);
}



const EditViewBlog = () => {
    // For Get Request Query Parameters
    const query = useQuery();
    const action = query.get("action");
    //For Router Params
    const params =  useParams();
    const blogId = params.blogId;

     // For checking admin information
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const navigate = useNavigate();
    const blog = useSelector(state => state.blogs.blogs.find(blog => blog._id === blogId));
    const [blogContent, setBlogContent] = useState(blog.content);
    const [blogImgName, setBlogImgName] = useState(blog.photo);
    const [blogImg, setBlogImg] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    console.log(blog.categories);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: blog.title,
            authorName: blog.authorName,
            categories: blog.categories
        }
    });

    useEffect(() => {
        if(adminUser === null){
            navigate("/");
        }
    }, [adminUser, navigate]);


    const handleChange = (value) => {
        setBlogContent(value);
    }

    const handleFileChange = (e) => {
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if(!allowedExtensions.exec(e.target.files[0].name)){
            alert("Invalid file type");
        }else{
            console.log(e.target.files[0].type);
            setBlogImgName(e.target.files[0].name);
            setBlogImg(e.target.files[0]);
        }
    };

    const onSubmit = (data) => {
        const updatedBlog = {...data, content: blogContent};

        if(blogContent === ""){
            return;
        }else{
            if(blogImgName === blog.photo){
                setLoading(true);

                updateBlog(blogId, updatedBlog, dispatch);
                setTimeout(() => setLoading(false), 2000);
    
            }else{
                setLoading(true)
                const fileName = `IMG-${new Date().getTime()}-enaturals-blog-` + blogImgName;
                const storage = getStorage(app);
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(storageRef, blogImg);

                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on('state_changed', 
                    (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    }, 
                    (error) => {
                        toast.error(error, toastSettings);
                    }, 
                    () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const blogPost = {...data, title: data.title.toLowerCase(), content: blogContent, photo: downloadURL};
                        updateBlog(blogId, blogPost, dispatch);
                        setLoading(false);
                    });
                    }
                );
            }
        }
    };


    return(
        <>
            {action === "view"? 
            <div className="blogContainer">
                <div className="viewBlogContainer">
                    <span className="blogViewLabel">Title</span>
                    <div className="viewBlogTitleContainer">
                        <h2 className="viewBlogTitle">{blog.title}</h2>
                        <div className="blogViewActions">
                            <button className="viewActionBtn">
                                <Link to={`/blog/${blogId}?action=edit`} className="blogActionLink">
                                    <Edit className="viewActionIcon"/> 
                                    Edit
                                </Link>
                            </button>
                            <button className="viewActionBtn">
                                <Link to="/blogs" className="blogActionLink">
                                    <ArrowBackIos className="viewActionIcon"/> 
                                    Back
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="blogViewDetails">
                    <div className="blogViewContentContainer">
                        <div className="blogViewGroup blogInfoBlock">
                            <span className="blogLabel">Text</span>
                            <div className="blogContent" dangerouslySetInnerHTML={{__html: blog.content}}>
                                {/* Content Here */}
                            </div>
                        </div>
                        <div className="blogViewGroup blogInfoBlock">
                            <span className="blogLabel">Image &amp; Caption</span>
                            <div className="blogImgContainer">
                                <img src={blog.photo} alt="#" className="blogImg"/>
                                {/* <span className="blogImgCaption"><span>Caption:</span> Some caption</span> */}
                            </div>
                        </div>

                        <div className="blogViewGroup blogInfoBlock">
                            <span className="blogLabel">Blog Comments And Replies</span>
                            <div className="blogComments">
                                <CommentAndReply blogID={blogId}/>
                            </div>
                        </div>
                    </div>
                    <div className="blogMetaContainer">
                        <div className="blogViewGroup">
                            <span className="blogLabel">Author</span>
                            <div className="blogAuthor">
                                <span className="blogAuthorName">{blog.authorName}</span>
                            </div>
                        </div>

                        <div className="blogViewGroup">
                            <span className="blogLabel">Post date</span>
                            <div className="dateInfoContainer">
                                <div className="dateInfo">
                                    {new Date(blog.createdAt).toISOString().substring(0, 10)}
                                    <CalendarTodayOutlined />
                                </div>
                                <div className="timeInfo">
                                {new Date(blog.createdAt).toISOString().substring(12, 16)}
                                    <AccessTime />
                                </div>
                            </div>
                        </div>

                        <div className="blogViewGroup">
                            <span className="blogLabel">Category(s)</span>
                            <ul className="blogCategories">
                                {blog.categories.map((category, index) => (
                                    <li key={index + 1} className="blogCategory">{capitalizeWords(category.split(" ")).join(" ")}</li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div> 
            : 
            <div className="blogContainer">
                <form className="editBlog" onSubmit={handleSubmit(onSubmit)}>
                    <div className="blogEditTitleContainer">
                        <div className="blogEditTitle">
                            <label htmlFor="blogTitle">Title</label>
                            <input {...register("title", {required: "You need to add a title"})} type="text" id="blogTitle" className="blogTitleInput"/>
                            {errors.title && <p className="error">{errors.title.message}</p>}
                        </div>
                        <div className="saveBlogActionContainer">
                            <button className="editActionBtn">
                                <Link to={`/blog/${blogId}?action=view`} className="blogActionLink">
                                    <RemoveRedEyeOutlined className="editActionIcon"/> 
                                    View
                                </Link>
                            </button>
                            <button type="submit" className="editActionBtn submitBtn" disabled={loading}>
                            {loading? 
                                <CircularProgress size="2rem" className="blogLoader"/>
                                :
                                <>
                                    <Save className="editActionIcon"/> 
                                    Save
                                 </>
                            }
                            </button>
                        </div>
                    </div>
                    <div className="blogEditContainer">
                        <div className="blogEditContent">
                            <div className="blogEditGroup blogEditBlock quillContainer">
                                <label htmlFor="blogContent" className="blogLabel">
                                    Content
                                </label>
                                <div className="editInputContainer">
                                    <ReactQuill value={blogContent} onChange={handleChange} className="blogContentInput"/>
                                </div>
                            </div>

                            <div className="blogEditGroup blogEditBlock">
                                <label className="blogLabel">
                                    Current Blog Image
                                </label>
                                <div className="blogImgContainer">
                                    <img  src={blog.photo} alt="Current blog post" className="blogImg"/>
                                </div>
                            </div>

                            <div className="blogEditGroup blogEditBlock">
                                <label htmlFor="blogImgUpload" className="blogLabel">
                                    Image
                                </label>
                                <div className="editInputContainer">
                                    <input type="file"  onChange={handleFileChange} id="blogImgUpload" />
                                </div>
                            </div>
                        </div>
                        <div className="blogEditMetaContainer">
                            <div className="blogEditGroup">
                                <label htmlFor="authorName" className="blogLabel">Author</label>
                                <input {...register("authorName", { required: "Please provide an author name" })} type="text" className="authorInput" id="authorName"/>
                                {errors.authorName && <p className="error">{errors.authorName.message}</p>}
                            </div>

                            <div className="blogEditGroup">
                                <label htmlFor="category" className="blogLabel">Category</label>
                                <label htmlFor="naturalSoap" className="categoryCheckboxContainer">
                                    <input {...register("categories", { required: "Please select at least one category" })} value="natural soap" type="checkbox" id="naturalSoap" className="categoryCheckbox" />
                                    Natural Soap
                                </label>
                                <label htmlFor="oils" className="categoryCheckboxContainer">
                                    <input {...register("categories", { required: "Please select at least one category" })} value="oils" type="checkbox" id="oils" className="categoryCheckbox" />
                                    Oils
                                </label>
                                <label htmlFor="research" className="categoryCheckboxContainer">
                                    <input {...register("categories", { required: "Please select at least one category" })} value="research" type="checkbox" id="research" className="categoryCheckbox" />
                                    Research
                                </label>
                                <label htmlFor="skin-care" className="categoryCheckboxContainer">
                                    <input {...register("categories", { required: "Please select at least one category" })} value="skin care" type="checkbox" id="skin-care" className="categoryCheckbox" />
                                    Skin Care
                                </label>
                                <label htmlFor="soap-making" className="categoryCheckboxContainer">
                                    <input {...register("categories", { required: "Please select at least one category" })} value="soap making" type="checkbox" id="soap-making" className="categoryCheckbox" />
                                    Soap Making
                                </label>
                                <label htmlFor="spa-procedures" className="categoryCheckboxContainer">
                                    <input {...register("categories", { required: "Please select at least one category" })} value="spa procedures" type="checkbox" id="spa-procedures" className="categoryCheckbox" />
                                    Spa Procedures
                                </label>
                                {errors.categories && <p className="error">{errors.categories.message}</p>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            }
        </>
    );
};



export default EditViewBlog;