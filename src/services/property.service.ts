import type { AxiosInstance, AxiosResponse } from "axios";
import type { Property } from "../models/property.model";
import type { CreatePropertyDto } from "../dtos/create-property.dto";

export class PropertyService {
  private readonly baseUrl: string = "properties";
  private readonly api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  public getAll(): Promise<AxiosResponse<Property[]>> {
    return this.api.get<Property[]>(this.baseUrl);
  }

  public getById(id: string): Promise<AxiosResponse<Property>> {
    return this.api.get<Property>(`${this.baseUrl}/${id}`);
  }

  public create(property: CreatePropertyDto): Promise<AxiosResponse<Property>> {
    return this.api.post<Property>(this.baseUrl, property);
  }

  public update(
    id: string,
    property: Partial<Property>
  ): Promise<AxiosResponse<Property>> {
    return this.api.put<Property>(`${this.baseUrl}/${id}`, property);
  }

  public delete(id: string): Promise<AxiosResponse<void>> {
    return this.api.delete(`${this.baseUrl}/${id}`);
  }
}
