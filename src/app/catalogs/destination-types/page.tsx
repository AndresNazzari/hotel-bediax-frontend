import { CatalogsService } from "@/services/catalogs";
import { CatalogTable } from "@/components/catalogs/catalog-table";
import { DestinationTypeDto } from "@/types/api";
import {ConnectionError} from "@/components/common/connection-error";

export const revalidate = 60;

export default async function DestinationTypesPage() {
    try {
        const types = await CatalogsService.getDestinationTypes({ revalidateSeconds: 60 });

        const columns = [
            { header: "ID", accessor: (t: DestinationTypeDto) => t.id },
            { header: "Name", accessor: (t: DestinationTypeDto) => t.name ?? "-" },
        ];

        return (
            <section className="space-y-4">
                <h1 className="text-xl font-semibold">Destination Types</h1>
                <CatalogTable columns={columns} data={types} />
            </section>
        );
    } catch (error) {
        return (
            <section className="space-y-4">
                <h1 className="text-xl font-semibold">Countries</h1>
                <ConnectionError message="Could not load the countries. Server connection error." />
            </section>
        );
    }
}
