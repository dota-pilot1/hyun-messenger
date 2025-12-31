import { apiClient } from '@/shared/api/apiClient';

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    isOnline: boolean;
}

export const userApi = {
    getMembers: async (): Promise<UserResponse[]> => {
        const response = await apiClient.get<UserResponse[]>('/api/members');
        return response.data;
    },
};
