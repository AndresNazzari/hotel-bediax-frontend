import { env } from "@/lib/env";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class ApiError extends Error {
    status: number;
    details?: unknown;

    constructor(message: string, status: number, details?: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.details = details;
    }
}

type ApiFetchOptions = Omit<RequestInit, "method" | "body"> & {
    method?: HttpMethod;
    body?: unknown;
    /** Timeout en ms */
    timeoutMs?: number;
    /** Opciones específicas de Next.js para SSR/ISR */
    nextOptions?: { revalidate?: number } | { tags?: string[] } | { cache?: RequestCache };
};

/**
 * Realiza una llamada a la API y devuelve la respuesta tipada.
 */
export async function apiFetch<TResponse>(
    path: string,
    { method = "GET", body, timeoutMs = 15000, nextOptions, ...init }: ApiFetchOptions = {}
): Promise<TResponse> {
    const url = buildUrl(path);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            method,
            ...(body !== undefined
                ? { body: typeof body === "string" ? body : JSON.stringify(body) }
                : {}),
            headers: {
                "Content-Type": "application/json",
                ...(init.headers ?? {}),
            },
            signal: controller.signal,
            ...(nextOptions ?? {}),
            ...init,
        });

        const contentType = response.headers.get("content-type");
        const isJson = contentType?.includes("application/json");
        const payload = isJson ? await response.json() : await response.text();

        if (!response.ok) {
            const message = typeof payload === "string" ? payload : payload?.title ?? "Request failed";
            throw new ApiError(message, response.status, payload);
        }

        return payload as TResponse;
    } catch (error) {
        if ((error as Error).name === "AbortError") {
            throw new ApiError("Request timeout", 408);
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}

function buildUrl(path: string) {
    if (!env.apiBaseUrl) return path;
    return `${env.apiBaseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}
