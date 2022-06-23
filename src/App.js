import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import EditUser from "./pages/editUser/EditUser";
import ViewUser from "./pages/viewUser/ViewUser";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Analytics from "./pages/analytics/Analytics";
import Gallery from "./pages/Gallery/Gallery";
import Slides from "./pages/slides/Slides";
import Slide from "./pages/slide/Slide";
import Banner from "./pages/banner/Banner";
import Testimonials from "./pages/testimonials/Testimonials";
import Testimonial from "./pages/testimonial/Testimonial";
import ProductReviews from "./pages/productReviews/ProductReviews";
import Blogs from "./pages/blogs/Blogs";
import EditViewBlog from "./pages/editViewBlog/EditViewBlog";
import NewBlog from "./pages/newBlog/NewBlog";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import { ToastContainer } from "react-toastify";
import AllOrders from "./pages/allOrders/AllOrders";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

const App = () => {
  const {pathname} = useLocation();

  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container">
        {(pathname !== "/") && <Sidebar />}

        <div className={`content-section ${(pathname === "/")? "admin-page" : ""}`}>
          <Topbar display={(pathname === "/")? false : true}/>
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route path="/users" element={<UserList />}/>
            <Route path="/user/edit/:userId" element={<EditUser />}/> 
            <Route path="/user/view/:userId" element={<ViewUser />}/> 
            <Route path="/orders" element={<AllOrders />}/> 
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/newProduct" element={<NewProduct />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/slides" element={<Slides />} />
            <Route path="/slide/:sliderid" element={<Slide />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/testimonial/:testifierId" element={<Testimonial />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:blogId" element={<EditViewBlog />} />
            <Route path="/blog/:blogId" element={<EditViewBlog />} />
            <Route path="/newBlog" element={<NewBlog />} />
            <Route path="/banner" element={<Banner />} />
            <Route path="/product-reviews" element={<ProductReviews />} />
            <Route path="/" element={<AdminLogin />} />
            <Route path="/changepass" element={<ChangePassword />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
