import Link from "next/link";
import { MoveRight } from "lucide-react";

export function Header() {
  // Define the menu items separately so they are easy to manage
  const menuItems = [
    { label: "Features", href: "/features" },
    { label: "Solutions", href: "/solutions" },
    { label: "Security", href: "/security" }, // Vital for PDF apps
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="glass-pill w-full max-w-5xl h-14 px-1.5 flex items-center justify-between transition-all duration-300 hover:bg-white/80">
        {/* LOGO */}
        <div className="pl-6">
          <Link
            href="/"
            className="font-bold text-xl tracking-tight text-black hover:opacity-70 transition-opacity"
          >
            Dacura
          </Link>
        </div>

        {/* NAVIGATION: PDF-Focused Menu */}
        <nav className="hidden md:flex items-center gap-1 h-full">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-4 py-1.5 text-sm font-medium text-[var(--muted)] hover:text-black hover:bg-black/5 rounded-full transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="pr-1.5 flex items-center gap-2">
          <Link
            href="/login"
            className="hidden sm:block px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-black transition-colors"
          >
            Log in
          </Link>

          <Link
            href="/upload" // Changed from generic link to an Action
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-black/80 transition-all shadow-md"
          >
            Upload PDF
            <MoveRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </header>
  );
}
