// This file exports the sign-in and sign-up functions from better-auth
// Make sure better-auth is properly configured

import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";
import { inferAdditionalFields } from "better-auth/client/plugins";

const isProduction = process.env.NODE_ENV === "production";
const isPreview = process.env.VERCEL_TARGET_ENV === "preview" || process.env.VERCEL_TARGET_ENV === "development";

const defineBaseURL = () => {
    if (isPreview) {
        return `https://${process.env.VERCEL_URL}/api/auth`;
    }
    if (isProduction) {
        return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/auth`;
    }
    return "http://localhost:3000/api/auth";
};

export const { signIn, signUp, signOut, forgetPassword, resetPassword } = createAuthClient({
    baseURL: defineBaseURL(),
    plugins: [inferAdditionalFields<typeof auth>()],
});
