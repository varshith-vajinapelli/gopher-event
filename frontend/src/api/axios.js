import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

/*
TODO (authentication): This reads the saved token and sends it with each API request.
It is disabled for now, so protected backend endpoints will not receive a token.

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
*/

export default api;
