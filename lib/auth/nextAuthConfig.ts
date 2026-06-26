import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const nextAuthConfig: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: 'ShopHun',
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credintals) => {
                console.log("authorize fired");
                const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credintals),
                })
                const data = await res.json()
                console.log(data);

                if (data.message == 'success' && data.user) {
                    return {
                        id: data.user.email,
                        email: data.user.email,
                        name: data.user.name,
                        accesstoken: data.token,
                    }
                }
                return null
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.accesstoken = user.accesstoken;
            }

            return token;
        },

        session: ({ session, token }) => {
            session.user.accesstoken = token.accesstoken as string;

            return session;
        },
    },
    pages: {
        signIn: '/login'

    }
}