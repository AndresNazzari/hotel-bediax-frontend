"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
    initialFilter?: string;
    pageSize?: number;
};

export function DestinationsHeader({ initialFilter = "", pageSize = 20 }: Props) {
    const [term, setTerm] = useState(initialFilter);
    const router = useRouter();
    const pathname = usePathname();

    function applyFilter() {
        const params = new URLSearchParams();
        if (term.trim().length > 0) params.set("filter", term.trim());
        params.set("page", "1");
        params.set("pageSize", String(pageSize));
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl font-semibold">Destinations</h1>

            <div className="flex items-center gap-2">
                <Input
                    name="filter"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") applyFilter();
                    }}
                    placeholder="Search by name..."
                    className="w-[340px]"
                />
                <Button variant="outline" onClick={applyFilter}>
                    Search
                </Button>
                <Button asChild>
                    <Link href="/destinations/new">Create destination</Link>
                </Button>
            </div>
        </div>
    );
}
