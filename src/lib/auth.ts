import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";

const client = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(client, {
        provider: "postgresql",
    }),
    appName: "escuta-med",
    plugins: [nextCookies()],
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
