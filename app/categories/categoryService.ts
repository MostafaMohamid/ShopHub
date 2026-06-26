import { CategoriesResponse, CategoryResponse } from "@/src/types/categories";
import { Category } from "@/src/types/categories";

export async function getAllCategories(): Promise<CategoriesResponse> {
    const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/categories",
        {
            cache: "force-cache",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }

    return res.json();
}


export async function getSpecificCategory(
    categoryId: string
): Promise<CategoryResponse> {
    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`,
        {
            cache: "force-cache",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch category");
    }

    return res.json();
}