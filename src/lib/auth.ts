import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";
import { defineBaseURL } from "./base-url";

const client = new PrismaClient();

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
    database: prismaAdapter(client, {
        provider: "postgresql",
    }),
    appName: "escuta-med",
    // Configure baseURL for production
    baseURL: defineBaseURL(),
    plugins: [nextCookies()],
    // Cookie configuration for production
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5, // 5 minutes
        },
    },
    cookies: {
        sessionToken: {
            attributes: {
                httpOnly: true,
                sameSite: "lax",
                secure: isProduction, // true in production, false in development
                ...(isProduction && {
                    domain: ".escutamed.com", // Allow subdomain access
                }),
            },
        },
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({user, url, token}) => {
            // Em um ambiente de produção, você enviaria um email real
            console.log(`Enviar email de redefinição de senha para ${user.email}`);
            console.log(`URL de redefinição: ${url}`);
            console.log(`Token: ${token}`);
        },
    },
    emailVerification: {
        sendVerificationEmail: async ({user, url, token}) => {
            // Em um ambiente de produção, você enviaria um email real
            console.log(`Enviar email de verificação para ${user.email}`);
            console.log(`URL de verificação: ${url}`);
            console.log(`Token: ${token}`);
        },
        sendOnSignUp: true, // Envia um email de verificação quando o usuário se cadastra
    },
});
