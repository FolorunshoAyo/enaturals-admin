import React, {useState, useEffect} from 'react';
import "./NewBlog.css";
import { CloudUpload } from '@material-ui/icons';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import app from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CircularProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import { addBlog } from '../../redux/apiCalls';

const toastSettings = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

const NewBlog = () => {
    const [blogContent, setBlogContent] = useState('');
    // const [blogContentError, setBlogContentError] = useState("");
    const adminUser = useSelector(state => state.adminUser.currentUser);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
        if(adminUser === null){
        navigate("/");
        }
    }, [adminUser, navigate]);

    const handleChange = (value) => {
        setBlogContent(value);
    }

    const onSubmit = (data) => {
        if(blogContent === ""){
            return;
        }else{
            setLoading(true);
            const fileName = `IMG-${new Date().getTime()}-enaturals-blog-` + data.photo[0].name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, data.photo[0]);

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
                    addBlog(blogPost, dispatch);
                    reset();
                    setBlogContent("");
                    setLoading(false);
                });
                }
            );
        }
    };

    return (
        <div className="blogContainer">
            <form className="uploadBlog" onSubmit={handleSubmit(onSubmit)}>
                <div className="blogUploadTitleContainer">
                    <div className="blogUploadTitle">
                        <label htmlFor="blogTitle">Title</label>
                        <input {...register("title", { required: "Please provide a blog title" })} type="text" placeholder="e.g 10 Tips for a Healthy Skin" id="blogTitle" className="blogTitleInput"/>
                        {errors.title && <p className="error">{errors.title.message}</p>}
                    </div>
                    <div className="uploadBlogActionContainer">
                        <button type="submit" className="uploadActionBtn submitBtn">
                           {loading? 
                                <CircularProgress size="2rem" className="blogLoader"/>
                            :
                            <>
                                <CloudUpload className="uploadActionIcon"/> 
                                Upload
                            </>
                            }
                        </button>
                    </div>
                </div>
                <div className="blogUploadContainer">
                    <div className="blogUploadContent">
                        <div className="blogUploadGroup blogUploadBlock quillContainer">
                            <label htmlFor="blogContent" className="blogLabel">
                                Content
                            </label>
                            <div className="uploadInputContainer">
                                <ReactQuill value={blogContent} onChange={handleChange} className="blogContentInput"/>
                            </div>
                        </div>

                        <div className="blogUploadGroup blogUploadBlock">
                            <label htmlFor="blogImgUpload" className="blogLabel">
                                Image
                            </label>
                            <div className="uploadInputContainer">
                                <input {...register("photo", {required: "You need to upload a file"})} type="file" id="blogImgUpload" />
                                {errors.photo && <p className="error">{errors.photo.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="blogUploadMetaContainer">
                        <div className="blogUploadGroup">
                            <label htmlFor="authorName" className="blogLabel">Author</label>
                            <input {...register("authorName", { required: "Please provide an author name" })} type="text" className="authorInput" placeholder="e.g Tijani Abimbola" id="authorName"/>
                            {errors.authorName && <p className="error">{errors.authorName.message}</p>}
                        </div>

                        <div className="blogUploadGroup">
                            <label className="blogLabel">Category</label>
                            <label htmlFor="naturalSoap" className="categoryCheckboxContainer">
                                <input {...register("categories", { required: "Please select at least one category" })} value="natural soap" type="checkbox" id="naturalSoap" className="categoryCheckbox"/>
                                Natural Soap
                            </label>
                            <label htmlFor="oils" className="categoryCheckboxContainer">
                                <input {...register("categories", { required: "Please select at least one category" })} value="oils" type="checkbox" id="oils" className="categoryCheckbox"/>
                                Oils
                            </label>
                            <label htmlFor="research" className="categoryCheckboxContainer">
                                <input {...register("categories", { required: "Please select at least one category" })} value="reasearch" type="checkbox" id="research" className="categoryCheckbox"/>
                                Research
                            </label>
                            <label htmlFor="skin-care" className="categoryCheckboxContainer">
                                <input {...register("categories", { required: "Please select at least one category" })} value="skin care" type="checkbox" id="skin-care" className="categoryCheckbox"/>
                                Skin Care
                            </label>
                            <label htmlFor="soap-making" className="categoryCheckboxContainer">
                                <input {...register("categories", { required: "Please select at least one category" })} value="soap making" type="checkbox" id="soap-making" className="categoryCheckbox"/>
                                Soap Making
                            </label>
                            <label htmlFor="spa-procedures" className="categoryCheckboxContainer">
                                <input {...register("categories", { required: "Please select at least one category" })} value="spa procedures" type="checkbox" id="spa-procedures" className="categoryCheckbox"/>
                                Spa Procedures
                            </label>
                            {errors.categories && <p className="error">{errors.categories.message}</p>}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};



export default NewBlog;