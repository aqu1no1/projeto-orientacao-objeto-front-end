import { useState } from "react";

export default function Login() {
  const [mode, setMode] = useState("login");

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
            onClick={() => setMode("login")}
          >
            Login
          </button>

          <button
            className={`px-4 py-2 rounded font-medium transition ${
              mode === "register"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {mode === "login" && (
          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
            >
              Sign In
            </button>
          </form>
        )}

        {mode === "register" && (
          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
            >
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
