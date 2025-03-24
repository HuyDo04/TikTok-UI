import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const getName = (fullname) => {
    const splitFullname = fullname
      .trim()
      .split(" ")
      .filter((word) => word !== "");
    const firstName = splitFullname.pop();
    const lastName = splitFullname.join(" ");
    return [firstName, lastName];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!fullname || !email || !password || !confirmPassword) {
      setErrors({ prinfError: "Vui lòng điền đầy đủ thông tin." });
      return;
    }

    const [firstName, lastName] = getName(fullname);

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Mật khẩu xác nhận không đúng." });
      return;
    }

    // data
    const requestData = {
      firstName,
      lastName,
      email,
      password,
      password_confirmation: confirmPassword,
    };

    fetch("https://api01.f8team.dev/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw errorData;
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
          return;
        }
        alert("Đăng kí thành công..");
        localStorage.setItem("token", data.access_token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.error || error.message || "";

        if (error.errors) {
          setErrors(error.errors);
        } else if (errorMessage.includes("users_email_unique")) {
          setErrors({ email: "Email này đã được sử dụng." });
        } else if (errorMessage.includes("users_username_unique")) {
          setErrors({
            fullname: "Tên người dùng đã được sử dụng. Vui lòng chọn tên khác.",
          });
        } else {
          setErrors({ prinfError: "Có lỗi xảy ra. Vui lòng thử lại sau." });
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Họ và Tên:</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Nhập lại mật khẩu:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng ký</button>
        {errors.prinfError && <p>{errors.prinfError}</p>}
        {errors.fullname && <p className="error">{errors.fullname}</p>}
        {errors.email && <p className="error">{errors.email}</p>}
        {errors.password && <p className="error">{errors.password}</p>}
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
      </form>
    </>
  );
}

export default Register;
