import axios from "../api/axios";

export async function registerUser(data) {
    const response = await axios.post(`/register`, data);
    return response.data;
}