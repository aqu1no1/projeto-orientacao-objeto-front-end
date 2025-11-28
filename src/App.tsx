import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navBar";

import ProtectedRoute from "./ProtectedRoute";

import About from "./pages/about";
import Contact from "./pages/contact";
import Home from "./pages/home";
import Login from "./pages/login";
import Property from "./pages/property";
import Admin from "./pages/admin";

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

					{/* TODO: Make this route protected to admin */}
					<Route
						path="/property"
						element={
							<ProtectedRoute>
								<Property />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin"
						element={
							<ProtectedRoute>
								<Admin />
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
