import { useState } from "react";

export default function Property() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const properties = [
    {
      id: 1,
      title: "1",
      type: "Buy",
      price: 1000000,
      bedrooms: 2,
      bathrooms: 1,
      size: "150m",
      images: [
        "https://www.shutterstock.com/shutterstock/photos/2489817505/display_1500/stock-photo--d-rendering-of-flat-roof-house-with-parking-and-pool-for-sale-or-rent-with-concrete-facade-and-2489817505.jpg",
        "https://www.shutterstock.com/shutterstock/photos/2478836435/display_1500/stock-photo--d-rendering-of-flat-roof-house-with-parking-and-pool-for-sale-or-rent-with-concrete-facade-and-2478836435.jpg",
        "https://www.shutterstock.com/shutterstock/photos/2474071255/display_1500/stock-photo--d-rendering-of-flat-roof-house-with-parking-and-pool-for-sale-or-rent-with-concrete-facade-and-2474071255.jpg"
      ]
    },
    {
      id: 2,
      title: "2",
      type: "Rent",
      price: 3200,
      bedrooms: 3,
      bathrooms: 2,
      size: "200m",
      images: [
        "https://www.shutterstock.com/shutterstock/photos/2170088037/display_1500/stock-photo-shooting-a-country-house-and-the-surrounding-area-2170088037.jpg",
        "https://www.shutterstock.com/shutterstock/photos/2170088013/display_1500/stock-photo-shooting-a-country-house-and-the-surrounding-area-2170088013.jpg",
        "https://www.shutterstock.com/shutterstock/photos/2170088003/display_1500/stock-photo-shooting-a-country-house-and-the-surrounding-area-2170088003.jpg"
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen flex">
      <aside className="w-64 bg-white p-6 border-r border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">
          Property Filters
        </h2>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Type</label>

            <section className="mt-4">
              <input
                type="text"
                className="border-2 rounded px-2 py-1 w-full"
              />
            </section>

            <select className="mt-1 w-full border border-gray-300 rounded p-2">
              <option>All</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Commercial</option>
            </select>

            <select className="mt-1 w-full border border-gray-300 rounded p-2">
              <option>Both</option>
              <option>Buy</option>
              <option>Rent</option>
            </select>
          </div>

          <div>
            <label className="text-gray-700 font-medium">Price Range</label>
            <input type="range" className="w-full" min="500" max="10000" />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Bedrooms</label>
            <select className="mt-1 w-full border border-gray-300 rounded p-2">
              <option>Any</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
            </select>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-medium text-gray-700">
            {properties.length} properties found
          </span>

          <button className="text-gray-800 font-medium hover:text-gray-600 transition">
            Sort by &gt;
          </button>

          <button className="text-gray-800 font-medium hover:text-gray-600 transition">
            Remove Filters
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="cursor-pointer w-full h-48 bg-gray-200 rounded-lg border border-gray-300 overflow-hidden"
              onClick={() => setSelectedProperty(property)}
            >
              <img
                src={property.images[0]}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </main>

      {selectedProperty && (
        <Modal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}
    </div>
  );
}

function Modal({ property, onClose }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % property.images.length);
  const prev = () => setIndex((index - 1 + property.images.length) % property.images.length);

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modal-background") onClose();
  };

  return (
    <div
      id="modal-background"
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black flex justify-center items-center p-4 z-50"
    >
      <div className="bg-white w-full max-w-3xl rounded-lg overflow-hidden relative">
    

        <div className="relative w-full h-64 bg-black">
          <img
            src={property.images[index]}
            className="w-full h-full object-cover"
          />

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded shadow"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded shadow"
          >
            ›
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-semibold">{property.title}</h2>
          <p className="text-gray-700">Type: {property.type}</p>
          <p className="text-gray-700">Price: ${property.price}</p>
          <p className="text-gray-700">Bedrooms: {property.bedrooms}</p>
          <p className="text-gray-700">Bathrooms: {property.bathrooms}</p>
          <p className="text-gray-700">Size: {property.size}</p>
        </div>
      </div>
    </div>
  );
}
