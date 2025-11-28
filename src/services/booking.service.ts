import type { AxiosInstance, AxiosResponse } from "axios";
import type { CreateBookingDto } from "../dtos/create-booking.dto";
import type { Booking } from "../models/booking.model";

export class BookingService {
	private readonly baseUrl: string = "bookings";
	private readonly api: AxiosInstance;

	constructor(api: AxiosInstance) {
		this.api = api;
	}

	public create(
		createBookingDto: CreateBookingDto
	): Promise<AxiosResponse<Booking>> {
		return this.api.post(`${this.baseUrl}`, createBookingDto);
	}

	public getById(bookingId: string): Promise<AxiosResponse<Booking>> {
		return this.api.get(`${this.baseUrl}/${bookingId}`);
	}

	public getAll(): Promise<AxiosResponse<Booking[]>> {
		return this.api.get(`${this.baseUrl}`);
	}

	public delete(bookingId: string): Promise<AxiosResponse<void>> {
		return this.api.delete(`${this.baseUrl}/${bookingId}`);
	}

	public update(
		bookingId: string,
		updateData: CreateBookingDto
	): Promise<AxiosResponse<Booking>> {
		return this.api.put(`${this.baseUrl}/${bookingId}`, updateData);
	}
}
