import { productsresponse } from "@/src/types/allproducts";

export async function getAllProsducts(): Promise<productsresponse> {
  const res = await fetch("https://ecommerce.routemisr.com//api/v1/products", { next: { revalidate: 10 } });
  return res.json();
}