"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Mail,
  ArrowRight,
  Sun,
  Moon,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "next-themes";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

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
              Hệ thống quản lý kinh doanh thông minh
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

        {/* Forgot Password Card */}
        {success ? (
          <Card className="border shadow-2xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-green-700 dark:text-green-400">
                Email đã được gửi!
              </CardTitle>
              <CardDescription>
                Hướng dẫn đặt lại mật khẩu đã được gửi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Vui lòng kiểm tra email <strong>{email}</strong> để nhận hướng dẫn đặt lại mật khẩu.
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-blue-700 dark:text-blue-400">
                    💡 <strong>Lưu ý:</strong> Kiểm tra cả thư mục spam nếu không thấy email trong hộp thư chính.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={() => {
                    setSuccess(false);
                    setEmail("");
                  }}
                  variant="outline" 
                  className="w-full"
                >
                  Gửi lại email
                </Button>
                <Link href="/auth/login" className="w-full">
                  <Button className="w-full">
                    Về trang đăng nhập
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border shadow-2xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-xl font-bold">
                Quên mật khẩu?
              </CardTitle>
              <CardDescription>
                Nhập email để nhận hướng dẫn đặt lại mật khẩu
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleForgotPassword} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Địa chỉ Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-sm text-red-600 bg-red-50 dark:bg-red-950/20 p-3 rounded-md border border-red-200 dark:border-red-800">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-11 text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      Gửi email đặt lại
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Back to Login */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Nhớ lại mật khẩu?{" "}
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
        )}

        {/* Features - Simple List */}
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground font-medium">
            Bảo mật tài khoản
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span>🔒 Mã hóa SSL</span>
            <span>⚡ Xử lý nhanh</span>
            <span>✅ An toàn tuyệt đối</span>
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
