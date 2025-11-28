/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import { useApi } from "../services/api.service";
import { PropertyService } from "../services/property.service";

export default function Admin() {
  const api = useApi();
  const propertyService = useMemo(() => new PropertyService(api), [api]);

  const [form, setForm] = useState({
    title: "",
    dailyRate: "",
    description: "",
    imageUrl: "",
    ownerId: "",
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

    try {
      const data = await propertyService.create({
        ...form,
        dailyRate: +form.dailyRate,
      });
      console.log("Salvo com sucesso:", data);
      alert("Imóvel cadastrado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar o imóvel");
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
          className="border p-2 rounded"
        />
        <input
          name="dailyRate"
          value={form.dailyRate}
          onChange={handleChange}
          placeholder="Daily rate"
          type="number"
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded col-span-2"
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="imageUrl"
          className="border p-2 rounded"
        />

        <h2 className="text-xl col-span-2 mt-4 text-center font-bold ">
          Address
        </h2>
        <input
          name="street"
          value={form.address.street}
          onChange={handleAddressChange}
          placeholder="Street"
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
          className="border p-2 rounded"
        />
        <input
          name="state"
          value={form.address.state}
          onChange={handleAddressChange}
          placeholder="State"
          className="border p-2 rounded"
        />
        <input
          name="zipCode"
          value={form.address.zipCode}
          onChange={handleAddressChange}
          placeholder="ZipCode"
          className="border p-2 rounded"
        />
        <input
          name="country"
          value={form.address.country}
          onChange={handleAddressChange}
          placeholder="Country"
          className="border p-2 rounded col-span-2"
        />

        <button
          type="submit"
          className="bg-gray-600 text-white p-2 rounded col-span-2 mt-4"
        >
          Save
        </button>
      </form>
    </div>
  );
}
