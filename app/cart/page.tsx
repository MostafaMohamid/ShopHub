import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUserCart } from "./cart.actions";
import CartItem from "./cartItem";
import { Toaster } from "sonner";
import ClearItemsBtn from "./clearItemsBtn";
import CheckoutBtn from "./CheckoutBtn";

export default async function Cart() {
  const { data, numOfCartItems,cartId } = await getUserCart();


  return (
    <main className="container mx-auto px-6 py-10">
      {/* Header */}

      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground my-3">
            You have {numOfCartItems} items in your cart
          </p>
        </div>

        {/* <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Cart
        </Button> */}
        <ClearItemsBtn />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Products */}

        <div className="lg:col-span-2 space-y-6">
          {/* Product */}
          {data.products.map((item) => (
            <CartItem item={item} key={item._id} />
            // <Card key={item._id} className="p-6 rounded-3xl shadow-sm hover:shadow-xl transition">
            //   <div className="flex flex-col md:flex-row gap-6">
            //     {/* Image */}

            //     <div className="relative h-40 w-40 rounded-2xl bg-slate-100 overflow-hidden">
            //       <Image
            //         src={item.product.imageCover}
            //         alt=""
            //         fill
            //         className="object-contain p-3"
            //       />
            //     </div>

            //     {/* Info */}

            //     <div className="flex-1">
            //       <div className="flex justify-between">
            //         <div>
            //           <h2 className="text-xl font-bold">
            //             {item.product.title}
            //           </h2>

            //           <p className="text-muted-foreground mt-1">
            //             {item.product.brand.name}
            //           </p>
            //         </div>

            //         <h2 className="text-2xl font-bold text-emerald-600">
            //           EGP {item.price}
            //         </h2>
            //       </div>

            //       <Separator className="my-5" />

            //       {/* Quantity */}

            //       <div className="flex items-center justify-between">
            //         <div className="flex items-center gap-3">
            //           <Button variant="outline" size="icon">
            //             <Minus className="w-4 h-4" />
            //           </Button>

            //           <span className="text-lg font-semibold w-8 text-center">
            //             {item.count}
            //           </span>

            //           <Button size="icon">
            //             <Plus className="w-4 h-4" />
            //           </Button>
            //         </div>

            //         {/* Remove */}

            //         <Button
            //           variant="ghost"
            //           className="text-red-500 hover:text-red-600"
            //           // onClick={() => {
            //           //   removeItemCart(item._id);
            //           // }}
            //         >
            //           <Trash2 className="w-4 h-4 mr-2" />
            //           Remove
            //         </Button>
            //       </div>
            //     </div>
            //   </div>
            // </Card>
          ))}

          {/* Duplicate this card with map() */}
        </div>

        {/* Summary */}

        <div>
          <Card className="sticky top-24 p-6 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {numOfCartItems == 0 ? "-" : `EGP${data.totalCartPrice}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-600">Free</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>{numOfCartItems == 0 ? "-" : "EGP 20"}</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>
                {numOfCartItems === 0 ? "-" : `EGP ${data.totalCartPrice + 20}`}
              </span>{" "}
            </div>

            {/* <Button className="w-full mt-8 h-12 text-lg rounded-xl">
              Checkout
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button> */}
            <CheckoutBtn cartID={cartId}/>

            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </Card>
        </div>
      </div>
      <Toaster />
    </main>
  );
}
