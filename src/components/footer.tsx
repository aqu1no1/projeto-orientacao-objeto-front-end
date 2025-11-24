import PrimeImob from "../assets/PrimeImob.png";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src={PrimeImob}
            alt="PrimeImob Logo"
            className="w-20 h-20 object-contain"
          />
          <span className="text-xl font-semibold text-white">PrimeImob</span>
        </div>

        <nav className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition">
            About
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
          <a href="#" className="hover:text-white transition">
            Terms
          </a>
        </nav>

        <span className="text-sm text-gray-400 text-center md:text-right">
          © 2025 PrimeImob — Todos os direitos reservados
        </span>
      </div>
    </footer>
  );
}
