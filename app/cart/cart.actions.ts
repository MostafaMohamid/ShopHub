
"use server"

import { getUserToken } from "@/lib/getUserToken/getUserToken"
import { CartData } from "@/src/types/allproducts";
import { gatcartUser, cartUser } from "@/src/types/cartitems";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import { json } from "zod";
import { CheckoutValues } from "./checkout/[cartId]/page";

export async function addToCart(productId: { productId: string }): Promise<Boolean> {



    const token = await getUserToken()
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: "POST",
        body: JSON.stringify(productId),
        headers: {
            token: token as string,
            'content-type': "application/json"
        }

    }

    )


    const data: CartData = await res.json();

    if (data.status == 'success') {
        revalidatePath("/");
        return true
    }
    else {
        return false
    }


}

export async function getUserCart(): Promise<gatcartUser> {
    const token = await getUserToken()
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: "get",
        headers: {
            token: token as string,
            'content-type': "application/json"
        }
    })
    const datacart = res.json()
    return datacart
}
export async function updateItemCart(productId: string, count: number) {
    const token = await getUserToken();

    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            method: "PUT",
            headers: {
                token: token as string,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                count,
            }),
        }
    );

    const data = await res.json();



    if (data.status === "success") {
        revalidatePath("/cart");
        return true;
    }

    else {
        toast.error(data.message)
    }
}
export async function removeItemCart(Id: { productId: string }) {


    const token = await getUserToken();
    const { productId } = Id
    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            method: "DELETE",
            headers: {
                token: token as string,
            },
        }
    );

    const data = await res.json()
    if (data.status == "success") {
        revalidatePath('/cart')
    }
}

export async function clearCart() {
    const token = await getUserToken();


    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
            method: "DELETE",
            headers: {
                token: token as string,
            },
        }
    );

    const data = await res.json()
    if (data.message == "success") {
        revalidatePath('/cart')
    }
}


export async function cashCheckOut(cartId: string, values: CheckoutValues) {
    const token = await getUserToken();
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            token: token as string,
            'content-type': "application/json"
        }
    })
    const data = await res.json()
    if (data.status == "success") {
        return true

    }
    else false

}




export async function visaCheckOut(cartId: string, values: CheckoutValues) {
    const token = await getUserToken();
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            token: token as string,
            'content-type': "application/json"
        }
    })
    const data = await res.json()

    if (data.status == "success") {
        return data.session.url

    }
    else false

}