"use client";

import { DestinationForm, DestinationPersistData } from "@/components/destinations/destination-form";
import { DestinationsService } from "@/services/destinations";
import type { CountryDto, DestinationTypeDto } from "@/types/api";
import { toast } from "sonner";

type Props = {
    id: number;
    detailIsActive: boolean;
    countries: CountryDto[];
    destinationTypes: DestinationTypeDto[];
    initialValues: DestinationPersistData;
};

export function DestinationViewClient({id, detailIsActive, countries, destinationTypes, initialValues,}: Props)
{
    return (
        <DestinationForm
            title={`Destino #${id}`}
            initialValues={initialValues}
            countries={countries}
            destinationTypes={destinationTypes}
            mode="view"
            onSubmit={async (data: DestinationPersistData) => {
                try {
                    await DestinationsService.update(id, { ...data, isActive: detailIsActive });
                    toast.success("Destination updated successfully");
                } catch {
                    toast.error("Error updating the destination");
                }
            }}
        />
    );
}