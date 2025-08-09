import { CatalogsService } from "@/services/catalogs";
import { CatalogTable } from "@/components/catalogs/catalog-table";
import { CountryDto } from "@/types/api";
import { ConnectionError } from "@/components/common/connection-error";

export const revalidate = 60;

export default async function CountriesPage() {
    try {
        const countries = await CatalogsService.getCountries({ revalidateSeconds: 60 });

        const columns = [
            { header: "ID", accessor: (c: CountryDto) => c.id },
            { header: "Code", accessor: (c: CountryDto) => c.code ?? "-" },
            { header: "Name", accessor: (c: CountryDto) => c.name ?? "-" },
        ];

        return (
            <section className="space-y-4">
                <h1 className="text-xl font-semibold">Countries</h1>
                <CatalogTable columns={columns} data={countries} />
            </section>
        );
    } catch {
        return (
            <section className="space-y-4">
                <h1 className="text-xl font-semibold">Countries</h1>
                <ConnectionError message="Could not load the countries. Server connection error." />
            </section>
        );
    }
}
