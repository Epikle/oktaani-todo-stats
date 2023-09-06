import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TokenState {
  token: string | null;
  setToken: (token: string) => void;
  resetToken: () => void;
}

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      resetToken: () => set({ token: null }),
    }),
    {
      name: 'oktaani-todo-stats',
    }
  )
);
