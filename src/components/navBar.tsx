import { Link } from "react-router-dom";
import PrimeImob from "../assets/PrimeImob.png";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
	const { user } = useUser();
	const { isAuthenticated, logout } = useAuth();

	return (
		<nav className="w-full bg-white shadow-md">
			<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<img
						src={PrimeImob}
						alt="PrimeImob Logo"
						className="w-14 h-14 object-contain"
					/>
					<span className="text-2xl font-semibold text-gray-800">
						PrimeImob
					</span>
				</div>

				<ul className="hidden md:flex flex-row gap-8 text-gray-700 font-medium">
					<li>
						<Link to="/" className="hover:text-gray-500 transition">
							Home
						</Link>
					</li>
					<li>
						<Link to="/about" className="hover:text-gray-500 transition">
							About
						</Link>
					</li>
					<li>
						<Link to="/contact" className="hover:text-gray-500 transition">
							Contact
						</Link>
					</li>
					<li>
						<Link to="/property" className="hover:text-gray-500 transition">
							Property
						</Link>
					</li>

					{user?.role === "ADMIN" && (
						<li>
							<Link to="/admin" className="hover:text-gray-500 transition">
								Admin
							</Link>
						</li>
					)}
				</ul>
				{isAuthenticated ? (
					<button
						onClick={logout}
						className="hidden md:block bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
					>
						Logout
					</button>
				) : (
					<Link
						to="/login"
						className="hidden md:block bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
					>
						Login
					</Link>
				)}
			</div>
		</nav>
	);
}
