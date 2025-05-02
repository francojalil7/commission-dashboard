import {StandardDeal} from "@/crms/types";
import {CrmName} from "@/crms/constants";

type CRMStats = {
  source: CrmName;
  count: number;
};

export function getDashboardStats(deals: StandardDeal[]) {
  const totalCommission = deals.reduce((acc, d) => acc + d.amount * 0.1, 0);
  const totalDeals = deals.length;

  const crmStatsMap = new Map<CrmName, number>();

  for (const deal of deals) {
    crmStatsMap.set(deal.source, (crmStatsMap.get(deal.source) ?? 0) + 1);
  }

  const crmStats: CRMStats[] = Array.from(crmStatsMap, ([source, count]) => ({
    source,
    count,
  }));

  return {
    totalCommission,
    totalDeals,
    crmStats,
  };
}
