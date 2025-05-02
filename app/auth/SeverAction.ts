'use server';

import axios from 'axios';

import { SignUpFormData } from './Schema';
import axiosInstance from '../lib/utils/axiosInstance';

export const createUser = async (data: SignUpFormData): Promise<string> => {
  'use server';

  try {
    const response = await axiosInstance.post('auth/signup', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.error;
    } else {
      return 'Unable to Create Account';
    }
  }
};
