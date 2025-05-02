import {StandardDeal} from "@/crms/types";
import {CrmName} from "@/crms/constants";

type CRMStats = {
  source: CrmName;
  count: number;
  commission: number;
};

export function getDashboardStats(deals: StandardDeal[]) {
  const totalCommission = deals.reduce((acc, d) => acc + d.amount * 0.1, 0);
  const totalDeals = deals.length;

  const crmStatsMap = new Map<CrmName, {count: number; commission: number}>();

  for (const deal of deals) {
    const current = crmStatsMap.get(deal.source) ?? {count: 0, commission: 0};

    crmStatsMap.set(deal.source, {
      count: current.count + 1,
      commission: current.commission + deal.amount * 0.1,
    });
  }

  const crmStats: CRMStats[] = Array.from(crmStatsMap, ([source, values]) => ({
    source,
    count: values.count,
    commission: values.commission,
  }));

  return {
    totalCommission,
    totalDeals,
    crmStats,
  };
}
