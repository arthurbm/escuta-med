const isProduction = process.env.NODE_ENV === "production";
const isPreview = process.env.VERCEL_TARGET_ENV === "preview" || process.env.VERCEL_TARGET_ENV === "development";

export const defineBaseURL = () => {
    if (isPreview) {
        return `https://${process.env.VERCEL_URL}`;
    }
    if (isProduction) {
        return "https://www.escutamed.com";
    }
    return process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
};

export const defineAuthURL = () => {
    return `${defineBaseURL()}/api/auth`;
}; 