export default function About() {
  return (
    <section className="w-full bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="w-full">
          <img
            src="https://images.pexels.com/photos/7031407/pexels-photo-7031407.jpeg"
            alt="Modern building"
            className="rounded-2xl shadow-xl w-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About <span className="text-gray-600">PrimeImob</span>
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            PrimeImob is a modern real estate platform dedicated to connecting
            people with properties that perfectly match their lifestyle, needs,
            and investment goals. Focused on transparency, innovation, and
            customer satisfaction, PrimeImob simplifies every step of the real
            estate experience.
          </p>

          <p className="text-gray-700 leading-relaxed text-lg mb-8">
            With cutting-edge technology, high-quality listings, and powerful
            visual tools, we help buyers, renters, and investors make confident,
            well-informed decisions. Our goal is to make finding the perfect
            property simple, intuitive, and enjoyable.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white p-5 rounded-xl shadow border text-center">
              <i className="fa-solid fa-shield-halved text-indigo-600 text-3xl mb-3"></i>
              <h3 className="font-semibold text-gray-900 mb-1">Trust</h3>
              <p className="text-sm text-gray-600">
                Secure and transparent service.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow border text-center">
              <i className="fa-solid fa-lightbulb text-indigo-600 text-3xl mb-3"></i>
              <h3 className="font-semibold text-gray-900 mb-1">Innovation</h3>
              <p className="text-sm text-gray-600">
                Modern tools & technology.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow border text-center">
              <i className="fa-solid fa-handshake text-indigo-600 text-3xl mb-3"></i>
              <h3 className="font-semibold text-gray-900 mb-1">Commitment</h3>
              <p className="text-sm text-gray-600">
                Always focused on your needs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 text-center mb-10">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">12k+</h3>
              <p className="text-gray-600 text-sm">Satisfied Clients</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">300+</h3>
              <p className="text-gray-600 text-sm">Available Listings</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">98%</h3>
              <p className="text-gray-600 text-sm">Positive Feedback</p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <a
              href="#properties"
              className="inline-block bg-gray-800 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-gray-700 transition"
            >
              Explore Properties
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
