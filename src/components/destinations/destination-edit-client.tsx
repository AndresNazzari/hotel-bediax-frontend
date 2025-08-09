"use client";

import { DestinationForm, DestinationPersistData } from "@/components/destinations/destination-form";
import { DestinationsService } from "@/services/destinations";
import type { CountryDto, DestinationTypeDto } from "@/types/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
    id: number;
    detailIsActive: boolean;
    countries: CountryDto[];
    destinationTypes: DestinationTypeDto[];
    initialValues: DestinationPersistData;
};

export function DestinationEditClient({
                                          id,
                                          detailIsActive,
                                          countries,
                                          destinationTypes,
                                          initialValues,
                                      }: Props) {
    const router = useRouter();

    return (
        <DestinationForm
            title={`Edit destination #${id}`}
            initialValues={initialValues}
            countries={countries}
            destinationTypes={destinationTypes}
            mode="edit"
            onSubmit={async (data: DestinationPersistData) => {
                try {
                    await DestinationsService.update(id, { ...data, isActive: detailIsActive });
                    toast.success("Destination updated successfully");
                    router.push("/destinations");
                } catch {
                    toast.error("Error updating the destination");
                }
            }}
        />
    );
}
