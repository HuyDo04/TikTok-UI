import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authService, {
  checkEmail,
  register as registerAPI,
} from "@/service/authService";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import userSchema from "@/schema/userSchema";
import styles from "./Register2.module.scss";
import InputText from "@/component/InputText";

let timer;
function Register2() {
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formControl}>
          <span>Họ và tên</span>
          <InputText
            name="fullname"
            register={register}
            message={errors.fullname?.message}
          ></InputText>
        </div>
        <div className={styles.formControl}>
          <span>Email</span>
          <InputText
            type="email"
            name="email"
            register={register}
            message={errors.email?.message}
          ></InputText>
        </div>
        <div className={styles.formControl}>
          <span>Password</span>
          <InputText
            type="password"
            name="password"
            register={register}
            message={errors.password?.message}
          ></InputText>
        </div>
        <div className={styles.formControl}>
          <span>Confirm Password</span>
          <InputText
            type="password"
            name="confirmPassword"
            register={register}
            message={errors.confirmPassword?.message}
          ></InputText>
        </div>
        <div className={styles.formControl}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register2;
