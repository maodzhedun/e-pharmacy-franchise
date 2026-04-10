import { create } from 'zustand';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  setLoading: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: true,
  setAuth: (user, token) => set({ user, token, isLoggedIn: true, isLoading: false }),
  clearAuth: () => set({ user: null, token: null, isLoggedIn: false, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
