import { promises } from "dns";
import React from "react";
import ProductDetails from "../_mycommponents/ProductDetails/productdetails";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    { cache: "force-cache" },
  );
  const ProductDetailsData = await data.json();

  return (
    <>
      <ProductDetails product={ProductDetailsData.data} />
    </>
  );
}
