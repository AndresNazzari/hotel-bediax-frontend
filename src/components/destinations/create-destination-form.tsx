"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { CountryDto, DestinationTypeDto } from "@/types/api";
import { DestinationsService } from "@/services/destinations";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CreateDestinationFormData = {
    name: string;
    description?: string;
    countryId: number | "";
    destinationTypeId: number | "";
};

type Props = {
    countries: CountryDto[];
    destinationTypes: DestinationTypeDto[];
};

export function CreateDestinationForm({ countries, destinationTypes }: Props) {
    const router = useRouter();

    const form = useForm<CreateDestinationFormData>({
        defaultValues: { name: "", description: "", countryId: "", destinationTypeId: "" },
        mode: "onTouched",
    });

    async function onSubmit(values: CreateDestinationFormData) {
        if (values.countryId === "" || values.destinationTypeId === "") {
            form.setError("countryId", { type: "required", message: "Country is required" }, { shouldFocus: true });
            form.setError("destinationTypeId", { type: "required", message: "Destination type is required" });
            return;
        }

        try {
            await DestinationsService.create({
                name: values.name.trim(),
                description: values.description?.trim() ?? "",
                countryId: Number(values.countryId),
                destinationTypeId: Number(values.destinationTypeId),
            });

            toast.success("Destination created successfully");

            router.push("/destinations");
        } catch (error) {
            console.error("Error creating destination", error);
            toast.error("Could not create the destination. Please try again.");
        }
    }

    return (
        <div className="flex justify-center py-10">
            <Card className="w-1/2 max-w-2xl">
                <CardHeader>
                    <CardTitle>Create Destination</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                            <Input placeholder="e.g., Playa Blanca Resort" {...field} />
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
                                            <Textarea placeholder="Short description (max. 500)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
                                            >
                                                <SelectTrigger className="w-[220px]">
                                                    <SelectValue placeholder="Select a country" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {countries.map((country) => (
                                                        <SelectItem key={country.id} value={String(country.id)}>
                                                            {country.name ?? `#${country.id}`}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="destinationTypeId"
                                rules={{ required: "Destination type is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Destination type</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value === "" ? "" : String(field.value)}
                                                onValueChange={(val) => field.onChange(val === "" ? "" : Number(val))}
                                            >
                                                <SelectTrigger className="w-[220px]">
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {destinationTypes.map((destinationType) => (
                                                        <SelectItem key={destinationType.id} value={String(destinationType.id)}>
                                                            {destinationType.name ?? `#${destinationType.id}`}
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
                                <Button type="submit">Save</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
