"use client";

import {DashboardActions, DashboardMetrics, DashboardTabs} from "./";

import {StandardDeal} from "@/crms/types";
import {DealsProvider} from "@/contexts";
interface DashboardManagerProps {
  deals: StandardDeal[];
}

export function DashboardManager({deals}: DashboardManagerProps) {
  return (
    <DealsProvider initialDeals={deals}>
      <DashboardActions />
      <DashboardMetrics />
      <DashboardTabs />
    </DealsProvider>
  );
}
