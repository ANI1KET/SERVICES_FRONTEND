"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    const result = await signIn("Credentials", {
      callbackUrl: "/",
      redirect: false,
      email: "john.doe@example.com",
      password: "hashedpassword123",
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Incorrect email or password. Please try again.");
      console.error("Sign-in error:", result.error);
    } else {
      console.log("Sign-in successful:", result);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/", redirect: false });
    setIsLoading(false);
  };

  if (status === "loading") {
    return (
      <div className="text-center mt-10 text-lg font-semibold text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-md">
        {session ? (
          <>
            <p className="text-2xl font-semibold text-white mb-4 text-center">
              Welcome, {session.user.email}!
            </p>
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className={`w-full bg-red-600 text-white py-2 rounded-md shadow-md hover:bg-red-700 transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing out..." : "Sign out"}
            </button>
          </>
        ) : (
          <>
            <p className="text-2xl font-semibold text-white mb-4 text-center">
              Sign in to your account
            </p>
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
            {error && <p className="text-red-400 mt-3 text-center">{error}</p>}
          </>
        )}
      </div>
      <p className="text-gray-500 text-sm mt-4">
        {session
          ? "Enjoy your session!"
          : "Welcome back! Please sign in to continue."}
      </p>
    </div>
  );
}
