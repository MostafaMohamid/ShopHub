import { productsresponse } from "@/src/types/allproducts";
import { BrandsResponse } from "@/src/types/brands";

export async function getAllBrands() {
    const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/brands",
        {
            cache: "force-cache",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch brands");
    }

    const data: BrandsResponse = await res.json();

    return data;
}

export async function getSpacificBrand(brandid: string) {
    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${brandid}`,
        {
            cache: "force-cache",
        }
    );



    const data: productsresponse = await res.json();


    return data;
}