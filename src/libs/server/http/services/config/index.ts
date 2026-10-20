import { setEnv } from "@dev-waren/mongodb";
import axios from "axios";

export const axiosServer = axios.create({
	baseURL: setEnv("BASE_URL"),
	withCredentials: true,
});
