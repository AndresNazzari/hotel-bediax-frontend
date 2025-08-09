"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { DestinationsService } from "@/services/destinations";
import { toast } from "sonner";

type Props = {
    destinationId: number;
    destinationName?: string | null;
};

export function DestinationsActions({ destinationId, destinationName }: Props) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        try {
            setIsDeleting(true);
            await DestinationsService.remove(destinationId);
            toast.success("Destination deleted successfully");
            router.refresh();
        } catch {
            toast.error("Could not delete the destination. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                aria-label="Edit"
                onClick={() => router.push(`/destinations/${destinationId}/edit`)}
            >
                <Pencil className="h-4 w-4" />
            </Button>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon" aria-label="Delete">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete destination</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete <b>{destinationName ?? `#${destinationId}`}</b>? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? "Deleting…" : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
