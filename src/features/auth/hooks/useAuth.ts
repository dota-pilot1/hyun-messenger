import { useUserStore } from '@/entities/user/model/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { authApi } from '../api/authApi';

export const useAuth = () => {
    const queryClient = useQueryClient();
    const { setMe, clearMe } = useUserStore();

    const loginMutation = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            authApi.login(email, password),
        onSuccess: async (data) => {
            // Store tokens
            await SecureStore.setItemAsync('accessToken', data.accessToken);
            await SecureStore.setItemAsync('refreshToken', data.refreshToken);

            // Store user info in Zustand
            setMe({
                id: data.id,
                email: data.email,
                name: data.name,
                username: data.username,
                role: data.role,
            });

            // Invalidate queries if necessary
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });

    const logoutMutation = useMutation({
        mutationFn: authApi.logout,
        onSettled: async () => {
            // Clear tokens
            await SecureStore.deleteItemAsync('accessToken');
            await SecureStore.deleteItemAsync('refreshToken');

            // Clear Zustand store
            clearMe();

            // Clear Query Cache
            queryClient.clear();
        },
    });

    return {
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending,
    };
};
