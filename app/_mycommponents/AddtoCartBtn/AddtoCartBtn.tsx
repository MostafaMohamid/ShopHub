"use client";
import { addToCart } from "@/app/cart/cart.actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "sonner";

interface AddToCartBtnProps {
  productId: string;
  productImg: string;
  productName: string;
  className?: string;
}

export default function AddtoCartBtn({
  productId,
  productImg,
  productName,
  className,
}: AddToCartBtnProps) {
  const router = useRouter();
  async function handleAddtoCart() {
    const response = await addToCart({
      productId,
    });
    if (response == true) {
      toast.success("Added to cart", {
        description: productName,
        icon: (
          <img
            src={productImg}
            alt={productName}
            className="w-10 h-10 rounded-lg object-cover"
          />
        ),
        action: {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        },
      });
    } else {
      toast.error("Something Went Wrong");
    }
  }
  return (
    <Button
      className={cn("cursor-pointer", className)}
      onClick={handleAddtoCart}
    >
      <ShoppingCart className="w-4 h-4 mr-2 cursor-pointer" />
      Cart
    </Button>
  );
}
