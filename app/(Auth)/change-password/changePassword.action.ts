"use server";

import { getUserToken } from "@/lib/getUserToken/getUserToken";

export async function changePassword(values: {
    currentPassword: string;
    password: string;
    rePassword: string;
}) {
    const token = await getUserToken();

    const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
            method: "PUT",
            headers: {
                token: token as string,
                'content-type': "application/json"
            },
            body: JSON.stringify(values),
        }
    );

    return await res.json();
}