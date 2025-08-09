import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import * as React from "react";

type Column<T> = {
    header: string;
    accessor: (row: T) => React.ReactNode;
};

type Props<T> = {
    columns: Column<T>[];
    data: T[];
};

export function CatalogTable<T>({ columns, data }: Props<T>) {
    return (
        <Card className="overflow-hidden border-muted/50 bg-muted/20">
            <Table>
                <TableHeader className="bg-muted/30">
                    <TableRow>
                        {columns.map((col, i) => (
                            <TableHead key={i}>{col.header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center text-muted-foreground">
                                No records found
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row, idx) => (
                            <TableRow key={idx}>
                                {columns.map((col, i) => (
                                    <TableCell key={i}>{col.accessor(row)}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}
