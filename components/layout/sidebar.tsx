"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Users,
  Shield,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { toast } from "sonner";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Chat", href: "/chat", icon: MessageSquare }, // ChatPDF feature
  { label: "Documents", href: "/document", icon: FileText },
  { label: "Users", href: "/users", icon: Users }, // Admin feature
  { label: "Roles", href: "/roles", icon: Shield }, // Admin feature
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="h-full flex flex-col justify-between p-4">
      {/* Top Section */}
      <div>
        {/* Logo Area */}
        <div className="px-4 mb-8 mt-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-bold text-lg tracking-tight"
          >
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <span>Dacura</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-black text-white" // Active State: Black
                    : "text-gray-500 hover:text-black hover:bg-gray-100" // Inactive
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Profile & Logout */}
      <div className="border-t border-gray-100 pt-4 mt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
