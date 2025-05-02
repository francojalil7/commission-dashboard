"use client";

import {DashboardActions, DashboardMetrics, DashboardTabs} from "./";

import {DealsProvider} from "@/contexts";

export function DashboardManager() {
  return (
    <DealsProvider>
      <DashboardActions />
      <DashboardMetrics />
      <DashboardTabs />
    </DealsProvider>
  );
}
