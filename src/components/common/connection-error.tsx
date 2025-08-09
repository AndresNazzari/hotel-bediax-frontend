"use client";

import { AlertCircle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
    title?: string;
    message?: string;
    href?: string;
};

export function ConnectionError({
        title = "Connection Error",
        message,
        href,
    }: Props)
{
    const router = useRouter();

    const handleRetry = () => {
        if (href) router.push(href);
        else router.refresh();
    };

    return (
        <div className="flex flex-col items-center gap-3 rounded-md border border-destructive/50 bg-destructive/10 p-6 text-center">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <div className="space-y-1">
                <h3 className="text-sm font-semibold text-destructive">{title}</h3>
                <p className="text-sm text-muted-foreground">{message}</p>
            </div>
            <Button onClick={handleRetry} className="cursor-pointer">
                <RotateCw className="mr-2 h-4 w-4" />
                Retry
            </Button>
        </div>
    );
}
