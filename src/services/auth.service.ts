import type { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";

export interface LoginResponse {
	token: string;
	refreshToken: string;
}

export class AuthService {
	private readonly baseUrl: string = 'auth';
	private readonly api: AxiosInstance;
	
	constructor() {
		this.api = axios.create({
			baseURL: import.meta.env.VITE_API_BASE_URL,
		});
	}

	public login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
		return this.api.post<LoginResponse>(`${this.baseUrl}/login`, { email, password });
	}

	public register(name: string, email: string, password: string) {
		return this.api.post(`${this.baseUrl}/register`, { name, email, password });
	}

	public refreshToken(refreshToken: string) {
		return this.api.post(`${this.baseUrl}/refresh-token`, { refreshToken });
	}
}