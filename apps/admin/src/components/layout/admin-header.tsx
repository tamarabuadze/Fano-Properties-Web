import { Bell } from "lucide-react";

interface AdminHeaderProps {
  user: { email?: string | null; role: string; name?: string | null };
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const display = user.name ?? user.email ?? "Admin";

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card shrink-0">
      <div />

      <div className="flex items-center gap-4">
        <button className="relative h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors">
          <Bell className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs font-semibold text-primary-foreground">
              {display.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground leading-none">{display}</p>
            <p className="text-xs text-muted-foreground capitalize mt-0.5">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
