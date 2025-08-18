import { DestinationsService } from "@/services/destinations";
import { DestinationsHeader } from "@/components/destinations/destinations-header";
import { DestinationsTable } from "@/components/destinations/destinations-table";
import { DestinationsPagination } from "@/components/destinations/destinations-pagination";
import { ConnectionError } from "@/components/common/connection-error";
import type { DestinationDto } from "@/types/api";

type SearchParams = { page?: string; pageSize?: string; filter?: string };
export const revalidate = 0;

export default async function DestinationsPage({searchParams}: { searchParams: Promise<SearchParams>;})
{
    const sp = await searchParams;
    const page = Math.max(parseInt(sp?.page ?? "1", 10) || 1, 1);
    const pageSize = parseInt(sp?.pageSize ?? "20", 10) || 20;
    const filter = (sp?.filter ?? "").trim();

    try {
        const response = await DestinationsService.list({ page, pageSize, filter });
        const items: DestinationDto[] = response.items ?? [];

        const lc = filter.toLowerCase();
        const itemsFiltered =
            lc.length > 0
                ? items.filter(
                    (d) =>
                        (d.description ?? "").toLowerCase().includes(lc) ||
                        (d.name ?? "").toLowerCase().includes(lc)
                )
                : items;

        return (
            <section className="space-y-4">
                <DestinationsHeader initialFilter={filter} pageSize={pageSize} />
                <DestinationsTable items={itemsFiltered} />
                <DestinationsPagination
                    page={response.page}
                    totalPages={response.totalPages}
                    totalItems={response.totalItems}
                    hasNext={response.hasNext}
                    hasPrevious={response.hasPrevious}
                    pageSize={pageSize}
                    filter={filter}
                />
            </section>
        );
    } catch {
        return (
            <section className="space-y-4">
                <DestinationsHeader initialFilter={filter} pageSize={pageSize} />
                <ConnectionError message="Could not load the destinations. Server connection error." />
            </section>
        );
    }
}
