import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";

interface AuthContextType {
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
	logout: () => void;
	isAuthenticated: boolean;
	token: string | null;
	refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
	const authService = useMemo(() => new AuthService(), []);

	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("token")
	);

	const navigate = useNavigate();

	const isAuthenticated = useMemo(() => !!token, [token]);

	const login = useCallback(
		async (email: string, password: string) => {
			setLoading(true);

			try {
				const {
					data: { token, refreshToken },
				} = await authService.login(email, password);

				setToken(token);
				localStorage.setItem("token", token);
				localStorage.setItem("refreshToken", refreshToken);
			} finally {
				setLoading(false);
			}
		},
		[authService]
	);

	const register = useCallback(
		async (name: string, email: string, password: string) => {
			await authService.register(name, email, password);
			await login(email, password);
		},
		[authService, login]
	);

	const refreshToken = useCallback(async () => {
		const refreshToken = localStorage.getItem("refreshToken");
		if (refreshToken) {
			const {
				data: { token: newToken, refreshToken: newRefreshToken },
			} = await authService.refreshToken(refreshToken);

			setToken(newToken);
			localStorage.setItem("token", newToken);
			localStorage.setItem("refreshToken", newRefreshToken);
		}
	}, [authService]);

	const logout = useCallback(() => {
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		setToken(null);

		navigate("/login");
	}, [navigate]);

	const value = useMemo(
		() => ({
			loading,
			login,
			register,
			logout,
			token,
			isAuthenticated,
			refreshToken,
		}),
		[loading, login, register, logout, token, isAuthenticated, refreshToken]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
