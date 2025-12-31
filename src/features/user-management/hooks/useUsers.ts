import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api/userApi';

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: userApi.getMembers,
        // Add staleTime, refetchInterval etc. if needed
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
