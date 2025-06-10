import { LoginForm } from "@/components/login-form";

export const metadata = {
  title: "Đăng nhập - Gia Kiểm Số",
  description: "Đăng nhập vào hệ thống quản lý kinh doanh Gia Kiểm Số",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
