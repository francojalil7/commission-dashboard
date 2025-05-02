"use client";
import {RefreshCw} from "lucide-react";
import {useMemo, useState} from "react";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";
import {TabsContent} from "../ui/tabs";

import {DealsTable, PaginationControls} from "./";

import {StandardDeal} from "@/crms/types";

interface DashboardTabPanelProps {
  tabKey: string;
  title: string;
  description: string;
  deals: StandardDeal[];
  loading: boolean;
}

export function DashboardTabPanel({
  tabKey,
  title,
  description,
  deals,
  loading,
}: DashboardTabPanelProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const totalPages = Math.ceil(deals.length / pageSize);
  const paginatedDeals = useMemo(() => {
    const start = (currentPage - 1) * pageSize;

    return deals.slice(start, start + pageSize);
  }, [deals, currentPage]);

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
              <DealsTable deals={paginatedDeals} />
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
