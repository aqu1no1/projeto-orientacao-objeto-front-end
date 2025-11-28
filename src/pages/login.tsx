import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AxiosError } from "axios";

export default function Login() {
	const [mode, setMode] = useState("login");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const { login, register } = useAuth();

	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});

	const [registerData, setRegisterData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			await login(loginData.email, loginData.password);

			navigate("/");
		} catch (err) {
			if (err instanceof AxiosError) {
				setError(err.response?.data?.message || "Login failed.");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			await register(
				registerData.name,
				registerData.email,
				registerData.password
			);

			navigate("/");
		} catch (err) {
			if (err instanceof AxiosError) {
				setError(
					err.response?.data?.message ||
						"Registration failed. Please try again."
				);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full min-h-screen flex items-center justify-center bg-white">
			<div className="w-full max-w-sm bg-white border border-gray-300 rounded-lg p-8">
				<div className="flex justify-center mb-8 space-x-3">
					<button
						className={`px-4 py-2 rounded font-medium transition ${
							mode === "login"
								? "bg-gray-800 text-white"
								: "bg-gray-200 text-gray-800"
						}`}
						onClick={() => {
							setMode("login");
							setError("");
						}}
					>
						Login
					</button>

					<button
						className={`px-4 py-2 rounded font-medium transition ${
							mode === "register"
								? "bg-gray-800 text-white"
								: "bg-gray-200 text-gray-800"
						}`}
						onClick={() => {
							setMode("register");
							setError("");
						}}
					>
						Register
					</button>
				</div>

				{error && (
					<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
						{error}
					</div>
				)}

				{mode === "login" && (
					<form className="space-y-5" onSubmit={handleLogin}>
						<div>
							<label htmlFor="loginEmail" className="block text-gray-700 font-medium mb-1">
								Email
							</label>
							<input
                id="loginEmail"
								type="email"
								required
								value={loginData.email}
								onChange={(e) =>
									setLoginData({ ...loginData, email: e.target.value })
								}
								className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
							/>
						</div>

						<div>
							<label htmlFor="loginPassword" className="block text-gray-700 font-medium mb-1">
								Password
							</label>
							<input
                id="loginPassword"
								type="password"
								required
								value={loginData.password}
								onChange={(e) =>
									setLoginData({ ...loginData, password: e.target.value })
								}
								className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition disabled:opacity-50"
						>
							{loading ? "Signing In..." : "Sign In"}
						</button>
					</form>
				)}

				{mode === "register" && (
					<form className="space-y-5" onSubmit={handleRegister}>
						<div>
							<label htmlFor="fullname" className="block text-gray-700 font-medium mb-1">
								Full Name
							</label>
							<input
                id="fullname"
								type="text"
								required
								minLength={3}
								value={registerData.name}
								onChange={(e) =>
									setRegisterData({ ...registerData, name: e.target.value })
								}
								className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
							/>
						</div>

						<div>
							<label htmlFor="email" className="block text-gray-700 font-medium mb-1">
								Email
							</label>
							<input
                id="email"
								type="email"
								required
								value={registerData.email}
								onChange={(e) =>
									setRegisterData({ ...registerData, email: e.target.value })
								}
								className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-gray-700 font-medium mb-1">
								Password
							</label>
							<input
                id="password"
								type="password"
								required
								minLength={8}
								value={registerData.password}
								onChange={(e) =>
									setRegisterData({ ...registerData, password: e.target.value })
								}
								className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition disabled:opacity-50"
						>
							{loading ? "Creating Account..." : "Create Account"}
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
