export const env = {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
};

if (!env.apiBaseUrl) {
    // Aviso si no está configurada
    console.warn("NEXT_PUBLIC_API_BASE_URL no está definido en .env.local");
} else {
    // Verificar valor cargado
    console.log("API Base URL:", env.apiBaseUrl);
}
