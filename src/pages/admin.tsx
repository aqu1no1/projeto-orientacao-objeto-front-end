/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { useApi } from "../services/api.service";
import { PropertyService } from "../services/property.service";
import { useProperty } from "../contexts/PropertyContext";
import type { CreatePropertyDto } from "../dtos/create-property.dto";

export default function Admin() {
  const api = useApi();
  const propertyService = useMemo(() => new PropertyService(api), [api]);
  const { fetchProperties } = useProperty(); 

  const [form, setForm] = useState({
    title: "",
    dailyRate: "",
    description: "",
    imageUrl: "",
    address: {
      street: "",
      number: "",
      complement: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleAddressChange(e: any) {
    const { name, value } = e.target;
    setForm({ ...form, address: { ...form.address, [name]: value } });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    try {
      const dto: CreatePropertyDto = {
        title: form.title,
        dailyRate: Number(form.dailyRate),
        description: form.description,
        imageUrl: form.imageUrl,
        address: {
          street: form.address.street,
          number: form.address.number,
          complement: form.address.complement,
          city: form.address.city,
          state: form.address.state,
          zipCode: form.address.zipCode,
          country: form.address.country,
        },
      };

      await propertyService.create(dto);
      
      await fetchProperties();
      
      alert("Property registered successfully!");
      
      setForm({
        title: "",
        dailyRate: "",
        description: "",
        imageUrl: "",
        address: {
          street: "",
          number: "",
          complement: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
      });
    } catch (err: any) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Error saving property";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Property Registration
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="border p-2 rounded"
        />
        <input
          name="dailyRate"
          value={form.dailyRate}
          onChange={handleChange}
          placeholder="Daily rate"
          type="number"
          required
          min="0"
          step="0.01"
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="border p-2 rounded col-span-2"
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="border p-2 rounded col-span-2"
        />

        <h2 className="text-xl col-span-2 mt-4 text-center font-bold ">
          Address
        </h2>
        <input
          name="street"
          value={form.address.street}
          onChange={handleAddressChange}
          placeholder="Street"
          required
          className="border p-2 rounded col-span-2"
        />
        <input
          name="number"
          value={form.address.number}
          onChange={handleAddressChange}
          placeholder="Number"
          className="border p-2 rounded"
        />
        <input
          name="complement"
          value={form.address.complement}
          onChange={handleAddressChange}
          placeholder="Complement"
          className="border p-2 rounded"
        />
        <input
          name="city"
          value={form.address.city}
          onChange={handleAddressChange}
          placeholder="City"
          required
          className="border p-2 rounded"
        />
        <input
          name="state"
          value={form.address.state}
          onChange={handleAddressChange}
          placeholder="State"
          required
          className="border p-2 rounded"
        />
        <input
          name="zipCode"
          value={form.address.zipCode}
          onChange={handleAddressChange}
          placeholder="ZipCode"
          required
          className="border p-2 rounded"
        />
        <input
          name="country"
          value={form.address.country}
          onChange={handleAddressChange}
          placeholder="Country"
          required
          className="border p-2 rounded col-span-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-600 text-white p-2 rounded col-span-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};