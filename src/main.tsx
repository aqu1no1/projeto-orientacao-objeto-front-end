import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./tailwind.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { PropertyProvider } from "./contexts/PropertyContext";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<UserProvider>
					<PropertyProvider>
						<App />
					</PropertyProvider>
				</UserProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
