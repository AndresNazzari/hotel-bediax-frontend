"use client";

import { AlertCircle } from "lucide-react";

type Props = {
    message?: string;
};

export function ErrorState({ message }: Props) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-6 text-center">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <p className="text-sm font-medium text-destructive">
                {message ?? "Error connecting to the server. Please try again later."}
            </p>
        </div>
    );
}
