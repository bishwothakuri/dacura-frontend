"use client";

import Sidebar from "@/components/layout/sidebar";
import { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-white">
      {/* LEFT: Fixed Sidebar */}
      {/* w-64: Fixed width of 256px */}
      <aside className="w-64 border-r border-gray-200 hidden md:block">
        <Sidebar />
      </aside>

      {/* RIGHT: Main Content Area */}
      {/* flex-1: Takes remaining space */}
      {/* overflow-hidden: Prevents the whole page from scrolling */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP BAR (Optional: Breadcrumbs or Mobile Menu) */}
        <header className="h-16 border-b border-gray-100 flex items-center px-6 md:hidden">
          {/* Mobile Menu trigger would go here */}
          <span className="font-bold">Dacura</span>
        </header>

        {/* CONTENT SCROLL AREA */}
        <main className="flex-1 overflow-auto bg-white p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
