import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5047/api/adm",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


export default api;