import { create } from 'zustand';

interface User {
    id: number;
    email: string;
    name: string;
    username?: string;
    role?: string;
}

interface UserState {
    me: User | null;
    isInitialized: boolean;
    setMe: (user: User | null) => void;
    setInitialized: (value: boolean) => void;
    clearMe: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    me: null,
    isInitialized: false,
    setMe: (user) => set({ me: user }),
    setInitialized: (value) => set({ isInitialized: value }),
    clearMe: () => set({ me: null, isInitialized: true }),
}));
