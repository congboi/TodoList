import axios from "axios";

const BASE_URL = import.meta.evn.MODE === "development" ? "http://localhost:5000/api" : "/api";

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;