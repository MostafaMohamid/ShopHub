import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CheckoutBtn({ cartID }: { cartID: string }) {
  return (
    <>
      <Link href={`/cart/checkout/${cartID}`}>
        <Button className="w-full mt-8 h-12 text-lg rounded-xl cursor-pointer">
          Checkout
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </>
  );
}
