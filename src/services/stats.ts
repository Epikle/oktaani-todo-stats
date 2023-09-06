import axios from 'axios';
import { StatsTypes } from '@/lib/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getStats = async (
  type: StatsTypes,
  token: string
): Promise<{ point: number; fill?: string }[]> => {
  const { data } = await api.get(`/stats/?type=${type}&key=${token}`);

  return data;
};
