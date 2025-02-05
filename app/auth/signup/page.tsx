'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { createUser } from '../SeverAction';
import { cn } from '@/app/lib/utils/tailwindMerge';
import { SignUpFormData, signUpSchema } from '../Schema';
import { useThemeState } from '@/app/providers/reactqueryProvider';

export default function SignUp() {
  const router = useRouter();
  const cachedTheme = useThemeState();
  const [creationMessage, setCreationMessage] = useState<string>('');
  const {
    reset,
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
    const response = await createUser(data);
    if (response === 'Account Sucessfully Created') {
      reset();
      router.push('/auth/login');
    } else {
      setCreationMessage(response);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className={cn(
          cachedTheme?.bg,
          cachedTheme?.textColor,
          'shadow-xl rounded-lg p-8 w-full max-w-md'
        )}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            {...register('name')}
            className={cn(
              cachedTheme?.activeBg,
              cachedTheme?.activeTextColor,
              'w-full p-2 rounded-md placeholder-gray-400'
            )}
          />
          {errors.name && <p className="text-red-400">{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={cn(
              cachedTheme?.activeBg,
              cachedTheme?.activeTextColor,
              'w-full p-2 rounded-md placeholder-gray-400'
            )}
          />
          {errors.email && (
            <p className="text-red-400">{errors.email.message}</p>
          )}

          <input
            type="text"
            placeholder="Phone Number"
            {...register('number')}
            className={cn(
              cachedTheme?.activeBg,
              cachedTheme?.activeTextColor,
              'w-full p-2 rounded-md placeholder-gray-400'
            )}
          />
          {errors.number && (
            <p className="text-red-400">{errors.number.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className={cn(
              cachedTheme?.activeBg,
              cachedTheme?.activeTextColor,
              'w-full p-2 rounded-md placeholder-gray-400'
            )}
          />
          {errors.password && (
            <p className="text-red-400">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              cachedTheme?.bg,
              cachedTheme?.textColor,
              cachedTheme?.borderColor,
              `w-full py-2 border rounded-md shadow-md transition-colors ${
                isSubmitting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-105'
              }`
            )}
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </button>
          {creationMessage && (
            <p className="text-red-500 text-center ">{creationMessage}</p>
          )}
        </form>
      </div>
      <p className="text-gray-500 text-sm mt-4">
        Already have an account?{'  '}
        <Link href="/auth/login" className={cn(cachedTheme?.textColor)}>
          Login
        </Link>
      </p>
    </div>
  );
}
