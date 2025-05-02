"use client";
import type {StandardDeal} from "@/crms/types";

import {ArrowDown, ArrowUp, ArrowUpDown} from "lucide-react";

import {Badge} from "../ui/badge";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table";
import {Button} from "../ui/button";

import {CRM_NAMES} from "@/crms/constants";
import {COMMISSION_PERCENTAGE} from "@/lib/config";

export type SortColumn = "id" | "amount" | "salesperson" | "date" | "commission" | "source";

export type SortDirection = "asc" | "desc";

interface DealsTableProps {
  deals: StandardDeal[];
  sortColumn?: SortColumn | null;
  sortDirection?: SortDirection;
  onSort?: (column: SortColumn) => void;
}

export function DealsTable({
  deals,
  sortColumn = null,
  sortDirection = "asc",
  onSort,
}: DealsTableProps) {
  const getSortIcon = (column: SortColumn) => {
    if (!onSort) return null;

    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }

    return sortDirection === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  const renderTableHeader = (label: string, column: SortColumn) => {
    if (!onSort) {
      return <TableHead>{label}</TableHead>;
    }

    return (
      <TableHead>
        <Button
          className="flex h-8 items-center px-2 text-left font-medium"
          variant="ghost"
          onClick={() => onSort(column)}
        >
          {label} {getSortIcon(column)}
        </Button>
      </TableHead>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {renderTableHeader("ID", "id")}
            {renderTableHeader("Monto", "amount")}
            {renderTableHeader("Vendedor", "salesperson")}
            {renderTableHeader("Fecha", "date")}
            {renderTableHeader("Comisión (10%)", "commission")}
            {renderTableHeader("Origen", "source")}
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
                  ${((deal.amount * COMMISSION_PERCENTAGE) / 100).toFixed(2)}
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
