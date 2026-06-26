import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Category } from "@/src/types/categories";
import { Card } from "@/components/ui/card";

interface Props {
  categories: Category[];
}

export default function CategoriesGrid({ categories }: Props) {
  return (
    <section className="container mx-auto py-12">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold">Shop by Category</h1>

        <p className="mt-4 text-muted-foreground">
          Explore products by category
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {categories.map((category, index) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className={index === 0 ? "md:col-span-2" : ""}
          >
            <Card className="group overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all">
              <div className="relative h-64 bg-slate-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain p-6 transition duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold">{category.name}</h2>

                <p className="mt-2 text-muted-foreground">
                  Explore products in this category
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
