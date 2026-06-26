import { getUserToken } from "@/lib/getUserToken/getUserToken";

export async function getuserOrders() {
    const token = await getUserToken()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/6a3c529bfc33d8001223b8ba`, {
        method: "GET",

        headers: {
            token: token as string,
            'content-type': "application/json"
        }
    })
    const data = await res.json();



}
