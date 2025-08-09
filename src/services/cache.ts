import { apiFetch } from "@/lib/http/client";
import { endpoints } from "@/lib/http/endpoints";

export const CacheService = {
    async clearDestinations() {
        await apiFetch<void>(endpoints.cache.clearDestinations, {
            method: "DELETE",
        });
    },
};
