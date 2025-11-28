import type { AxiosInstance, AxiosResponse } from "axios";
import type { Booking, CreateBookingDTO } from "../models/booking.model";

export class BookingService {
	private readonly baseUrl: string = "bookings";
	private readonly api: AxiosInstance;

	constructor(api: AxiosInstance) {
		this.api = api;
	}

	public createBooking(dto: CreateBookingDTO): Promise<AxiosResponse<Booking>> {
		return this.api.post<Booking>(this.baseUrl, dto);
	}

	public getAll(): Promise<AxiosResponse<Booking[]>> {
		return this.api.get<Booking[]>(this.baseUrl);
	}

	public getById(id: string): Promise<AxiosResponse<Booking>> {
		return this.api.get<Booking>(`${this.baseUrl}/${id}`);
	}

	public updateBooking(id: string, dto: CreateBookingDTO): Promise<AxiosResponse<Booking>> {
		return this.api.put<Booking>(`${this.baseUrl}/${id}`, dto);
	}

	public deleteBooking(id: string): Promise<AxiosResponse<void>> {
		return this.api.delete(`${this.baseUrl}/${id}`);
	}
}