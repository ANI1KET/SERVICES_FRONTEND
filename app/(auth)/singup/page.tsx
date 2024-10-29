"use client";

import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setIsLoading(true);
    setError(null);

    // Placeholder: Replace this with your actual sign-up logic
    if (email === "" || password === "") {
      setError("Email and password are required.");
      setIsLoading(false);
      return;
    }

    // Simulate sign-up success
    console.log("Sign-up successful!");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Create an Account
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
        />
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        <button
          onClick={handleSignUp}
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
      </div>
      <p className="text-gray-500 text-sm mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-400">
          Sign in
        </a>
      </p>
    </div>
  );
}
