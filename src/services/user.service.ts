import type { AxiosInstance, AxiosResponse } from "axios";
import type { User } from "../models/user.model";

export class UserService {
	private readonly baseUrl: string = 'users';
	private readonly api: AxiosInstance;
	
	constructor(api: AxiosInstance) {
		this.api = api;
	}

	public getProfile(): Promise<AxiosResponse<User>> {
		return this.api.get<User>(`${this.baseUrl}/profile`);
	}

	public getAll(): Promise<AxiosResponse<User[]>> {
		return this.api.get<User[]>(this.baseUrl);
	}

	public getById(id: string): Promise<AxiosResponse<User>> {
		return this.api.get<User>(`${this.baseUrl}/${id}`);
	}
}