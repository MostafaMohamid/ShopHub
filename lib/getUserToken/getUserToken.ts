import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getUserToken() {
    const cookie = await cookies()
    const token = cookie.get('next-auth.session-token')?.value;
    const decoodedToken = await decode({
        token,
        secret: process.env.NEXTAUTH_SECRET!,
    })
    console.log(` decoodedTokenaccesstoken:`, decoodedToken?.accesstoken);
    return decoodedToken?.accesstoken

}