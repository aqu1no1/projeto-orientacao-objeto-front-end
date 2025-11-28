import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import type { Property } from "../models/property.model";
import { useApi } from "../services/api.service";
import { PropertyService } from "../services/property.service";

interface PropertyContextType {
	loading: boolean;
	properties: Property[];
	fetchProperties: () => Promise<void>;
	getPropertyById: (id: string) => Property | undefined;
}

const PropertyContext = createContext<PropertyContextType | undefined>(
	undefined
);

export function PropertyProvider({
	children,
}: Readonly<{ children: ReactNode }>) {
	const api = useApi();
	const propertyService = useMemo(() => new PropertyService(api), [api]);

	const [loading, setLoading] = useState(true);
	const [properties, setProperties] = useState<Property[]>([]);

	const fetchProperties = useCallback(async () => {
		setLoading(true);
		try {
			const response = await propertyService.getAll();
			setProperties(response.data);
		} catch (error) {
			console.error("Error fetching properties:", error);
		} finally {
			setLoading(false);
		}
	}, [propertyService]);

	useEffect(() => {
		fetchProperties();
	}, [fetchProperties]);

	const getPropertyById = useCallback(
		(id: string) => {
			return properties.find((p) => p.id === id);
		},
		[properties]
	);

	const value = useMemo(
		() => ({
			loading,
			properties,
			fetchProperties,
			getPropertyById,
		}),
		[loading, properties, fetchProperties, getPropertyById]
	);

	return (
		<PropertyContext.Provider value={value}>
			{children}
		</PropertyContext.Provider>
	);
}

export function useProperty() {
	const context = useContext(PropertyContext);
	if (context === undefined) {
		throw new Error("useProperty must be used within a PropertyProvider");
	}
	return context;
}