"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="h-6 px-1.5 py-0 text-xs gap-1 lg:h-8 lg:px-3" // 🔧 FIX: Responsive sizing
    >
      <LogOut className="w-3 h-3 lg:w-4 lg:h-4" />
      <span className="hidden sm:inline lg:inline"> {/* 🔧 FIX: Hide text on very small mobile */}
        Đăng xuất
      </span>
    </Button>
  );
}