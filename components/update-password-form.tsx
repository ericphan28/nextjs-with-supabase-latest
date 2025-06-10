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
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  Sun,
  Moon,
  CheckCircle,
  Shield,
} from "lucide-react";
import { useTheme } from "next-themes";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    const supabase = createClient();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Đã xảy ra lỗi");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: "", color: "" };
    if (password.length < 6)
      return { strength: 25, text: "Yếu", color: "bg-red-500" };
    if (password.length < 8)
      return {
        strength: 50,
        text: "Trung bình",
        color: "bg-yellow-500",
      };
    if (password.length < 12)
      return { strength: 75, text: "Mạnh", color: "bg-blue-500" };
    return { strength: 100, text: "Rất mạnh", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(password);

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

        {/* Update Password Card */}
        {success ? (
          <Card className="border shadow-2xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-green-700 dark:text-green-400">
                Cập nhật thành công!
              </CardTitle>
              <CardDescription>
                Mật khẩu của bạn đã được cập nhật
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Mật khẩu mới đã được lưu thành công. Bạn sẽ được chuyển hướng về
                  trang chính.
                </p>
                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-xs text-green-700 dark:text-green-400">
                    🔒 <strong>Bảo mật:</strong> Vui lòng ghi nhớ mật khẩu mới và
                    không chia sẻ với ai khác.
                  </p>
                </div>
              </div>

              <Button
                onClick={() => router.push("/dashboard")}
                className="w-full"
              >
                Về trang chính
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border shadow-2xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <div className="flex items-center justify-center mb-2">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold">
                Đặt lại mật khẩu
              </CardTitle>
              <CardDescription>
                Tạo mật khẩu mới cho tài khoản của bạn
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                {/* New Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Mật khẩu mới
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu mới"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-11"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Độ mạnh mật khẩu
                        </span>
                        <span
                          className={`font-medium ${
                            passwordStrength.strength >= 75
                              ? "text-green-600"
                              : passwordStrength.strength >= 50
                              ? "text-blue-600"
                              : passwordStrength.strength >= 25
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {passwordStrength.text}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Xác nhận mật khẩu
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu mới"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10 h-11"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-blue-700 dark:text-blue-400 font-medium mb-2">
                    Yêu cầu mật khẩu:
                  </p>
                  <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                    <li className={password.length >= 6 ? "text-green-600" : ""}>
                      • Ít nhất 6 ký tự
                    </li>
                    <li
                      className={
                        password !== confirmPassword && confirmPassword
                          ? "text-red-600"
                          : confirmPassword && password === confirmPassword
                          ? "text-green-600"
                          : ""
                      }
                    >
                      • Mật khẩu xác nhận phải khớp
                    </li>
                  </ul>
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
                  disabled={
                    isLoading || password !== confirmPassword || password.length < 6
                  }
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Đang cập nhật...
                    </>
                  ) : (
                    <>
                      Cập nhật mật khẩu
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Back to Login */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Muốn đăng nhập lại?{" "}
                  <Link
                    href="/auth/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Về trang đăng nhập
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features - Security Focus */}
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground font-medium">
            Bảo mật tài khoản
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span>🔒 Mã hóa an toàn</span>
            <span>⚡ Cập nhật nhanh</span>
            <span>🛡️ Bảo vệ tuyệt đối</span>
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
