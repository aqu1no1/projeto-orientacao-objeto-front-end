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

interface UserContextType {
	loading: boolean;
	user: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: Readonly<{ children: ReactNode }>) {
	const api = useApi();
	const userService = useMemo(() => new UserService(api), []);

	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);
			try {
				const response = await userService.getProfile();
				setUser(response.data);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, [userService]);

	const value = useMemo(
		() => ({
			loading,
			user,
		}),
		[loading, user]
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useAuth() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an UserProvider");
	}
	return context;
}
