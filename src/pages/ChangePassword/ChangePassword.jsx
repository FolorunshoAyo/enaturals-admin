import React, { useState } from "react";
import './ChangePassword.css';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { changePass } from "../../redux/apiCalls";
import { CircularProgress } from "@material-ui/core";

const ChangePassword = () => {
    const adminUser = useSelector(state => state.adminUser.currentUser);

    const formSchema = Yup.object().shape({
        formerPassword: Yup.string()
        .required("Provide your former password"),
        password: Yup.string()
          .required('Password is mandatory')
          .min(6, 'Password must be at least 6 char long'),
        newPassword: Yup.string()
          .required('Password is mandatory')
          .oneOf([Yup.ref('password')], 'Passwords does not match'),
    });

    const formOptions = { resolver: yupResolver(formSchema) };
    const {register, handleSubmit, reset, formState: { errors }} = useForm(formOptions);

    const onSubmit = (data) => {
        const {formerPassword, newPassword} = data;

        changePass({ username: adminUser.username, formerPassword, newPassword });

        reset();
    }

    return (
        <div className="changePassword">
            <div className="pagination">
                Quick Menu &gt; Change Admin Password
            </div>
            <form className="changePasswordForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="changePasswordFormGroup">
                    <label htmlFor="currpass">Current Password</label>
                    <input {...register("formerPassword")} type="password" id="currpass" />
                    {errors.formerPassword && <p className="error">{errors.formerPassword.message}</p>}
                </div>
                <div className="changePasswordFormGroup">
                    <label htmlFor="newpass">New Password</label>
                    <input {...register("password")} type="password" id="newpass" />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
                <div className="changePasswordFormGroup">
                    <label htmlFor="repass">Retype New Password</label>
                    <input {...register("newPassword")} type="password" id="repass" />
                    {errors.newPassword && <p className="error">{errors.newPassword.message}</p>}
                </div>
                <div className="changePasswordBtnContainer">
                    <button type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};


export default ChangePassword;

