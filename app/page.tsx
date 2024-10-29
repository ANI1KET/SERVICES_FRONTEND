"use client";

import { increment, incrementByAmount } from "@/app/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks/hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.user.value);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(2));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-800 text-white">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
        Welcome to Our Platform
      </h1>
      <p className="text-lg md:text-xl text-center max-w-2xl mb-6">
        This is a secure, user-friendly application where you can sign up, log
        in, and enjoy our features. Join us and experience the future of
        seamless digital interaction.
      </p>
      <p>Current Count: {count}</p>
      <button
        onClick={handleIncrement}
        className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md text-lg shadow-lg transition-all"
      >
        Increment Count
      </button>
      <button
        onClick={handleIncrementByAmount}
        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md text-lg shadow-lg transition-all mt-4"
      >
        Increment By Amount
      </button>
      <a href="/login">
        <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md text-lg shadow-lg transition-all mt-4">
          Get Started
        </button>
      </a>
    </div>
  );
}
