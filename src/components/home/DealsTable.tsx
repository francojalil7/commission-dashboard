import {Badge} from "../ui/badge";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table";

import {StandardDeal} from "@/crms/types";
import {CRM_NAMES} from "@/crms/constants";
import {COMMISSION_PERCENTAGE} from "@/lib/config";

export function DealsTable({deals}: {deals: StandardDeal[]}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Vendedor</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Comisión (10%)</TableHead>
            <TableHead>Origen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.length === 0 ? (
            <TableRow>
              <TableCell className="h-36 text-center" colSpan={6}>
                No hay datos disponibles
              </TableCell>
            </TableRow>
          ) : (
            deals.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium">{deal.id}</TableCell>
                <TableCell>${deal.amount.toFixed(2)}</TableCell>
                <TableCell>{deal.salesperson}</TableCell>
                <TableCell>{new Date(deal.date).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium text-emerald-600">
                  ${(deal.amount * COMMISSION_PERCENTAGE) / 100}
                </TableCell>
                <TableCell>
                  <Badge
                    className={deal.source === CRM_NAMES.A ? "bg-orange-400" : "bg-purple-400"}
                    variant="outline"
                  >
                    {deal.source}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
