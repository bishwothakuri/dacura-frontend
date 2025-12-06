'use client';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Fragment } from 'react';
import { Toaster } from 'sonner';

// Register global components like notifier, modals, header, footer

const AppWrapper = ({ children }: { readonly children: React.ReactNode }) => {
    return (
        <Fragment>
            <Header />
            <main>{children}</main>
            <Footer />

            <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
        </Fragment>
    );
};

export default AppWrapper;
