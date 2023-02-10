import axios from "axios";

const BASE_URL=  "https://funcrecer-back-admins.vercel.app/";

const API = axios.create({
    baseURL:  BASE_URL
});
export default API;