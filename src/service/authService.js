import * as httpRequest from "@/utils/httpRequest";

export const getCurrentUser = async () => {
    const response = await httpRequest.get("/auth/me")
    return response.data
}

export const register = async ({ firstName, lastName, email, password, confirmPassword }) => {
     const requestData = {
      firstName,
      lastName,
      email,
      password,
      password_confirmation: confirmPassword,
    };
  try {
      const response = await httpRequest.post("/auth/register", 
        requestData,
        )
    return response
  } catch (error) {
    // ? tránh lỗi response là undefined
    throw error.response?.data || error.message;
  }
}

export const login = async (email, password) => {
    const formData = {
        email,
        password
    }
   try {
     const response = await httpRequest.post("/auth/login", 
        formData)
    return response.data
   } catch (error) {
        throw error
   }
}

export const logout = async () => {
    const token = localStorage.getItem("token"); 
    if (!token) return

    try {
        const response = await httpRequest.post("/auth/logout");
        httpRequest.setToken(null);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi logout:", error);
        throw error.response?.data || error.message;
    }
};

export const checkEmail = async (email) => {
    try {
        const res = await httpRequest.get(`/auth/check-email?email=${email}`)
        return res.exists
    } catch (error) {
        return false
    }
}

export const verifyToken = async (token) => {
  try {
    const response = await httpRequest.get('/auth/verify', {
      headers: { 
        Authorization: `Bearer ${token}` 
      }
    });
    return response.data.isValid; 
  } catch (error) {
    return false;
  }
};

export default {
    getCurrentUser,
    register,
    login,
    logout,
    checkEmail,
    verifyToken
}