"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CountryDto, DestinationTypeDto } from "@/types/api";

// Internal form state (allows "" for selects until the user chooses)
type DestinationFormData = {
    name: string;
    description?: string;
    countryId: number | "";
    destinationTypeId: number | "";
};

export type DestinationPersistData = {
    name: string;
    description?: string;
    countryId: number;
    destinationTypeId: number;
    isActive?: boolean;
};

type Props = {
    title: string;
    initialValues?: Partial<DestinationPersistData>;
    countries: CountryDto[];
    destinationTypes: DestinationTypeDto[];
    mode: "create" | "edit" | "view";
    onSubmit?: (data: DestinationPersistData) => Promise<void> | void;
};

export function DestinationForm({
                                    title,
                                    initialValues,
                                    countries,
                                    destinationTypes,
                                    mode,
                                    onSubmit,
                                }: Props) {
    const router = useRouter();
    const [isReadOnly, setIsReadOnly] = useState(mode === "view");

    const form = useForm<DestinationFormData>({
        defaultValues: {
            name: initialValues?.name ?? "",
            description: initialValues?.description ?? "",
            countryId: (initialValues?.countryId as number | undefined) ?? "",
            destinationTypeId: (initialValues?.destinationTypeId as number | undefined) ?? "",
        },
        mode: "onTouched",
    });

    async function handleSubmit(values: DestinationFormData) {
        if (!onSubmit) return;

        if (values.countryId === "" || values.destinationTypeId === "") {
            form.setError("countryId", { type: "required", message: "Country is required" });
            form.setError("destinationTypeId", { type: "required", message: "Type is required" });
            return;
        }

        const payload: DestinationPersistData = {
            name: values.name.trim(),
            description: values.description?.trim() ?? "",
            countryId: Number(values.countryId),
            destinationTypeId: Number(values.destinationTypeId),
        };

        await onSubmit(payload);
    }

    return (
        <div className="flex justify-center py-10">
            <Card className="w-1/2 max-w-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{title}</CardTitle>

                    {mode === "view" && (
                        <Button variant="secondary" onClick={() => setIsReadOnly(v => !v)}>
                            {isReadOnly ? "Enable editing" : "Lock editing"}
                        </Button>
                    )}
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                rules={{
                                    required: "Name is required",
                                    minLength: { value: 2, message: "Minimum 2 characters" },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Playa Blanca Resort" {...field} disabled={isReadOnly} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Short description (max. 500)" {...field} disabled={isReadOnly} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Country */}
                            <FormField
                                control={form.control}
                                name="countryId"
                                rules={{ required: "Country is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value === "" ? "" : String(field.value)}
                                                onValueChange={(val) => field.onChange(val === "" ? "" : Number(val))}
                                                disabled={isReadOnly}
                                            >
                                                <SelectTrigger className="w-[220px]">
                                                    <SelectValue placeholder="Select a country" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {countries.map((c) => (
                                                        <SelectItem key={c.id} value={String(c.id)}>
                                                            {c.name ?? `#${c.id}`}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Destination type */}
                            <FormField
                                control={form.control}
                                name="destinationTypeId"
                                rules={{ required: "Type is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Destination type</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value === "" ? "" : String(field.value)}
                                                onValueChange={(val) => field.onChange(val === "" ? "" : Number(val))}
                                                disabled={isReadOnly}
                                            >
                                                <SelectTrigger className="w-[220px]">
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {destinationTypes.map((t) => (
                                                        <SelectItem key={t.id} value={String(t.id)}>
                                                            {t.name ?? `#${t.id}`}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-2">
                                {mode !== "view" && (
                                    <Button type="submit" className="cursor-pointer">
                                        {mode === "create" ? "Create" : "Save changes"}
                                    </Button>
                                )}

                                {mode === "view" && !isReadOnly && (
                                    <Button type="submit" className="cursor-pointer">Save changes</Button>
                                )}

                                <Button type="button" className="cursor-pointer" variant="outline" onClick={() => router.back()}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
