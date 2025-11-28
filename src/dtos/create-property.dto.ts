import type { CreateAddressDto } from "./create-address.dto";

export interface CreatePropertyDto {
  title: string;
  imageUrl: string;
  dailyRate: number;
  description: string;
  address: CreateAddressDto;
}
