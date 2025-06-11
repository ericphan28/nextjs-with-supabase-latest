"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, CheckCircle } from "lucide-react";

interface DeleteProductDialogProps {
  productId: string;
  productName: string;
  onSuccess?: () => void;
}

export function DeleteProductDialog({ 
  productId, 
  productName, 
  onSuccess 
}: DeleteProductDialogProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      
      const supabase = createClient();
      
      // HARD DELETE - xóa hoàn toàn khỏi database
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      // Close dialog first
      setOpen(false);
      
      // Show success toast with better text
      toast.success("Xóa sản phẩm thành công!", {
        description: `"${productName}" đã được xóa khỏi danh sách`,
        icon: <CheckCircle className="h-4 w-4" />,
        duration: 2000,
      });
      
      // Multiple refresh methods to ensure UI updates
      setTimeout(() => {
        // Method 1: Router refresh
        router.refresh();
        
        // Method 2: Window reload as backup
        window.location.reload();
      }, 500);
      
      // Execute callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (error: unknown) {
      console.error('Error deleting product:', error);
      
      toast.error("Lỗi khi xóa sản phẩm", {
        description: error instanceof Error ? error.message : "Có lỗi xảy ra khi xóa sản phẩm",
        duration: 4000
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Xóa
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <div className="p-2 bg-red-100 rounded-full">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            Xác nhận xóa sản phẩm
          </AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa sản phẩm này không?
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-3">
          <div className="font-medium text-foreground bg-muted/50 p-3 rounded-lg border-l-4 border-l-red-500">
            <div className="flex items-center gap-2">
              <span className="text-red-500">📦</span>
              &quot;{productName}&quot;
            </div>
          </div>
          <div className="text-sm text-muted-foreground bg-red-50 dark:bg-red-950 p-3 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">⚠️</span>
              <div>
                <p className="font-medium text-red-800 dark:text-red-200 mb-1">Cảnh báo:</p>
                <p className="text-red-700 dark:text-red-300">
                  Sản phẩm sẽ được <strong>xóa hoàn toàn khỏi danh sách</strong> và không thể khôi phục. 
                  Hành động này không thể hoàn tác!
                </p>
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Hủy bỏ
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Đang xóa...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa sản phẩm
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}