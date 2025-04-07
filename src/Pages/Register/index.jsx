import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authService, {
  checkEmail,
  register as registerAPI,
} from "@/service/authService";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import userSchema from "@/schema/userSchema";
import InputText from "@/component/InputText";

import styles from "./Register.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
let timer;
function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const getName = (fullname) => {
    const splitFullname = fullname
      .trim()
      .split(" ")
      .filter((word) => word !== "");
    const firstName = splitFullname.pop();
    const lastName = splitFullname.join(" ");
    return [firstName, lastName];
  };

  const onSubmit = async (data) => {
    const [firstName, lastName] = getName(data.fullname);

    try {
      const res = await registerAPI({
        firstName,
        lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      alert("Đăng ký thành công.");
      localStorage.setItem("token", res.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const emailValue = watch("email");
  useEffect(() => {
    if (!emailValue) return;
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const isValid = await trigger("email");
      if (isValid) {
        const emailCheck = await authService.checkEmail(emailValue);
        if (emailCheck) {
          setError("email", {
            type: "manual",
            message: "Email này đã được sử dụng",
          });
        }
      }
    }, 400);
  }, [emailValue, trigger, setError]);

  return (
    <div className={cx("container")}>
      <form onSubmit={handleSubmit(onSubmit)} className={cx("form")}>
        <div className={cx("formGroup")}>
          <label className={cx("label")}>Họ và Tên:</label>
          <InputText
            className={cx("input")}
            name="fullname"
            register={register}
            message={errors.fullname?.message}
          />
        </div>
        <div className={cx("formGroup")}>
          <label className={cx("label")}>Email:</label>
          <InputText
            className={cx("input")}
            type="email"
            name="email"
            register={register}
            message={errors.email?.message}
          />
        </div>
        <div className={cx("formGroup")}>
          <label className={cx("label")}>Mật khẩu:</label>
          <InputText
            className={cx("input")}
            type="password"
            name="password"
            register={register}
            message={errors.password?.message}
          />
        </div>
        <div className={cx("formGroup")}>
          <label className={cx("label")}>Nhập lại mật khẩu:</label>
          <InputText
            className={cx("input")}
            type="password"
            name="confirmPassword"
            register={register}
            message={errors.confirmPassword?.message}
          />
        </div>
        <div className={cx("Button")}>
          <button type="submit" className={cx("subButton")}>
            Đăng ký
          </button>
        </div>
        <div className={cx("registerLink")}>
          <NavLink to="/login">Bạn đã có tài khoản? Đăng nhập ngay</NavLink>
        </div>
      </form>
    </div>
  );
}

export default Register;
