export default function Broker() {
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
          {[
            "Property 1", "Property 2", "Property 3", "Property 4",
            "Property 5", "Property 6", "Property 7", "Property 8"
          ].map((item, i) => (
            <div
              key={i}
              className="w-full h-44 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600"
            >
              {item}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}