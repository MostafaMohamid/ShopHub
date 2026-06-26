"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";
import { clearCart } from "./cart.actions";

export default function ClearItemsBtn() {
  return (
    <Button
      variant="destructive"
      className="cursor-pointer"
      onClick={() => {
        clearCart();
      }}
    >
      <Trash2 className="mr-2 h-4 w-4 cursor-pointer" />
      Clear Cart
    </Button>
  );
}
