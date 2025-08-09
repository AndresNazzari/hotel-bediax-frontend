export type CountryDto = {
    id: number;
    code: string | null;
    name: string | null;
};

export type DestinationTypeDto = {
    id: number;
    name: string | null;
};

export type DestinationDto = {
    id: number;
    name: string | null;
    description: string | null;
    isActive: boolean;
    country: string | null;
    destinationType: string | null;
    countryId: number;
    destinationTypeId: number;
};

export type GetDestinationsResponse = {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    items: DestinationDto[] | null;
};

export type GetDestinationByIdResponse = DestinationDto;

export type CreateDestinationRequest = {
    name?: string | null;
    description?: string | null;
    countryId: number;
    destinationTypeId: number;
};

export type UpdateDestinationRequest = {
    name?: string | null;
    description?: string | null;
    countryId: number;
    destinationTypeId: number;
    isActive: boolean;
};
