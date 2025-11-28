import { useState, useEffect } from "react";

interface Property {
	id: string;
	title: string;
	dailyRate: number;
	description: string;
	address: {
		street: string;
		city: string;
		state: string;
		country: string;
		zipCode: string;
		number?: string;
	};
	owner: {
		name: string;
		email: string;
	};
}

export default function Property() {
	const [selectedProperty, setSelectedProperty] = useState<Property | null>(
		null
	);
	const [properties, setProperties] = useState<Property[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const [searchTerm, setSearchTerm] = useState("");
	const [priceRange, setPriceRange] = useState(10000);
	const [propertyType, setPropertyType] = useState("All");
	const [transactionType, setTransactionType] = useState("Both");
	const [bedrooms, setBedrooms] = useState("Any");

	useEffect(() => {
		fetchProperties();
	}, []);

	const fetchProperties = async () => {
		try {
			setLoading(true);
			const response = { data: [] };
			setProperties(response.data);
		} catch (err: any) {
			setError("Failed to load properties");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const filteredProperties = properties.filter((property) => {
		const matchesSearch =
			property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property.address.city.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesPrice = property.dailyRate <= priceRange;

		return matchesSearch && matchesPrice;
	});

	return (
		<div className="w-full min-h-screen flex">
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

				{error && (
					<div className="text-center py-20">
						<div className="text-red-600">{error}</div>
					</div>
				)}

				{!loading && !error && (
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
						{filteredProperties.length === 0 ? (
							<div className="col-span-full text-center text-gray-600 py-20">
								No properties found
							</div>
						) : (
							filteredProperties.map((property) => (
								<div
									key={property.id}
									className="cursor-pointer bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-lg transition"
									onClick={() => setSelectedProperty(property)}
								>
									<div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
										<i className="fa-solid fa-home text-4xl text-gray-500"></i>
									</div>
									<div className="p-3">
										<h3 className="font-semibold text-gray-900 truncate">
											{property.title}
										</h3>
										<p className="text-sm text-gray-600 truncate">
											{property.address.city}, {property.address.state}
										</p>
										<p className="text-lg font-bold text-gray-800 mt-1">
											${property.dailyRate}/day
										</p>
									</div>
								</div>
							))
						)}
					</div>
				)}
			</main>

			{selectedProperty && (
				<Modal
					property={selectedProperty}
					onClose={() => setSelectedProperty(null)}
				/>
			)}
		</div>
	);
}

function Modal({
	property,
	onClose,
}: {
	property: Property;
	onClose: () => void;
}) {
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

				<div className="relative w-full h-64 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
					<i className="fa-solid fa-home text-6xl text-gray-600"></i>
				</div>

				<div className="p-6">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						{property.title}
					</h2>

					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<p className="text-sm text-gray-500">Daily Rate</p>
							<p className="text-xl font-bold text-gray-900">
								${property.dailyRate}
							</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Owner</p>
							<p className="text-lg text-gray-900">
								{property.owner?.name || "N/A"}
							</p>
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
						<div>
							<p className="text-sm text-gray-500 mb-1">Description</p>
							<p className="text-gray-700">{property.description}</p>
						</div>
					)}

					<div className="mt-6 flex gap-3">
						<button className="flex-1 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition">
							Contact Owner
						</button>
						<button className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition">
							Save Property
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
