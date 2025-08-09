import { CatalogsService } from "@/services/catalogs";
import { DestinationsService } from "@/services/destinations";
import { ConnectionError } from "@/components/common/connection-error";
import { DestinationViewClient } from "@/components/destinations/destination-view-client";

type Props = { params: Promise<{ id: string }> };

export default async function DestinationDetailPage({ params }: Props) {
    const { id } = await params;
    const destinationId = Number(id);

    try {
        const [detail, countries, types] = await Promise.all([
            DestinationsService.getById(destinationId),
            CatalogsService.getCountries(),
            CatalogsService.getDestinationTypes(),
        ]);

        return (
            <section className="space-y-4">
                <DestinationViewClient
                    id={destinationId}
                    detailIsActive={detail.isActive}
                    initialValues={{
                        name: detail.name ?? "",
                        description: detail.description ?? "",
                        countryId: detail.countryId,
                        destinationTypeId: detail.destinationTypeId,
                    }}
                    countries={countries}
                    destinationTypes={types}
                />
            </section>
        );
    } catch {
        return (
            <section className="space-y-4">
                <ConnectionError message="Could not load the destination. Server connection error." />
            </section>
        );
    }
}
