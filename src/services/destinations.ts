import { apiFetch } from "@/lib/http/client";
import { endpoints } from "@/lib/http/endpoints";
import {
    CreateDestinationRequest,
    GetDestinationByIdResponse,
    GetDestinationsResponse,
    UpdateDestinationRequest,
} from "@/types/api";

export type ListDestinationsParams = {
    page?: number;
    pageSize?: number;
    filter?: string;
};

function buildQuery(params: ListDestinationsParams) {
    const page = Number.isFinite(params.page) ? Number(params.page) : 1;
    const pageSize = Number.isFinite(params.pageSize) ? Number(params.pageSize) : 20;

    const search = new URLSearchParams();
    search.set("page", String(page));
    search.set("pageSize", String(pageSize));
    if (params.filter && params.filter.trim().length > 0) {
        search.set("filter", params.filter.trim());
    }

    const queryString = search.toString();
    return queryString ? `?${queryString}` : "";
}

export const DestinationsService = {
    async list(params: ListDestinationsParams = {}, options?: { revalidateSeconds?: number }) {
        const path = `${endpoints.destinations.base}${buildQuery(params)}`;

        return apiFetch<GetDestinationsResponse>(path, {
            method: "GET",
            nextOptions: options?.revalidateSeconds
                ? { revalidate: options.revalidateSeconds }
                : undefined,
        });
    },

    async getById(id: number, options?: { revalidateSeconds?: number }) {
        return apiFetch<GetDestinationByIdResponse>(endpoints.destinations.byId(id), {
            method: "GET",
            nextOptions: options?.revalidateSeconds
                ? { revalidate: options.revalidateSeconds }
                : undefined,
        });
    },

    async create(request: CreateDestinationRequest) {
        return apiFetch<number>(endpoints.destinations.base, {
            method: "POST",
            body: request,
            nextOptions: { cache: "no-store" },
        });
    },

    async update(id: number, request: UpdateDestinationRequest) {
        await apiFetch<void>(endpoints.destinations.byId(id), {
            method: "PUT",
            body: request,
            nextOptions: { cache: "no-store" },
        });
    },

    async remove(id: number) {
        await apiFetch<void>(endpoints.destinations.byId(id), {
            method: "DELETE",
            nextOptions: { cache: "no-store" },
        });
    },
};
