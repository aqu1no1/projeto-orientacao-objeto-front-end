
export interface Property {
	id: string;
	title: string;
	dailyRate: number;
	description: string;
	createdAt: string;
	updatedAt: string;
	address: Address;
	owner: PropertyOwner;
	ownerId: string;
    imageUrl: string;
}

export interface Address {
	id: string;
	street: string;
	number?: string;
	complement?: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
	createdAt: string;
	updatedAt: string;
}

export interface PropertyOwner {
	id: string;
	name: string;
	email: string;
}