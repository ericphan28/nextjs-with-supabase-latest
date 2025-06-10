"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { LogoutButton } from "@/components/logout-button";
import { Calendar, User as UserIcon } from "lucide-react";

export function DashboardHeader() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left side - Title */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              📊 Dashboard Quản lý Bán hàng
            </h1>
            <p className="text-muted-foreground mt-1">
              Tổng quan hoạt động kinh deanh của bạn
            </p>
          </div>

          {/* Right side - User info & Actions */}
          <div className="flex items-center gap-4">
            {/* Last updated */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              Cập nhật: {new Date().toLocaleDateString("vi-VN")}
            </div>

            {/* User info */}
            {user && (
              <div className="flex items-center gap-2 text-sm">
                <UserIcon className="w-4 h-4" />
                <span className="font-medium">{user.email}</span>
              </div>
            )}

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Logout button */}
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

// Đảm bảo có export này
export default ThemeToggle;