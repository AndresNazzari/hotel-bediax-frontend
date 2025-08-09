"use client";
import { ConnectionError } from "@/components/common/connection-error";

export default function DestinationsError() {
    return (
        <section className="space-y-4">
            <h1 className="text-xl font-semibold">Destinations</h1>
            <ConnectionError title="An error occurred" message="Something went wrong while rendering this section." />
        </section>
    );
}
