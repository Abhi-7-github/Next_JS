'use client';

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [postInputs, setPostInputs] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleChange = (e) => {
    setPostInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Attempt login with credentials
      const res = await signIn("credentials", {
        redirect: false,
        ...postInputs,
      });

      if (res?.error) {
        setError("Invalid credentials");
        setIsLoading(false);
        return;
      }

      // Fetch the updated session to check user role
      const sessionResponse = await fetch("/api/auth/session");
      const sessionData = await sessionResponse.json();

      if (sessionData?.user?.role === "admin") {
        router.push("/dashboard");
      } else if (sessionData?.user?.role === "consumer") {
        router.push("/consumer");
      } else {
        setError("User role not recognized");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-100 via-cyan-100 to-white text-gray-900">
      <div className="relative w-full max-w-md p-8 rounded-2xl shadow-2xl border border-cyan-200 bg-white/70 backdrop-blur-md">
        <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-500 bg-clip-text text-transparent">
          Welcome Back 🌤️
        </h2>

        {error && (
          <p className="text-center text-red-600 mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={postInputs.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white border border-cyan-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={postInputs.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white border border-sky-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-lg bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-400 text-white hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
