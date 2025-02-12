'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession, signIn, signOut } from 'next-auth/react';

import { cn } from '@/app/lib/utils/tailwindMerge';
import { LoginFormInputs, loginSchema } from '../Schema';
import { useThemeState } from '@/app/providers/reactqueryProvider';

export default function Login() {
  const router = useRouter();
  const cachedTheme = useThemeState();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>('');

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

    const callbackUrl = new URLSearchParams(window.location.search).get(
      'callbackUrl'
    );
    const redirectUrl = callbackUrl ? decodeURIComponent(callbackUrl) : '/';

    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      // callbackUrl: redirectUrl,
    });

    setIsLoading(false);

    if (result?.error) {
      setLoginErrorMessage(result?.error);
    } else {
      router.push(redirectUrl);
    }
  };

  const handleSignInGoogle = async () => {
    setIsLoading(true);

    const callbackUrl = new URLSearchParams(window.location.search).get(
      'callbackUrl'
    );
    const redirectUrl = callbackUrl ? decodeURIComponent(callbackUrl) : '/';

    const result = await signIn('google', {
      // redirect: false,
      callbackUrl: redirectUrl,
    });

    setIsLoading(false);

    if (result?.ok) {
      // router.push(redirectUrl);
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
      <div
        className={cn(
          cachedTheme?.textColor,
          'flex items-center justify-center h-screen text-lg font-semibold'
        )}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className={cn(
          cachedTheme?.bg,
          cachedTheme?.textColor,
          'shadow-2xl rounded-lg p-8 w-full max-w-md animate-fade-in'
        )}
      >
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
                  className={cn(
                    cachedTheme?.inputBg,
                    cachedTheme?.inputColor,
                    `w-full px-4 py-2 rounded-md focus:outline-none ${
                      errors.email ? 'border border-red-500' : ''
                    }`
                  )}
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
                  className={cn(
                    cachedTheme?.inputBg,
                    cachedTheme?.inputColor,
                    `w-full px-4 py-2 rounded-md focus:outline-none ${
                      errors.password ? 'border border-red-500' : ''
                    }`
                  )}
                />
                {errors.password && (
                  <p className="text-red-400 text-sm">
                    {errors.password.message}
                  </p>
                )}
                {loginErrorMessage && (
                  <p className="text-red-400 text-sm">{loginErrorMessage}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading || isSubmitting}
                className={cn(
                  cachedTheme?.bg,
                  cachedTheme?.textColor,
                  cachedTheme?.borderColor,
                  `w-full py-2 rounded-md shadow-md border transition-transform transform ${
                    isLoading || isSubmitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:scale-105'
                  }`
                )}
              >
                {isLoading || isSubmitting
                  ? 'Signing in...'
                  : 'Sign in with Credentials'}
              </button>
            </form>
            <button
              disabled={isLoading}
              onClick={handleSignInGoogle}
              className={cn(
                cachedTheme?.bg,
                cachedTheme?.textColor,
                cachedTheme?.borderColor,
                `w-full border py-2 rounded-md shadow-md transition-transform transform mt-4 ${
                  isLoading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:scale-105'
                }`
              )}
            >
              {isLoading ? 'Signing in...' : 'Sign in with Google'}
            </button>
          </>
        )}
      </div>
      <p
        className={cn(
          cachedTheme?.textColor,
          'flex flex-row-reverse justify-between w-full px-1 max-w-md text-sm mt-2'
        )}
      >
        <span
          className="cursor-pointer"
          // onClick={()=>router.push('')}
        >
          Forgot Password
        </span>
        {loginErrorMessage === 'Password is not Created' && (
          <span
            className="cursor-pointer"
            // onClick={()=>router.push('')}
          >
            Create Password
          </span>
        )}
      </p>
      <p className={cn(cachedTheme?.textColor, 'text-sm mt-2')}>
        {session
          ? 'Enjoy your session!'
          : 'Welcome back! Please sign in to continue.'}
      </p>
    </div>
  );
}
