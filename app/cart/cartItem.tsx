"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Cartitem } from "@/src/types/cartitems";
import { clearCart, removeItemCart, updateItemCart } from "./cart.actions";

export default function CartItem({ item }: { item: Cartitem }) {
  return (
    <>
      <Card
        key={item._id}
        className="p-6 rounded-3xl shadow-sm hover:shadow-xl transition"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}

          <div className="relative h-40 w-40 rounded-2xl bg-slate-100 overflow-hidden">
            <Image
              src={item.product.imageCover}
              alt=""
              fill
              className="object-contain p-3"
            />
          </div>

          {/* Info */}

          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold">{item.product.title}</h2>

                <p className="text-muted-foreground mt-1">
                  {item.product.brand.name}
                </p>
              </div>

              <h2 className="text-2xl font-bold text-emerald-600">
                EGP {item.price}
              </h2>
            </div>

            <Separator className="my-5" />

            {/* Quantity */}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    updateItemCart(item.product._id, item.count - 1);
                  }}
                  className="cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <span className="text-lg font-semibold w-8 text-center">
                  {item.count}
                </span>

                <Button
                  size="icon"
                  onClick={() => {
                    updateItemCart(item.product._id, item.count + 1);
                  }}
                  className="cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Remove */}

              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-600 cursor-pointer"
                onClick={() => {
                  removeItemCart({
                    productId: item.product._id,
                  });
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
