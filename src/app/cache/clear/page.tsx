"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ClearCachePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    async function handleClear() {
        try {
            setIsLoading(true);
            setResult(null);
            // TODO: acá vamos a pegarle a tu endpoint de clear cache del backend
            // por ahora, simulo:
            await new Promise(r => setTimeout(r, 800));
            setResult("Cache limpiado correctamente.");
        } catch (e) {
            setResult("Error al limpiar el cache.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="space-y-3">
            <h2 className="text-xl font-semibold">Clear cache</h2>
            <div>
                <Button onClick={handleClear} disabled={isLoading}>
                    {isLoading ? "Limpiando..." : "Limpiar cache"}
                </Button>
            </div>
            {result && <p className="text-sm text-muted-foreground">{result}</p>}
        </section>
    );
}
