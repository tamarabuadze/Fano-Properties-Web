"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FanoLogo, LOGO_COLORS } from "@/components/shared/fano-logo";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Building2,
  Users,
  BookOpen,
  MessageSquare,
  Settings,
  Home,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@fano/utils";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/properties", icon: Building2, label: "Properties" },
  { href: "/admin/agents", icon: Users, label: "Agents" },
  { href: "/admin/blog", icon: BookOpen, label: "Blog" },
  { href: "/admin/inquiries", icon: MessageSquare, label: "Inquiries" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <Link href="/admin/dashboard" className="flex items-center" onClick={onClose}>
          <FanoLogo color={LOGO_COLORS.bronze} className="h-9" />
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="ml-auto h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3.5 h-10 rounded-full font-label text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-150",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.6} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="h-3 w-3 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 border-t border-border pt-4 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="flex items-center gap-3 px-3.5 h-10 rounded-full text-[13px] text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
        >
          <Home className="h-4 w-4" strokeWidth={1.6} />
          View website
        </a>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3.5 h-10 rounded-full text-[13px] text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-background h-full">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-[#2B2520]/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <aside className="relative w-72 max-w-[85vw] bg-background h-full border-r border-border shadow-[0_24px_60px_-20px_rgba(43,37,32,.4)] flex flex-col">
            <SidebarContent onClose={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}
