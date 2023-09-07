import axios from 'axios';
import type { DataPoint, StatsTypes } from '@/lib/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getStats = async (
  type: StatsTypes,
  token: string
): Promise<DataPoint[]> => {
  const { data } = await api.get(`/stats/?type=${type}&key=${token}`);

  return data;
};
