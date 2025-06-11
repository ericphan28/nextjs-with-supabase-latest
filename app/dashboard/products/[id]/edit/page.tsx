import { EditProductForm } from "@/components/products/edit-product-form";

// Fix: params là Promise trong Next.js 15
interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Component phải là async để await params
export default async function EditProductPage({ params }: EditProductPageProps) {
  // Await params để lấy id
  const { id } = await params;
  
  return <EditProductForm productId={id} />;
}