import { BrandsResponse } from "@/src/types/brands";

import { getAllBrands } from "./getbrandsdata";
import BrandsGrid from "../_mycommponents/brandgrid/brandgrid";

export default async function BrandsPage() {
  const brands: BrandsResponse = await getAllBrands();

  return <BrandsGrid brands={brands.data} />;
}
