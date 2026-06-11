"use client";

import { signOut } from "next-auth/react";
import { Bell, LogOut, Menu } from "lucide-react";

interface AdminHeaderProps {
  user: { email?: string | null; role: string; name?: string | null };
  onMenuClick?: () => void;
}

export function AdminHeader({ user, onMenuClick }: AdminHeaderProps) {
  const display = user.name ?? user.email ?? "Admin";

  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-border bg-card shrink-0">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="lg:hidden h-9 w-9 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Spacer on desktop */}
      <div className="hidden lg:block" />

      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="relative h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
        >
          <Bell className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-primary-foreground">
              {display.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground leading-none">{display}</p>
            <p className="text-xs text-muted-foreground capitalize mt-0.5">{user.role}</p>
          </div>
        </div>

        <button
          onClick={() => signOut({ redirectTo: "/admin/login" })}
          className="flex items-center gap-2 px-3 h-9 rounded-xl text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}
