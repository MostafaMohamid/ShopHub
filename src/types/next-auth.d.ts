import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        accesstoken: string;
        user: DefaultSession["user"] & {
            accesstoken: string;
        };
    }

    interface User extends DefaultUser {
        accesstoken: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accesstoken: string;
    }
}

export { };