import axios from "axios";

const BASE_URL=  import.meta.env.VITE_URL_BACKEND || "https://funcrecer-back-admins.vercel.app/";

const API = axios.create({
    baseURL:BASE_URL
});
export default API;