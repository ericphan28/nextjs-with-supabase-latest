import { ForgotPasswordForm } from "@/components/forgot-password-form";

export const metadata = {
  title: "Quên mật khẩu - Gia Kiệm Số",
  description: "Đặt lại mật khẩu cho tài khoản Gia Kiệm Số của bạn",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
