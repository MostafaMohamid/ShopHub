"use client";
import { PackageSearch } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getSpacificBrand } from "../../getbrandsdata";
import { ProductCard } from "@/app/_mycommponents/ProductCard/ProductCard";
import { product } from "@/src/types/allproducts";

export default function Page() {
  const { brandId } = useParams();

  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrand() {
      const data = await getSpacificBrand(brandId as string);

      // assuming the API returns:
      // { data: [products...] }
      setProducts(data.data);

      setLoading(false);
    }

    if (brandId) {
      fetchBrand();
    }
  }, [brandId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      {products.length === 0 ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <div className="mb-6 rounded-full bg-primary/10 p-5">
            <PackageSearch className="h-14 w-14 text-primary" />
          </div>

          <h2 className="text-3xl font-bold">No Products Found</h2>

          <p className="mt-3 max-w-md text-muted-foreground">
            This brand doesn't have any products available yet. Please check
            back later or explore our other brands.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
