import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userService from "@/service/userService";
import { useParams, useNavigate } from "react-router-dom";

const schema = yup.object({
  firstName: yup.string().required("Họ không được để trống"),
  lastName: yup.string().required("Tên không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  gender: yup.string(),
  phone: yup.string(),
  birthDate: yup.date("Nhập ngày tháng năm hợp lệ"),
});

function EditProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res = await userService.getOne(username);
        console.log(res);
        setValue("firstName", res.firstName);
        setValue("lastName", res.lastName);
        setValue("email", res.email);
        setValue("gender", res.gender);
        setValue("phone", res.phone);
        setValue("birthDate", res.birthDate);
      } catch (err) {
        setError("Không thể tải thông tin người dùng");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await userService.update(username, data);
      alert("Cập nhật thành công!");
      navigate(`/p/${username}`);
    } catch (error) {
      console.log("Lỗi cập nhật:", error);
      alert("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Họ:</label>
      <input type="text" {...register("firstName")} />
      <p>{errors.firstName?.message}</p>

      <label>Tên:</label>
      <input type="text" {...register("lastName")} />
      <p>{errors.lastName?.message}</p>

      <label>Email:</label>
      <input type="email" {...register("email")} />
      <p>{errors.email?.message}</p>

      <label>Giới tính:</label>
      <select {...register("gender")}>
        <option value="">Chưa cập nhật</option>
        <option value="male">Nam</option>
        <option value="female">Nữ</option>
      </select>

      <label>Số điện thoại:</label>
      <input type="text" {...register("phone")} />
      <p>{errors.phone?.message}</p>

      <label>Ngày sinh:</label>
      <input type="date" {...register("birthDate")} />
      <p>{errors.birthDate?.message}</p>

      <button type="submit">{loading ? "Đang lưu..." : "Lưu thay đổi"}</button>
    </form>
  );
}

export default EditProfile;
