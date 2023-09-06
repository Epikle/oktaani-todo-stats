import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getStats = async (token: string): Promise<void> => {
  const { data } = await api.get<unknown>(
    `/stats/?type=shareCollection&key=${token}`
  );

  console.log(data);
};
