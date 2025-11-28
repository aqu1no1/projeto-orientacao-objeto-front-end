import type { User } from "./user.model";

export interface Property {
  id: string;
  title: string;
  dailyRate: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
  owner?: User;
  ownerId: string;
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
