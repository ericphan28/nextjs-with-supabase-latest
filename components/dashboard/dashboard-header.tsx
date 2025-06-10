"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { LogoutButton } from "@/components/logout-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Calendar, User as UserIcon } from "lucide-react";
import Link from "next/link"; // 🔧 THÊM import này

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
          {/* Left side - Title + Navigation */}
          <div className="flex items-center space-x-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                📊 Dashboard Quản lý Bán hàng
              </h1>
              <p className="text-muted-foreground mt-1">
                Tổng quan hoạt động kinh doanh của bạn
              </p>
            </div>

            {/* 🔧 THÊM NAVIGATION MENU Ở ĐÂY */}
            <nav className="hidden md:flex space-x-6 text-sm">
              <Link
                href="/dashboard"
                className="text-primary font-medium hover:underline"
              >
                Dashboard
              </Link>
              <Link
                href="/products"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sản phẩm
              </Link>
              <Link
                href="/orders"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Đơn hàng
              </Link>
              <Link
                href="/customers"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Khách hàng
              </Link>
              <Link
                href="/reports"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Báo cáo
              </Link>
            </nav>
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