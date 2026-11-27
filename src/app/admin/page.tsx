import { getProducts, getCategories } from '@/lib/services/productService';
import { AdminDashboardClient } from '@/components/auth/AdminDashboardClient';

export default async function AdminPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <AdminDashboardClient products={products} categories={categories} />;
}
