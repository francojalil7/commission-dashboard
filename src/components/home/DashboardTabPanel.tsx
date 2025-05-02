"use client";
import type {SortColumn, SortDirection} from "./";
import type {StandardDeal} from "@/crms/types";

import {RefreshCw} from "lucide-react";
import {useState, useEffect} from "react";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";
import {TabsContent} from "../ui/tabs";

import {DealsTable, PaginationControls} from "./";

import {COMMISSION_PERCENTAGE} from "@/lib/config";

interface DashboardTabPanelProps {
  tabKey: string;
  title: string;
  description: string;
  deals: StandardDeal[];
  loading: boolean;
}
const ITEMS_PER_PAGE = 10;

export function DashboardTabPanel({
  tabKey,
  title,
  description,
  deals,
  loading,
}: DashboardTabPanelProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [sortedDeals, setSortedDeals] = useState<StandardDeal[]>(deals);

  useEffect(() => {
    if (!sortColumn) {
      setSortedDeals([...deals]);

      return;
    }

    const sorted = [...deals].sort((a, b) => {
      const multiplier = sortDirection === "asc" ? 1 : -1;

      switch (sortColumn) {
        case "id":
          return multiplier * a.id.localeCompare(b.id);
        case "amount":
          return multiplier * (a.amount - b.amount);
        case "salesperson":
          return multiplier * a.salesperson.localeCompare(b.salesperson);
        case "date":
          return multiplier * (new Date(a.date).getTime() - new Date(b.date).getTime());
        case "commission":
          return (
            multiplier *
            ((a.amount * COMMISSION_PERCENTAGE) / 100 - (b.amount * COMMISSION_PERCENTAGE) / 100)
          );
        case "source":
          return multiplier * a.source.localeCompare(b.source);
        default:
          return 0;
      }
    });

    setSortedDeals(sorted);
    setCurrentPage(1);
  }, [deals, sortColumn, sortDirection]);

  const handleSort = (column: SortColumn) => {
    const isAsc = sortColumn === column && sortDirection === "asc";
    const direction = isAsc ? "desc" : "asc";

    setSortDirection(direction);
    setSortColumn(column);
  };

  const totalPages = Math.ceil(sortedDeals.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDeals = sortedDeals.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <TabsContent value={tabKey}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <RefreshCw className="text-muted-foreground h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              <DealsTable
                deals={paginatedDeals}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
