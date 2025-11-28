import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode
} from "react";
import type { User } from "../models/user.model";
import { useApi } from "../services/api.service";
import { UserService } from "../services/user.service";
import { useAuth } from "./AuthContext";

interface UserContextType {
	loading: boolean;
	user: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: Readonly<{ children: ReactNode }>) {
	const api = useApi();
	const { isAuthenticated } = useAuth();
	const userService = useMemo(() => new UserService(api), [api]);

	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			// Só busca o usuário se estiver autenticado
			if (!isAuthenticated) {
				setUser(null);
				setLoading(false);
				return;
			}

			setLoading(true);
			try {
				const response = await userService.getProfile();
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching user profile:", error);
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, [userService, isAuthenticated]);

	const value = useMemo(
		() => ({
			loading,
			user,
		}),
		[loading, user]
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within an UserProvider");
	}
	return context;
}