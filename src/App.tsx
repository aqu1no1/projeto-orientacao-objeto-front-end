import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navBar";

import ProtectedRoute from "./ProtectedRoute";

import About from "./pages/about";
import Brokers from "./pages/broker";
import Brokersearch from "./pages/brokersearch";
import Contact from "./pages/contact";
import Home from "./pages/home";
import Login from "./pages/login";
import Property from "./pages/property";

export default function App() {
	return (
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
	);
}
