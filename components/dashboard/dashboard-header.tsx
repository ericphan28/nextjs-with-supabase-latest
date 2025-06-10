"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { LogoutButton } from "@/components/logout-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { User as UserIcon } from "lucide-react";

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
    // 🔧 FIX: Add "hidden lg:block" để tránh duplicate trên mobile
    <div className="bg-card border-b border-border hidden lg:block">
      <div className="max-w-7xl mx-auto px-4 py-1">
        <div className="flex justify-between items-center h-8">
          
          {/* Left: Store name - BIGGER & BOLD */}
          <div className="flex items-center">
            <h1 className="text-sm font-semibold text-foreground leading-none">
              AN NHIÊN FARM - Gia Tân 3
            </h1>
          </div>

          {/* Right: User actions - BALANCED */}
          <div className="flex items-center gap-2">
            
            {/* User info - BIGGER */}
            {user && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <UserIcon className="w-3 h-3" />
                <span className="hidden xl:inline"> {/* 🔧 FIX: md → xl để chỉ show trên màn hình lớn */}
                  {user.email}
                </span>
              </div>
            )}

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Logout */}
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}