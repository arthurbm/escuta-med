// This file exports the sign-in and sign-up functions from better-auth
// Make sure better-auth is properly configured

import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";
import { inferAdditionalFields } from "better-auth/client/plugins";

const isProduction = process.env.NODE_ENV === "production";

export const { signIn, signUp, signOut, forgetPassword } = createAuthClient({
    baseURL: isProduction
        ? process.env.NEXT_PUBLIC_AUTH_URL
        : "http://localhost:3000/api/auth",
    plugins: [inferAdditionalFields<typeof auth>()],
});
