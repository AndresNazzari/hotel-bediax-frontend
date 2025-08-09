"use client";

import { useRouter } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
    page: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrevious: boolean;
    pageSize: number;
    filter: string;
};

export function DestinationsPagination({page, totalPages, totalItems, hasNext, hasPrevious, pageSize, filter,}: Props) {
    const router = useRouter();

    function buildQuery(targetPage: number) {
        const p = new URLSearchParams();
        p.set("page", String(targetPage));
        p.set("pageSize", String(pageSize));
        if (filter) p.set("filter", filter);
        return `?${p.toString()}`;
    }

    function go(targetPage: number) {
        router.push(buildQuery(targetPage));
    }

    function pageList(current: number, total: number) {
        const out: (number | "...")[] = [];
        const add = (v: number | "...") => out.push(v);
        if (total <= 7) { for (let i = 1; i <= total; i++) add(i); return out; }
        add(1);
        if (current > 3) add("...");
        for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) add(i);
        if (current < total - 2) add("...");
        add(total);
        return out;
    }

    return (
        <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
                Página {page} de {totalPages} — {totalItems} items
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={hasPrevious ? buildQuery(page - 1) : undefined}
                            aria-disabled={!hasPrevious}
                            className={!hasPrevious ? "pointer-events-none opacity-50" : undefined}
                            onClick={(e) => { if (!hasPrevious) return; e.preventDefault(); go(page - 1); }}
                        />
                    </PaginationItem>

                    {pageList(page, totalPages).map((p, idx) =>
                        p === "..." ? (
                            <PaginationItem key={`e-${idx}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={p}>
                                <PaginationLink
                                    href={buildQuery(p)}
                                    isActive={p === page}
                                    onClick={(e) => { e.preventDefault(); go(p); }}
                                >
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    )}

                    <PaginationItem>
                        <PaginationNext
                            href={hasNext ? buildQuery(page + 1) : undefined}
                            aria-disabled={!hasNext}
                            className={!hasNext ? "pointer-events-none opacity-50" : undefined}
                            onClick={(e) => { if (!hasNext) return; e.preventDefault(); go(page + 1); }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
