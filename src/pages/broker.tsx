import { useState } from "react";

export default function Broker() {
  const [properties, setProperties] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    location: "",
    images: [""]
  });

  function handleAddProperty() {
    const newProperty = formData.name;
    if (!newProperty) return;
    setProperties(prev => [...prev, newProperty]);
    setFormData({ name: "", price: "", location: "", images: [""] });
    setOpenModal(false);
  }

  function updateImage(index, value) {
    const updated = [...formData.images];
    updated[index] = value;
    setFormData({ ...formData, images: updated });
  }

  function addImageField() {
    setFormData({ ...formData, images: [...formData.images, ""] });
  }

  return (
    <div className="w-full min-h-screen flex bg-white">
      <aside className="w-64 bg-white p-6 border-r border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">
          Specific Broker
        </h2>

        <div className="mt-6 w-full h-48 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-center">
          Broker<br />Image
        </div>

        <div className="bg-gray-100 p-5 rounded-lg border border-gray-300 mt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Broker Info</h3>
          <p className="text-sm text-gray-700 mb-2">Name: [          ]</p>
          <p className="text-sm text-gray-700 mb-2">Email: [        ]</p>
          <p className="text-sm text-gray-700 mb-2">Phone: [         ]</p>
          <p className="text-sm text-gray-700">Company: [    ]</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="w-full bg-gray-800 text-white py-2 rounded-lg mt-6"
        >
          Add Property
        </button>
      </aside>

      <main className="flex-1 p-10">
        <div className="text-center mb-10">
          <input
            type="text"
            placeholder="Search"
            className="w-96 px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 placeholder-gray-500 outline-none"
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Broker Properties
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {properties.length === 0 ? (
            <p className="text-gray-600 col-span-full text-center">
              No properties found
            </p>
          ) : (
            properties.map((item, i) => (
              <div
                key={i}
                className="w-full h-44 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600"
              >
                {item}
              </div>
            ))
          )}
        </div>
      </main>

      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Property</h2>

            <input
              type="text"
              placeholder="Property Name"
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Price"
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
            />

            <input
              type="text"
              placeholder="Location"
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
              value={formData.location}
              onChange={e =>
                setFormData({ ...formData, location: e.target.value })
              }
            />

            {formData.images.map((img, index) => (
              <input
                key={index}
                type="text"
                placeholder="Image URL"
                className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
                value={img}
                onChange={e => updateImage(index, e.target.value)}
              />
            ))}

            <button
              onClick={addImageField}
              className="w-full py-2 bg-gray-200 text-gray-700 rounded mb-4"
            >
              Add one more URL
            </button>

            <div className="flex justify-between">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProperty}
                className="px-4 py-2 bg-gray-800 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
