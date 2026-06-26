import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Tag, FolderOpen } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Props {
  category: Category;
}

export default function CategoryDetails({ category }: Props) {
  return (
    <section className="container mx-auto py-12">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Image */}

        <div className="relative flex h-[500px] items-center justify-center rounded-3xl bg-slate-100 shadow-xl">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-contain p-12"
            priority
          />
        </div>

        {/* Content */}

        <div>
          <span className="rounded-full bg-primary/10 px-4 py-2 text-primary font-medium">
            Category
          </span>

          <h1 className="mt-6 text-6xl font-black">{category.name}</h1>

          <p className="mt-4 text-lg text-muted-foreground">
            Browse the best products from the
            <span className="font-semibold"> {category.name}</span> collection.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3">
              <FolderOpen className="text-primary" />

              <span>
                Category Name:
                <strong> {category.name}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Tag className="text-primary" />

              <span>
                Slug:
                <strong> {category.slug}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-primary" />

              <span>
                Added:
                <strong>
                  {" "}
                  {new Date(category.createdAt).toLocaleDateString()}
                </strong>
              </span>
            </div>
          </div>

          <Link
            href={`/?category=${category._id}`}
            className="mt-12 inline-flex items-center rounded-xl bg-primary px-8 py-4 text-white transition hover:scale-105"
          >
            Browse Products
            <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
