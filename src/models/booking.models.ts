import type { Property } from "./property.model";

export interface Booking {
	id: string;
	userId: string;
	propertyId: string;
	startDate: string;
	endDate: string;
	totalPrice: number;
	createdAt: string;
	updatedAt: string;
	property?: Property;
}

export interface CreateBookingDTO {
	propertyId: string;
	startDate: string;
	endDate: string;
}