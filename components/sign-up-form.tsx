"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Sun,
  Moon,
  Phone,
  MessageSquare,
  Mail,
  Users,
  Shield,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "next-themes";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-background to-muted/20",
        className
      )}
      {...props}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-700/25" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Header với Theme Toggle */}
        <div className="text-center space-y-6">
          {/* Company Info với Theme Toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-4">
              <h1 className="text-3xl font-bold text-foreground">
                Gia Kiệm Số
              </h1>
              {mounted && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                  className="rounded-full w-10 h-10 p-0 shadow-lg border-2"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-slate-600" />
                  )}
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Hệ thống quản lý bán hàng thông minh
            </p>
          </div>
        </div>

        {/* Back to Login Link */}
        <div className="flex items-center justify-center">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại đăng nhập
          </Link>
        </div>

        {/* Sign Up Card */}
        <Card className="border shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <CardTitle className="text-xl font-bold">
              Đăng ký tài khoản
            </CardTitle>
            <CardDescription>
              Liên hệ để được tạo tài khoản sử dụng hệ thống
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400">
                    Hệ thống nội bộ
                  </h3>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Đây là hệ thống quản lý nội bộ. Tài khoản được tạo bởi quản trị viên
                  sau khi xác nhận thông tin doanh nghiệp.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">
                  Liên hệ để đăng ký:
                </h4>

                {/* Zalo Contact */}
                <a
                  href="https://zalo.me/0907136029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-950/30 transition-colors cursor-pointer">
                    <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="font-medium text-green-700 dark:text-green-400">
                        Zalo: 0907 136 029
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-500">
                        Nhắn tin Zalo để được hỗ trợ nhanh nhất
                      </p>
                    </div>
                  </div>
                </a>

                {/* Phone Contact */}
                <a href="tel:0907136029" className="block">
                  <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-950/30 transition-colors cursor-pointer">
                    <Phone className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <div>
                      <p className="font-medium text-orange-700 dark:text-orange-400">
                        Hotline: 0907 136 029
                      </p>
                      <p className="text-sm text-orange-600 dark:text-orange-500">
                        Gọi điện trực tiếp để được tư vấn
                      </p>
                    </div>
                  </div>
                </a>

                {/* Email Contact */}
                <a href="mailto:support@giakiemso.com" className="block">
                  <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-950/30 transition-colors cursor-pointer">
                    <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="font-medium text-purple-700 dark:text-purple-400">
                        Email: support@giakiemso.com
                      </p>
                      <p className="text-sm text-purple-600 dark:text-purple-500">
                        Gửi email với thông tin doanh nghiệp
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-gray-50 dark:bg-gray-950/20 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <h4 className="font-medium text-foreground mb-3">
                Thông tin cần cung cấp:
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Tên doanh nghiệp/cửa hàng
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Loại hình kinh doanh
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Thông tin liên hệ
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Quy mô hoạt động
                </li>
              </ul>
            </div>

            {/* Back to Login */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Đã có tài khoản?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline font-medium"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Process Steps */}
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground font-medium">
            Quy trình đăng ký
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span>1️⃣ Liên hệ</span>
            <span>2️⃣ Tư vấn</span>
            <span>3️⃣ Tạo tài khoản</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          © 2025 Gia Kiệm Số. All rights reserved.
        </div>

        {/* Theme Toggle Alternative - Bottom Right Corner */}
        <div className="fixed bottom-6 right-6 lg:hidden">
          {mounted && (
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-12 h-12 shadow-lg border-2 bg-background/80 backdrop-blur-sm"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
