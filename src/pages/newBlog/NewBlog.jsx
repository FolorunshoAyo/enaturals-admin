import React, {useState} from 'react';
import "./NewBlog.css";
import { CloudUpload } from '@material-ui/icons';
import ReactQuill from 'react-quill';


const NewBlog = () => {
    const [blogContent, setBlogContent] = useState('');

    const handleChange = (value) => {
        setBlogContent(value);
    }

    return (
        <div className="blogContainer">
            <form className="uploadBlog">
                <div className="blogUploadTitleContainer">
                    <div className="blogUploadTitle">
                        <label htmlFor="blogTitle">Title</label>
                        <input type="text" placeholder="e.g 10 Tips for a Healthy Skin" id="blogTitle" className="blogTitleInput"/>
                    </div>
                    <div className="uploadBlogActionContainer">
                        <button type="submit" className="uploadActionBtn submitBtn">
                            <CloudUpload className="uploadActionIcon"/> 
                            Upload
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
                                <input type="file" id="blogImgUpload" />
                            </div>
                        </div>
                    </div>
                    <div className="blogUploadMetaContainer">
                        <div className="blogUploadGroup">
                            <label htmlFor="authorName" className="blogLabel">Author</label>
                            <input type="text" className="authorInput" placeholder="e.g Tijani Abimbola" id="authorName"/>
                        </div>

                        <div className="blogUploadGroup">
                            <label htmlFor="category" className="blogLabel">Category</label>
                            <select id="category" className="categorySelect">
                                <option value="">Select a category</option>
                                <option value="naturalSoap">Natural Soap</option>
                                <option value="oils">Oils</option>
                                <option value="research">Research</option>
                                <option value="skinCare">Skin Care</option>
                                <option value="soapMaking">Soap Making</option>
                                <option value="spaProcedures">Spa Procedures</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};



export default NewBlog;