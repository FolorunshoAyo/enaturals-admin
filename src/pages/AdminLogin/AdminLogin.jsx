import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import "./AdminLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const admin = useSelector((state) => state.adminUser.currentUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const handlePasswordState = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  useEffect(() => {
    if (admin !== null) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [admin, navigate]);

  const onSubmit = (data) => {
    login(dispatch, data);
  };

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h2 className="title">Admin Login</h2>
        <form
          method="post"
          className="loginForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="loginFormGroup">
            <label htmlFor="username" className="loginLabel">
              Username
            </label>
            <input
              {...register("username", {
                required: "please provide a username",
              })}
              className="loginInput"
              id="username"
              placeholder="e.g Trixx..."
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>
          <div className="loginFormGroup">
            <label htmlFor="pwd" className="loginLabel">
              Password
            </label>
            <div className="passwordContainer">
              <input
                {...register("password", {
                  required: "please input a password",
                  minLength: {
                    value: 6,
                    message: "The minimum characters is six",
                  },
                })}
                type={passwordVisibility ? "text" : "password"}
                className="passwordInput"
                id="pwd"
                placeholder="Enter password..."
              />
              <div className="iconContainer">
                {passwordVisibility ? (
                  <VisibilityOff
                    style={{ fontSize: 20, cursor: "pointer" }}
                    onClick={handlePasswordState}
                  />
                ) : (
                  <Visibility
                    style={{ fontSize: 20, cursor: "pointer" }}
                    onClick={handlePasswordState}
                  />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          <div className="submitBtnContainer">
            <button type="submit" className="loginBtn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
