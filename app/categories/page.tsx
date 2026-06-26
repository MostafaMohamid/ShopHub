import CategoriesGrid from "./CategoriesGrid";
import { getAllCategories } from "./categoryService";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return <CategoriesGrid categories={categories.data} />;
}
