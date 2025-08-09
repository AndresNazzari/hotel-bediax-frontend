import { apiFetch } from "@/lib/http/client";
import { endpoints } from "@/lib/http/endpoints";
import { CountryDto, DestinationTypeDto } from "@/types/api";

export const CatalogsService = {
    async getCountries(options?: { revalidateSeconds?: number }) {
        return apiFetch<CountryDto[]>(endpoints.catalogs.countries, {
            method: "GET",
            nextOptions: options?.revalidateSeconds ? { revalidate: options.revalidateSeconds } : undefined,
        });
    },

    async getDestinationTypes(options?: { revalidateSeconds?: number }) {
        return apiFetch<DestinationTypeDto[]>(endpoints.catalogs.destinationTypes, {
            method: "GET",
            nextOptions: options?.revalidateSeconds ? { revalidate: options.revalidateSeconds } : undefined,
        });
    },
};
