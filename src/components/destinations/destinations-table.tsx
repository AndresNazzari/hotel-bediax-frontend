import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableHeader,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { DestinationDto } from "@/types/api";
import { DestinationsActions } from "@/components/destinations/destinations-actions";

type Props = { items: DestinationDto[] };

export function DestinationsTable({ items }: Props) {
    return (
        <Card className="overflow-hidden border-muted/50 bg-muted/20">
            <Table className="table-fixed">
                <colgroup>
                    <col className="w-20" />
                    <col className="w-64" />
                    <col className="w-[420px]" />
                    <col className="w-48" />
                    <col className="w-48" />
                    <col className="w-28" />
                    <col className="w-32" />
                </colgroup>

                <TableHeader className="bg-muted/30">
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {items.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                                No destinations to display.
                            </TableCell>
                        </TableRow>
                    ) : (
                        items.map((d) => (
                            <TableRow key={d.id}>
                                <TableCell>{d.id}</TableCell>
                                <TableCell className="truncate">{d.name ?? "-"}</TableCell>
                                <TableCell className="truncate">{d.description ?? "-"}</TableCell>
                                <TableCell className="truncate">{d.country ?? "-"}</TableCell>
                                <TableCell className="truncate">{d.destinationType ?? "-"}</TableCell>
                                <TableCell>
                                    {d.isActive ? <Badge>Active</Badge> : <Badge variant="secondary">Inactive</Badge>}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DestinationsActions destinationId={d.id} destinationName={d.name} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}
