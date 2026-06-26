import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { product } from "@/src/types/allproducts";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingCart, Heart, Star } from "lucide-react";
import AddtoCartBtn from "../AddtoCartBtn/AddtoCartBtn";
export function ProductCard({ product }: { product: product }) {
  return (
    <Card
      className="
    group
    overflow-hidden
    rounded-3xl
    border
    shadow-sm
    hover:shadow-2xl
    hover:-translate-y-2
    transition-all
    duration-300
    pt-0
"
    >
      {/* Image */}

      <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-900">
        <Image
          src={product.imageCover}
          alt={product.title}
          width={500}
          height={500}
          className="
        h-72
        w-full
        object-contain
        transition-all
        duration-500
        group-hover:scale-110
      "
        />

        {/* Wishlist */}

        <Button
          size="icon"
          variant="secondary"
          className="
        absolute
        top-4
        right-4
        rounded-full
        shadow-lg
        opacity-0
        group-hover:opacity-100
        transition
      "
        >
          <Heart className="w-5 h-5" />
        </Button>

        {/* Category */}

        <Badge className="absolute top-4 left-4">{product.category.name}</Badge>
      </div>

      <CardContent className="p-5">
        {/* Rating */}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: product.ratingsAverage }).map((_, index) => (
              <Star
                key={index}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}

            <span className="text-sm font-medium">
              {product.ratingsAverage}
            </span>
          </div>

          <span className="text-xl font-bold text-emerald-600">
            EGP {product.price}
          </span>
        </div>

        {/* Title */}

        <h3 className="font-bold text-lg line-clamp-1">{product.title}</h3>

        {/* Description */}

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-3 mt-6">
          {/* <Button className="cursor-pointer">
            <ShoppingCart className="w-4 h-4 mr-2 cursor-pointer" />
            Cart
          </Button> */}
          <AddtoCartBtn
            productId={product._id}
            productName={product.title}
            productImg={product.imageCover}
          />

          <Button variant="outline" asChild>
            <Link href={`/${product._id}`}>
              <Eye className="w-4 h-4 mr-2" />
              Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
