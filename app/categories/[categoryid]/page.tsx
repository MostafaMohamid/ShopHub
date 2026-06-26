import CategoryDetails from "@/app/_mycommponents/CategoryDetails/CategoryDetails";
import { getSpecificCategory } from "../categoryService";

export default async function Page({
  params,
}: {
  params: Promise<{ categoryid: string }>;
}) {
  const { categoryid } = await params;

  const category = await getSpecificCategory(categoryid);

  return <CategoryDetails category={category.data} />;
}
