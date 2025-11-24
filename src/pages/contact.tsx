export default function Contact() {
  return (
    <section id="contact" className="w-full bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
          Contact <span className="text-gray-600">PrimeImob</span>
        </h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
          Have questions, want more information, or interested in one of our
          properties? Get in touch — our team is ready to assist you.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border shadow-sm">
              <i className="fa-solid fa-phone text-gray-600 text-2xl"></i>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Phone</h4>
                <p className="text-gray-600">+55 (11) 99999-9999</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border shadow-sm">
              <i className="fa-solid fa-envelope text-gray-600 text-2xl"></i>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                <p className="text-gray-600">contact@primeimob.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border shadow-sm">
              <i className="fa-solid fa-location-dot text-gray-600 text-2xl"></i>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Address</h4>
                <p className="text-gray-600">
                  Avenida Paulista, 1234, São Paulo – SP
                </p>
              </div>
            </div>
          </div>

          <form
            action="#"
            className="bg-gray-50 p-8 rounded-2xl shadow-lg border space-y-6"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-gray-500 outline-none"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-gray-500 outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Message
              </label>
              <textarea
                className="w-full border rounded-lg p-3 h-32 resize-none focus:ring-2 focus:ring-gray-500 outline-none"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
