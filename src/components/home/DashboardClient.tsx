"use client";

import {useEffect, useState} from "react";

import {DashboardMetrics, DealsTable, SkeletonDashboardMetrics} from "./";

import {StandardDeal} from "@/crms/types";
import {importAllCRMs} from "@/app/actions/importsCRMs";
import {getDashboardStats} from "@/lib/getDashboardStats";

export function DashboardClient() {
  const [deals, setDeals] = useState<StandardDeal[]>([]);

  useEffect(() => {
    const loadDeals = async () => {
      try {
        const result = await importAllCRMs();

        setDeals(result);
      } catch (err) {
        console.error("❌ Error importing deals:", err);
      }
    };

    loadDeals();
  }, []);

  const stats = getDashboardStats(deals);

  return (
    <>
      {deals.length === 0 ? <SkeletonDashboardMetrics /> : <DashboardMetrics stats={stats} />}
      <DealsTable deals={deals} />
    </>
  );
}
