import { ShoppingBag } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-background">
      {/* Spinner */}
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute h-24 w-24 rounded-full border-4 border-primary/20"></div>

        {/* Animated Ring */}
        <div className="absolute h-24 w-24 animate-spin rounded-full border-4 border-transparent border-t-primary border-r-primary"></div>

        {/* Center Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl">
          <ShoppingBag className="h-8 w-8" />
        </div>
      </div>

      {/* Text */}
      <h2 className="mt-8 text-2xl font-bold text-foreground">
        Loading Products
      </h2>

      <p className="mt-2 text-muted-foreground">
        Please wait while we prepare your shopping experience
      </p>

      {/* Animated Dots */}
      <div className="mt-6 flex gap-2">
        <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-primary" />
      </div>
    </div>
  );
}