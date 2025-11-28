import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);

export const useApi = () => {
	const { token, isAuthenticated, refreshToken, logout } = useAuth();

	apiClient.interceptors.request.use(async (config) => {
		if (!isAuthenticated) {
			return config;
		}

		config.headers["Authorization"] = token;

		return config;
	});

	apiClient.interceptors.response.use(undefined, async (error) => {
		if (error.response?.status === 401) {
			try {
				if (error.config.headers.retry) {
					throw error;
				}

				await refreshToken();

				const token = localStorage.getItem("token");

				const retryConfig = {
					...error.config,
					headers: {
						...error.config.headers,
						retry: true,
						Authorization: token,
					},
				};
				const retryResponse = await apiClient(retryConfig);

				return retryResponse;
			} catch (error) {
				logout();

				throw error;
			}
		}

		throw error;
	});

	return apiClient;
};
