import Link from "next/link";
import { ShoppingBag, Home, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Background Blur */}

      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 max-w-xl text-center">
        {/* Icon */}

        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 shadow-lg">
          <ShoppingBag className="h-12 w-12 text-primary" />
        </div>

        {/* 404 */}

        <h1 className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-8xl font-black text-transparent">
          404
        </h1>

        <h2 className="mt-6 text-4xl font-bold">Oops! Page Not Found</h2>

        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to shopping.
        </p>

        {/* Buttons */}

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-xl px-8 shadow-lg transition hover:scale-105"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Back Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl px-8 transition hover:scale-105"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        {/* Small Card */}

        <div className="mt-14 rounded-2xl border bg-card p-6 shadow-lg">
          <h3 className="text-lg font-semibold">Looking for something?</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Browse our latest products, discover premium brands, or explore
            categories to find exactly what you need.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/brands"
              className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
            >
              Brands
            </Link>

            <Link
              href="/categories"
              className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
            >
              Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
