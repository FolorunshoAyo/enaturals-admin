import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Analytics from "./pages/analytics/Analytics";
import Gallery from "./pages/Gallery/Gallery";

const App = () => {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/users" element={<UserList />}/>
          <Route path="/user/:userId" element={<User />}/> 
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newProduct" element={<NewProduct />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
