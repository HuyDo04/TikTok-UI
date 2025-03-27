import config from "@/config";
import useQuery from "@/hooks/useQuery";
import { login } from "@/service/authService";
import httpRequest from "@/utils/httpRequest";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const query = useQuery();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      alert("Login thành công");
      httpRequest.setToken(data.access_token);
      navigate(query.get("continue") || config.routes.home);
    } catch (error) {
      setHasError(true);
    }
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">Email</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setHasError(false);
        }}
      />
      <br />
      <label htmlFor="">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setHasError(false);
        }}
      />
      <br />
      <button type="submit">Login</button>
      {hasError && <p>Email hoặc mật khẩu không hợp lệ</p>}
    </form>
  );
}

export default Login;
