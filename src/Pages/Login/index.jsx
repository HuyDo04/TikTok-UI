import InputText from "@/component/InputText";
import config from "@/config";
import useQuery from "@/hooks/useQuery";
import loginSchema from "@/schema/loginSchema";
import authService from "@/service/authService";
import httpRequest from "@/utils/httpRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import UserContext from "@/context/UserContext";
const cx = classNames.bind(styles);
function Login() {
  // const { setUser } = useContext(UserContext);
  const query = useQuery();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await authService.login(data.email, data.password);
      alert("Login thành công");
      httpRequest.setToken(res.access_token);
      // const data1 = await authService.getCurrentUser();
      // setUser(data1);
      navigate(query.get("continue") || config.routes.home);
    } catch (error) {
      setError("general", {
        type: "manual",
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }
  };

  return (
    <div className={cx("container")}>
      <form onSubmit={handleSubmit(onSubmit)} className={cx("form")}>
        <label className={cx("label")}>Email</label>
        <InputText
          type="email"
          name="email"
          register={register}
          className={cx("input")}
          message={errors.email?.message}
        />

        <label className={cx("label")}>Password</label>
        <InputText
          type="password"
          name="password"
          register={register}
          className={cx("input")}
          message={errors.password?.message}
        />

        {errors.general && (
          <p className={cx("error")}>{errors.general.message}</p>
        )}

        <div className={cx("Button")}>
          <button type="submit" className={cx("subButton")}>
            Đăng nhập
          </button>
        </div>
        <div className={cx("register-link")}>
          <NavLink to="/register">Bạn chưa có tài khoản. Đăng ký ngay.</NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
