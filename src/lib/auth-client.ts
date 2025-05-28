// This file exports the sign-in and sign-up functions from better-auth
// Make sure better-auth is properly configured

import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { defineAuthURL } from "./base-url";

const isProduction = process.env.NODE_ENV === "production";

const baseURL = defineAuthURL();

// Debug logging for production
if (isProduction) {
    console.log("Auth client baseURL:", baseURL);
}

export const { signIn, signUp, signOut, forgetPassword, resetPassword } = createAuthClient({
    baseURL,
    plugins: [inferAdditionalFields<typeof auth>()],
    fetchOptions: {
        customFetchImpl: (input, init) => {
            // Add debugging for production
            if (isProduction) {
                console.log("Auth fetch to:", input);
            }
            return fetch(input, {
                ...init,
                credentials: "include", // Ensure cookies are included
            });
        },
    },
});
