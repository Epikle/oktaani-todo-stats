import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TokenState {
  token: string | null;
  setToken: (token: string) => void;
}

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    {
      name: 'oktaani-todo-stats',
    }
  )
);
