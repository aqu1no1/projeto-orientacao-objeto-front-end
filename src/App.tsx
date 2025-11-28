import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar";
import Footer from "./components/footer";

import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { PropertyProvider } from "./contexts/PropertyContext";
import ProtectedRoute from "./ProtectedRoute";

import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Property from "./pages/property";
import Brokers from "./pages/broker";
import Brokersearch from "./pages/brokersearch";
import Login from "./pages/login";

export default function App() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1 p-8">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/about" element={<About />} />

					<Route
						path="/contact"
						element={
							<ProtectedRoute>
								<Contact />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/broker"
						element={
							<ProtectedRoute>
								<Brokers />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/brokersearch"
						element={
							<ProtectedRoute>
								<Brokersearch />
							</ProtectedRoute>
						}
					/>
					{/* TODO: Make this route protected to admin */}
					<Route
						path="/property"
						element={
							<ProtectedRoute>
								<Property />
							</ProtectedRoute>
						}
					/>

					<Route path="*" element={<h1>404 - Not Found</h1>} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}