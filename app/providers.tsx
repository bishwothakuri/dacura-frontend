'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import AppWrapper from './AppWrapper';

// Add global providers like AUTH, APP_Context

const Providers = ({ children }: { readonly children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <AppWrapper>{children}</AppWrapper>
        </QueryClientProvider>
    );
};

export default Providers;
