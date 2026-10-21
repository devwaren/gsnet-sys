import { setEnv } from "@dev-waren/react-form-kit";
import axios from "axios";

export const axiosClient = axios.create({
	baseURL: setEnv("VITE_API_URL"),
	withCredentials: true,
});
