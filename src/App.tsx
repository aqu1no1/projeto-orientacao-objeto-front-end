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
		<AuthProvider>
			<UserProvider>
				<PropertyProvider>
					<div className="min-h-screen flex flex-col">
						<Navbar />
						<main className="flex-1 p-8">
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/about" element={<About />} />
								<Route path="/contact" element={<Contact />} />
								<Route path="/broker" element={<Brokers />} />
								<Route path="/brokersearch" element={<Brokersearch />} />
								<Route path="/login" element={<Login />} />

								<Route
									path="/property"
									element={
										<ProtectedRoute>
											<Property />
										</ProtectedRoute>
									}
								/>
							</Routes>
						</main>
						<Footer />
					</div>
				</PropertyProvider>
			</UserProvider>
		</AuthProvider>
	);
}