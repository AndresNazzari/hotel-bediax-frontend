import { CatalogsService } from "@/services/catalogs";
import { CreateDestinationForm } from "@/components/destinations/create-destination-form";
import { ConnectionError } from "@/components/common/connection-error";
import { CountryDto, DestinationTypeDto } from "@/types/api";

export default async function NewDestinationPage() {
    try {
        const [countries, destinationTypes] = await Promise.all([
            CatalogsService.getCountries(),
            CatalogsService.getDestinationTypes(),
        ]);

        return (
            <section className="space-y-4">
                <h1 className="text-xl font-semibold">Crear destino</h1>
                <CreateDestinationForm
                    countries={countries as CountryDto[]}
                    destinationTypes={destinationTypes as DestinationTypeDto[]}
                />
            </section>
        );
    } catch {
        return (
            <section className="space-y-4">
                <h1 className="text-xl font-semibold">Crear destino</h1>
                <ConnectionError message="Could not load the countries and destination types. Server connection error." />
            </section>
        );
    }
}
