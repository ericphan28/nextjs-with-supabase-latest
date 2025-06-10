"use client";

import { Menu } from "lucide-react";
// import { Bell, Search } from "lucide-react"; // 🔧 REMOVE: Unused imports
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "@/components/logout-button";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
      <div className="container flex h-12 items-center">
        {/* Left: Menu + Store Name */}
        <div className="flex items-center gap-2 flex-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <h1 className="text-sm font-semibold text-foreground truncate">
            AN NHIÊN FARM - Gia Tân 3
          </h1>
        </div>

        {/* Right: Essential actions only */}
        <div className="flex items-center gap-1">
          {/* Theme toggle - compact */}
          <div className="[&>button]:h-8 [&>button]:w-8">
            <ThemeToggle />
          </div>

          {/* Logout - icon only on mobile */}
          <div className="[&>button]:h-8 [&>button]:px-2">
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}