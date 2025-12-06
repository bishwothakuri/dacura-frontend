'use client';

import { API_ROUTES } from '@/constants/api';
import { getRequest } from '@/libs/request';
import { useQuery } from '@tanstack/react-query';

export const useListUsers = (query: any) => {
    // const cookieHeader = {
    //     headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //     },
    // };
    return useQuery({
        queryKey: ['list-users', query],
        queryFn: () => getRequest(`${API_ROUTES.USERS}`),
        enabled: true,
        staleTime: 0,
    });
};
