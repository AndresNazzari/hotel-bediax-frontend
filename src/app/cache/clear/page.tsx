"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import {CacheService} from "@/services/cache";

export default function ClearCachePage() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleClear() {
        try {
            setIsLoading(true);
            await CacheService.clearDestinations();
            toast.success("Cache cleared successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Error clearing the cache.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="space-y-3">
            <h2 className="text-xl font-semibold">Clear cache</h2>
            <div>
                <Button onClick={handleClear} disabled={isLoading}>
                    {isLoading ? "Clearing..." : "Clear cache"}
                </Button>
            </div>
        </section>
    );
}
