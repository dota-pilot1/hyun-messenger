import { apiClient } from '@/shared/api/apiClient';

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    id: number;
    email: string;
    name: string;
    username: string;
    role: string;
}

export const authApi = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/api/auth/login', {
            email,
            password,
        });
        return response.data;
    },

    logout: async () => {
        await apiClient.post('/api/auth/logout');
    },

    getMe: async (): Promise<any> => {
        const response = await apiClient.get('/api/auth/me');
        return response.data;
    },
};
