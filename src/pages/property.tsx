import { useState, useMemo } from "react";
import { useProperty } from "../contexts/PropertyContext";
import { useApi } from "../services/api.service";
import { BookingService } from "../services/booking.service";
import type { Property } from "../models/property.model";
import type { CreateBookingDTO } from "../models/booking.model";

export default function PropertyPage() {
	const { properties, loading } = useProperty();
	const api = useApi();
	const bookingService = useMemo(() => new BookingService(api), [api]);

	const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [priceRange, setPriceRange] = useState(10000);
	const [showBookingModal, setShowBookingModal] = useState(false);

	const filteredProperties = useMemo(() => {
		return properties.filter((property) => {
			const matchesSearch =
				property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				property.address.city.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesPrice = property.dailyRate <= priceRange;

			return matchesSearch && matchesPrice;
		});
	}, [properties, searchTerm, priceRange]);

	const handlePropertyClick = (property: Property) => {
		setSelectedProperty(property);
		setShowBookingModal(false);
	};

	const handleBookProperty = () => {
		const token = localStorage.getItem("token");
		if (!token) {
			alert("You must be logged in to make a booking!");
			window.location.href = "/login";
			return;
		}
		setShowBookingModal(true);
	};

	return (
		<div className="w-full min-h-screen flex">
			<aside className="w-64 bg-white p-6 border-r border-gray-200">
				<h2 className="text-2xl font-semibold text-gray-800">Property Filters</h2>

				<div className="mt-6 space-y-4">
					<div>
						<label className="text-gray-700 font-medium">Search</label>
						<input
							type="text"
							placeholder="City, title..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="mt-2 border-2 rounded px-2 py-1 w-full"
						/>
					</div>

					<div>
						<label className="text-gray-700 font-medium">
							Max Daily Rate: ${priceRange}
						</label>
						<input
							type="range"
							className="w-full"
							min="100"
							max="10000"
							value={priceRange}
							onChange={(e) => setPriceRange(Number(e.target.value))}
						/>
					</div>

					<button
						onClick={() => {
							setSearchTerm("");
							setPriceRange(10000);
						}}
						className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
					>
						Clear Filters
					</button>
				</div>
			</aside>

			<main className="flex-1 p-10">
				<div className="flex items-center justify-between mb-6">
					<span className="text-lg font-medium text-gray-700">
						{filteredProperties.length} properties found
					</span>
				</div>

				{loading && (
					<div className="text-center py-20">
						<div className="text-gray-600">Loading properties...</div>
					</div>
				)}

				{!loading && (
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
						{filteredProperties.length === 0 ? (
							<div className="col-span-full text-center text-gray-600 py-20">
								No properties found
							</div>
						) : (
							filteredProperties.map((property) => (
								<PropertyCard
									key={property.id}
									property={property}
									onClick={() => handlePropertyClick(property)}
								/>
							))
						)}
					</div>
				)}
			</main>

			{selectedProperty && !showBookingModal && (
				<PropertyModal
					property={selectedProperty}
					onClose={() => setSelectedProperty(null)}
					onBook={handleBookProperty}
				/>
			)}

			{selectedProperty && showBookingModal && (
				<BookingModal
					property={selectedProperty}
					bookingService={bookingService}
					onClose={() => setShowBookingModal(false)}
					onSuccess={() => {
						setShowBookingModal(false);
						setSelectedProperty(null);
						alert("Booking created successfully!");
					}}
				/>
			)}
		</div>
	);
}

interface PropertyCardProps {
	property: Property;
	onClick: () => void;
}

function PropertyCard({ property, onClick }: PropertyCardProps) {
	return (
		<div
			className="cursor-pointer bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-lg transition"
			onClick={onClick}
		>
			<div className="w-full h-48 overflow-y-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
				<img src={property.imageUrl}></img>
			</div>
			<div className="p-3">
				<h3 className="font-semibold text-gray-900 truncate">{property.title}</h3>
				<p className="text-sm text-gray-600 truncate">
					{property.address.city}, {property.address.state}
				</p>
				<p className="text-lg font-bold text-gray-800 mt-1">
					${property.dailyRate}/day
				</p>
			</div>
		</div>
	);
}

interface PropertyModalProps {
	property: Property;
	onClose: () => void;
	onBook: () => void;
}

function PropertyModal({ property, onClose, onBook }: PropertyModalProps) {
	const handleBackgroundClick = (e: React.MouseEvent) => {
		if ((e.target as HTMLElement).id === "modal-background") onClose();
	};

	return (
		<div
			id="modal-background"
			onClick={handleBackgroundClick}
			className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50"
		>
			<div className="bg-white w-full max-w-3xl rounded-lg overflow-hidden relative">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-100 z-10"
				>
					✕
				</button>

				<div className="relative w-full h-64 overflow-y-hidden bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
					<img src={property.imageUrl}></img>
				</div>

				<div className="p-6">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						{property.title}
					</h2>

					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<p className="text-sm text-gray-500">Daily Rate</p>
							<p className="text-xl font-bold text-gray-900">${property.dailyRate}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Owner</p>
							<p className="text-lg text-gray-900">{property.owner?.name || "N/A"}</p>
						</div>
					</div>

					<div className="mb-4">
						<p className="text-sm text-gray-500">Address</p>
						<p className="text-gray-900">
							{property.address.street}
							{property.address.number && `, ${property.address.number}`}
						</p>
						<p className="text-gray-900">
							{property.address.city}, {property.address.state} -{" "}
							{property.address.zipCode}
						</p>
						<p className="text-gray-900">{property.address.country}</p>
					</div>

					{property.description && (
						<div className="mb-4">
							<p className="text-sm text-gray-500 mb-1">Description</p>
							<p className="text-gray-700">{property.description}</p>
						</div>
					)}

					<div className="mt-6 flex gap-3">
						<button
							onClick={onBook}
							className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
						>
							Book Property
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

interface BookingModalProps {
	property: Property;
	bookingService: BookingService;
	onClose: () => void;
	onSuccess: () => void;
}

function BookingModal({
	property,
	bookingService,
	onClose,
	onSuccess,
}: BookingModalProps) {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const calculateTotal = () => {
		if (!startDate || !endDate) return 0;

		const start = new Date(startDate);
		const end = new Date(endDate);
		const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

		return days > 0 ? days * property.dailyRate : 0;
	};

	const calculateDays = () => {
		if (!startDate || !endDate) return 0;

		const start = new Date(startDate);
		const end = new Date(endDate);
		return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!startDate || !endDate) {
			setError("Please select both start and end dates");
			return;
		}

		const start = new Date(startDate);
		const end = new Date(endDate);

		if (end <= start) {
			setError("End date must be after start date");
			return;
		}

		setLoading(true);

		try {
			const dto: CreateBookingDTO = {
				propertyId: property.id,
				startDate: startDate,
				endDate: endDate,
			};

			await bookingService.createBooking(dto);
			onSuccess();
		} catch (err: any) {
			const errorMsg = err.response?.data?.message || "Failed to create booking. Please try again.";
			setError(errorMsg);
		} finally {
			setLoading(false);
		}
	};

	const handleBackgroundClick = (e: React.MouseEvent) => {
		if ((e.target as HTMLElement).id === "booking-modal-background") onClose();
	};

	const totalPrice = calculateTotal();
	const numberOfDays = calculateDays();

	return (
		<div
			id="booking-modal-background"
			onClick={handleBackgroundClick}
			className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50"
		>
			<div className="bg-white w-full max-w-md rounded-lg overflow-hidden relative">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-100 z-10"
				>
					✕
				</button>

				<div className="p-6">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Book {property.title}
					</h2>

					{error && (
						<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-gray-700 font-medium mb-1">
								Start Date
							</label>
							<input
								type="date"
								required
								min={new Date().toISOString().split("T")[0]}
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
								className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
							/>
						</div>

						<div>
							<label className="block text-gray-700 font-medium mb-1">
								End Date
							</label>
							<input
								type="date"
								required
								min={startDate || new Date().toISOString().split("T")[0]}
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
								className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
							/>
						</div>

						<div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
							<div className="flex justify-between mb-2">
								<span className="text-gray-600">Daily Rate:</span>
								<span className="font-semibold">${property.dailyRate}</span>
							</div>
							{startDate && endDate && totalPrice > 0 && (
								<>
									<div className="flex justify-between mb-2">
										<span className="text-gray-600">Number of Days:</span>
										<span className="font-semibold">{numberOfDays}</span>
									</div>
									<div className="flex justify-between pt-2 border-t border-gray-300">
										<span className="text-lg font-bold">Total:</span>
										<span className="text-lg font-bold text-green-600">
											${totalPrice.toFixed(2)}
										</span>
									</div>
								</>
							)}
						</div>

						<button
							type="submit"
							disabled={loading || !startDate || !endDate}
							className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? "Processing..." : "Confirm Booking"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}