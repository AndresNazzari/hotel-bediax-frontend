export const endpoints = {
    destinations: {
        base: "/api/Destinations",
        byId: (id: number) => `/api/Destinations/${id}`,
    },
    catalogs: {
        countries: "/api/countries",
        destinationTypes: "/api/destination-types",
    },
    cache: {
        clearDestinations: "/api/cache/destinations", // <-- nuevo
    },
} as const;
