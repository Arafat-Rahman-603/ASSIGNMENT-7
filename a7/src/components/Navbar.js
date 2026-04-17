"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Clock, BarChart2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import logoImg from "@/assets/logo.png";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Timeline", href: "/timeline", icon: Clock },
    { name: "Stats", href: "/stats", icon: BarChart2 },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-brand flex items-center gap-2">
              <Image src={logoImg} alt="KeenKeeper Logo" width={140} height={250} className="object-contain" />
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "inline-flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md gap-2",
                    isActive
                      ? "bg-brand text-white"
                      : "text-slate-600 hover:text-brand hover:bg-slate-50"
                  )}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="sm:hidden flex space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "p-2 rounded-md",
                    isActive ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
