'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SignUpFormData, signUpSchema } from '../Schema';
import Link from 'next/link';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      number: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log('Form data:', data);

    // Simulate a delay for loading state demonstration
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log('Sign-up successful!');
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="bg-green-300 shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            {...register('name')}
            className="w-full p-2 rounded-md bg-green-200 placeholder-gray-400"
          />
          {errors.name && <p className="text-red-400">{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className="w-full p-2 rounded-md bg-green-200 placeholder-gray-400"
          />
          {errors.email && (
            <p className="text-red-400">{errors.email.message}</p>
          )}

          <input
            type="text"
            placeholder="Phone Number"
            {...register('number')}
            className="w-full p-2 rounded-md bg-green-200 placeholder-gray-400"
          />
          {errors.number && (
            <p className="text-red-400">{errors.number.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className="w-full p-2 rounded-md bg-green-200 placeholder-gray-400"
          />
          {errors.password && (
            <p className="text-red-400">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-green-100 py-2 rounded-md shadow-md hover:bg-green-200 transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
      </div>
      <p className="text-gray-500 text-sm mt-4">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-green-500">
          Sign in
        </Link>
      </p>
    </div>
  );
}