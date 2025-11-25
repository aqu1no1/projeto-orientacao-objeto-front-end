export default function Brokersearch() {
  return (
    <div className="w-full min-h-screen flex">
      <aside className="w-64 bg-white p-6 border-r border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">
          Broker Filters
        </h2>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Types</label>

            <section className="mt-4">
            <input type="text" className="border-2 rounded px-2 py-1 w-full" placeholder="Search:" />
            </section>

            <select className="mt-1 w-full border border-gray-300 rounded p-2">
              <option>Both</option>
              <option>Self</option>
              <option>Real Estate contracted</option>
            </select>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-medium text-gray-700">
            124 brokers found
          </span>

          <button className="text-gray-800 font-medium hover:text-gray-600 transition">
            Sort by &gt;
          </button>

          <button className="text-gray-800 font-medium hover:text-gray-600 transition">
            Remove Filters
          </button>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-48 bg-gray-200 rounded-lg border border-gray-300"
            ></div>
          ))}
        </div>
      </main>
    </div>
  );
}
