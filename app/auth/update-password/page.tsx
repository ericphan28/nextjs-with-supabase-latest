import { UpdatePasswordForm } from "@/components/update-password-form";

export const metadata = {
  title: "Cập nhật mật khẩu - Gia Kiệm Số",
  description: "Đặt lại mật khẩu mới cho tài khoản Gia Kiệm Số của bạn",
};

export default function UpdatePasswordPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
