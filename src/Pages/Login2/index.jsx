import InputText from "@/component/InputText";
import config from "@/config";
import useQuery from "@/hooks/useQuery";
import loginSchema from "@/schema/loginSchema";
import authService from "@/service/authService";
import httpRequest from "@/utils/httpRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login2() {
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
      navigate(query.get("continue") || config.routes.home);
    } catch (error) {
      setError("general", {
        type: "manual",
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      {/* <input type="text" {...register("email")} />
      
      <input type="password" {...register("password")} /> */}
      <span>Email</span>
      <InputText
        type="email"
        name="email"
        register={register}
        message={errors.email?.message}
      ></InputText>
      <span>Password</span>
      <InputText
        type="password"
        name="password"
        register={register}
        message={errors.password?.message}
      ></InputText>
      {errors.general && <p>{errors.general.message}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default Login2;
