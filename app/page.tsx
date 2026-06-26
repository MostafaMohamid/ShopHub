import { product, productsresponse } from "./../src/types/allproducts";
import { ProductCard } from "./_mycommponents/ProductCard/ProductCard";
import ScrollToTop from "./_mycommponents/ScrollToTop";
import { getAllProsducts } from "./services/productservice";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const allproducts = await getAllProsducts();
  const { search = "" } = await searchParams;
  const filteredProducts = search
    ? allproducts.data.filter((product: product) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      )
    : allproducts.data;
  return (
    <>
      <div className="container mx-auto mt-3">
        <div className=" grid grid-cols-1 w-[90%] mx-auto md:grid-cols-2 md:w-full lg:grid-cols-5 lg:w-full xl:w-full gap-3 ">
          {filteredProducts.map((product: product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
     
      </div>
    </>
  );
}
