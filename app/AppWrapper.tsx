"use client";

import { Toaster } from "sonner";

// This component now ONLY handles global client-side utilities
const AppWrapper = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
    </>
  );
};

export default AppWrapper;
