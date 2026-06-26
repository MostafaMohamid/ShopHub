import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface BrandsGridProps {
  brands: Brand[];
}

export default function BrandsGrid({ brands }: BrandsGridProps) {


  return (
    <section className="container mx-auto py-10">
      {/* Header */}

      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Building2 className="h-7 w-7 text-primary" />
        </div>

        <h1 className="text-4xl font-bold">Our Brands</h1>

        <p className="mt-3 text-muted-foreground">
          Discover products from {brands.length} trusted brands.
        </p>
      </div>

      {/* Grid */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {brands.map((brand) => (
          <Link key={brand._id} href={`/brands/brandProducts/${brand._id}`}>
            <Card className="group h-full cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl">
              <CardContent className="flex flex-col items-center justify-between p-8">
                {/* Logo */}

                <div className="flex h-36 items-center justify-center">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={150}
                    height={90}
                    className="object-contain transition duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Name */}

                <div className="mt-6 text-center">
                  <h2 className="text-xl font-semibold">{brand.name}</h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Official Brand
                  </p>
                </div>

                {/* Button */}

                <div className="mt-6 flex items-center gap-2 text-primary font-medium">
                  View Products
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
