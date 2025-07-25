// axios.js or axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5001/clone-app-c3da4/us-central1/api", // ✅ Correct local Express server
});

export { axiosInstance };
