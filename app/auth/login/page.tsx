'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginFormInputs, loginSchema } from '../Schema';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignInCredentials = async (data: LoginFormInputs) => {
    setIsLoading(true);

    const result = await signIn('credentials', {
      callbackUrl: '/',
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setIsLoading(false);

    if (result?.error) {
      return {
        email: { type: 'manual', message: 'Incorrect email or password.' },
      };
    } else {
      console.log('Sign-in successful:', result);
    }
  };

  const handleSignInGoogle = async () => {
    setIsLoading(true);

    const callbackUrl = new URLSearchParams(window.location.search).get(
      'callbackUrl'
    );
    const redirectUrl = callbackUrl ? decodeURIComponent(callbackUrl) : '/';

    const result = await signIn('google', {
      redirect: false,
      callbackUrl: redirectUrl,
    });
    setIsLoading(false);

    if (result?.ok) {
      router.push('/');
    } else {
      console.error('Sign-in failed:', result?.error);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut({ redirect: false });

      router.push('/');
    } catch (error) {
      console.error('Sign-out failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="bg-green-300 shadow-2xl rounded-lg p-8 w-full max-w-md animate-fade-in">
        {session ? (
          <>
            <p className="text-2xl font-semibold mb-6 text-center">
              Welcome, {session.user.email}!
            </p>
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className={`w-full bg-red-600 py-2 rounded-md shadow-md hover:bg-red-700 transition-transform transform ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              {isLoading ? 'Signing out...' : 'Sign out'}
            </button>
          </>
        ) : (
          <>
            <p className="text-2xl font-semibold mb-6 text-center">
              Sign in to your account
            </p>
            <form
              onSubmit={handleSubmit(handleSignInCredentials)}
              className="space-y-4"
            >
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  className={`w-full px-4 py-2 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  {...register('password')}
                  className={`w-full px-4 py-2 rounded-md bg-green-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border border-red-500' : ''
                  }`}
                />
                {errors.password && (
                  <p className="text-red-400 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading || isSubmitting}
                className={`w-full bg-green-100 py-2 rounded-md shadow-md hover:bg-green-200 transition-transform transform ${
                  isLoading || isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:scale-105'
                }`}
              >
                {isLoading || isSubmitting
                  ? 'Signing in...'
                  : 'Sign in with Credentials'}
              </button>
            </form>
            <button
              disabled={isLoading}
              onClick={handleSignInGoogle}
              className={`w-full bg-green-100 py-2 rounded-md shadow-md hover:bg-green-200 transition-transform transform mt-4 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign in with Google'}
            </button>
          </>
        )}
      </div>
      <p className="text-gray-600 text-sm mt-4">
        {session
          ? 'Enjoy your session!'
          : 'Welcome back! Please sign in to continue.'}
      </p>
    </div>
  );
}
