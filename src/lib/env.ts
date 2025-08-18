export const env = {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
};

if (!env.apiBaseUrl) {
    console.warn("NEXT_PUBLIC_API_BASE_URL no está definido en .env.local");
} else {
    console.log("API Base URL:", env.apiBaseUrl);
}
