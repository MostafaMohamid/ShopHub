import Image from "next/image";
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { product } from "@/src/types/allproducts";
import { Review } from "@/src/types/allproducts";
import AddtoCartBtn from "../AddtoCartBtn/AddtoCartBtn";
export default function ProductDetails({ product }: { product: product }) {

  return (
    <main className="container mx-auto px-6 py-8">
      {/* Breadcrumb */}

      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>{product.slug}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hero */}

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image */}

        <Card className="relative overflow-hidden rounded-3xl border-0 shadow-xl bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-900 dark:to-slate-800">
          {/* Blurred Background */}

          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            className="
      absolute
      inset-0
      object-cover
      blur-3xl
      scale-125
      opacity-20
    "
          />

          {/* Floating Buttons */}

          <div className="absolute top-5 right-5 z-20 flex flex-col gap-3">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg backdrop-blur-md"
            >
              <Heart className="w-5 h-5" />
            </Button>

            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg backdrop-blur-md"
            >
              🔍
            </Button>
          </div>

          {/* Category */}

          <Badge className="absolute left-5 top-5 z-20 rounded-full px-4 py-1 text-sm shadow">
            {product.category.name}
          </Badge>

          {/* Main Image */}

          <div className="relative flex items-center justify-center h-[600px]">
            <Image
              src={product.imageCover}
              alt={product.title}
              width={420}
              height={420}
              priority
              className="
        object-contain
        drop-shadow-2xl
        transition-all
        duration-500
        hover:scale-110
        hover:-translate-y-3
      "
            />
          </div>

          {/* Fake Thumbnails */}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
            {product.images.map((i) => (
              <button
                key={i}
                className="
          h-16
          w-16
          rounded-xl
          border-2
          bg-white
          p-2
          shadow-md
          hover:border-blue-600
          transition
        "
              >
                <Image
                  src={product.imageCover}
                  alt=""
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        </Card>

        {/* Product Info */}

        <div className="flex flex-col justify-center">
          <Badge className="w-fit mb-4">{product.category.name}</Badge>

          <h1 className="text-4xl font-bold">{product.title}</h1>

          <div className="flex gap-1">
            {Array.from({ length: product.ratingsAverage }).map((_, index) => (
              <Star
                key={index}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="text-muted-foreground">
              {product.ratingsAverage} ({product.ratingsQuantity} Reviews)
            </span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <h2 className="text-5xl font-black text-emerald-600">
              EGP {product.price}
            </h2>

            <span className="text-muted-foreground">Including VAT</span>
          </div>

          <p className="text-muted-foreground leading-7 mt-6">
            {product.description}
          </p>

          <Separator className="my-8" />

          {/* Features */}

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Truck className="text-blue-600" />
              <span>Free Shipping</span>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-green-600" />
              <span>3 Month`s Warranty</span>
            </div>

            <div className="flex items-center gap-3">
              <RotateCcw className="text-orange-500" />
              <span>30 Days Return Policy</span>
            </div>
          </div>

          {/* Quantity */}

          {/* Buttons */}

          <div className="flex gap-4 mt-8">
            <AddtoCartBtn
              productId={product._id}
              productName={product.title}
              productImg={product.imageCover}
              className="
    w-full
    h-14
    rounded-2xl
    text-lg
    font-semibold
    shadow-lg
    transition-all
    hover:scale-[1.02]
    bg-primary
    text-primary-foreground
    hover:bg-primary/90
  "
            />

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 cursor-pointer "
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}

      <Tabs defaultValue="description" className="mt-16">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>

          <TabsTrigger value="details">Details</TabsTrigger>

          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <Card className="p-6 mt-6 leading-8">{product.description}</Card>
        </TabsContent>

        <TabsContent value="details">
          <Card className="p-6 mt-6 space-y-3">
            <p>
              <strong>Category:</strong> Women's Fashion
            </p>

            <p>
              <strong>Brand:</strong> {product.brand.name}
            </p>

            <p>
              <strong>Material:</strong> {product.category.slug}
            </p>

            <p>
              <strong>Stock:</strong>
              {product.quantity}
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          {product.reviews.map((rev: Review) => (
            <Card key={rev._id} className="p-6 mt-6">
              <h3 className="font-semibold">{rev.user.name}</h3>

              <p className="text-yellow-500">{"⭐".repeat(rev.rating)}</p>

              <p className="mt-2 text-muted-foreground">{rev.review}</p>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </main>
  );
}
