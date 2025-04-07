import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userService from "@/service/userService";
import { useParams, useNavigate } from "react-router-dom";
import InputText from "@/component/InputText";
import authService from "@/service/authService";
import useDebounce from "@/hooks/useBounce";

let timer;
const schema = yup.object({
  firstName: yup.string().required("Họ không được để trống"),
  lastName: yup.string().required("Tên không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  gender: yup.string(),
  phone: yup.string(),
  birthDate: yup.string(),
  emailVerifiedAt: yup.string(),
});

function EditProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleImage = (e) => {
    const selectFile = e.target.files[0];
    const fileSizeInMB = selectFile.size / (1024 * 1024);
    const typeImage = ["image/jpg", "image/jpeg", "image/png"];

    if (!typeImage.includes(selectFile.type)) {
      alert("Chỉ nhận file jpg, jpeg, png");
    }

    if (fileSizeInMB > 5) {
      alert("Không up ảnh quá 5Mb");
      return;
    }

    if (!selectFile) return;
    setPreview(URL.createObjectURL(selectFile));
  };

  const cancelImage = () => {
    setPreview(null);
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // currentUser
  useEffect(() => {
    const fetchUser = async () => {
      const data = await authService.getCurrentUser();
      console.log(data);
      setCurrentUser(data.data);
    };
    fetchUser();
  }, []);

  // setValue form
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await userService.getOne(username);
        setAvatar(res.data.image);
        setValue("firstName", res.data.firstName);
        setValue("lastName", res.data.lastName);
        setValue("email", res.data.email);
        setValue("gender", res.data.gender);
        setValue("phone", res.data.phone);
        setValue("birthDate", res.data.birthDate);
        setValue("Trạng thái", res.data.emailVerifiedAt);
        setIsUserLoaded(true);
        setLoading(true);
      } catch (err) {
        setError("Không thể tải thông tin người dùng");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username, setValue]);

  const emailValue = watch("email");
  const phoneValue = watch("phone");
  const usernameValue = watch("username");

  const debouncedEmail = useDebounce(emailValue, 400);
  const debouncedPhone = useDebounce(phoneValue, 400);
  const debouncedUsername = useDebounce(usernameValue, 400);

  // Check Email
  useEffect(() => {
    if (!debouncedEmail || !isUserLoaded) return;

    const validateEmail = async () => {
      const isValid = await trigger("email");
      const currentEmail = getValues("email");
      if (isValid) {
        const emailCheck = await authService.checkEmailUpdate(
          currentEmail,
          currentUser.id
        );
        if (emailCheck) {
          setError("email", {
            type: "manual",
            message: "Email này đã được sử dụng",
          });
        }
      }
    };

    validateEmail();
  }, [debouncedEmail, trigger, setError, isUserLoaded]);

  // Check Phone
  useEffect(() => {
    if (!debouncedPhone) return;

    const validatePhone = async () => {
      const isValid = await trigger("phone");
      if (isValid) {
        const phoneCheck = await authService.checkPhone(
          debouncedPhone,
          currentUser.id
        );
        if (phoneCheck) {
          setError("phone", {
            type: "manual",
            message: "Phone này đã được sử dụng",
          });
        }
      }
    };

    validatePhone();
  }, [debouncedPhone, trigger, setError]);

  // Check Username
  useEffect(() => {
    if (!debouncedUsername || !isUserLoaded) return;

    const validateUsername = async () => {
      const isValid = await trigger("username");
      if (isValid) {
        const usernameCheck = await authService.CheckUsername(
          debouncedUsername,
          currentUser.id
        );
        if (usernameCheck) {
          setError("username", {
            type: "manual",
            message: "Username này đã được sử dụng",
          });
        }
      }
    };

    validateUsername();
  }, [debouncedUsername, trigger, setError, isUserLoaded]);
  //submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });

    try {
      setLoading(true);
      await userService.update(username, formData);
      alert("Cập nhật thành công!");
      navigate(`/profile/${username}`);
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
      <label htmlFor="">Họ</label>
      <InputText
        type="text"
        name="firstName"
        register={register}
        message={errors.firstName?.message}
      />
      <label htmlFor="">Tên</label>
      <InputText
        type="text"
        name="lastName"
        register={register}
        message={errors.lastName?.message}
      />
      <label htmlFor="">Email</label>
      <InputText
        type="email"
        name="email"
        register={register}
        message={errors.email?.message}
      />
      <label>Giới tính:</label>
      <select {...register("gender")}>
        <option value="">Chưa cập nhật</option>
        <option value="male">Nam</option>
        <option value="female">Nữ</option>
      </select>
      <label htmlFor="">Số điện thoại</label>
      <InputText
        type="phone"
        name="phone"
        register={register}
        message={errors.phone?.message}
      />
      <label htmlFor="">Ngày sinh</label>
      <InputText
        type="date"
        name="birthDate"
        register={register}
        message={errors.birthDate?.message}
      />
      <label htmlFor="">Trạng thái</label>
      <InputText
        type="text"
        name="emailVerifiedAt"
        register={register}
        message={errors.emailVerifiedAt?.message}
      />

      <label>Avatar:</label>
      <div>
        <img
          src={preview || avatar}
          alt="Avatar"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        {...register("image")}
        onChange={handleImage}
      />
      {preview && (
        <button type="button" onClick={cancelImage}>
          Hủy bỏ ảnh mới
        </button>
      )}
      <button type="submit">{loading ? "Đang lưu..." : "Lưu thay đổi"}</button>
    </form>
  );
}

export default EditProfile;
