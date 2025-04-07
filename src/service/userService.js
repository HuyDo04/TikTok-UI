import * as httpRequest from "@/utils/httpRequest";

export const getAll = async () => {
    const response = await httpRequest.get("/users")
    return response.data
}

export const getOne = async (username) => {
    const response = await httpRequest.get(`/users/${username}`); 
    return response.data; 
};

export const update = async (username, data) => {
    const response = await httpRequest.put(`/users/${username}`, data);
    return response
}

export default {
    getAll,
    getOne,
    update
}

