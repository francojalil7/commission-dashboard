import {DollarSign, ArrowDownUp, FileJson, FileSpreadsheet} from "lucide-react";

import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";

import {SkeletonDashboardMetrics} from "./SkeletonDashboardMetrics";

import {CRM_NAMES} from "@/crms/constants";
import {useDealsContext} from "@/contexts";
import {getDashboardStats} from "@/lib/getDashboardStats";

export function DashboardMetrics() {
  const {deals, loading} = useDealsContext();

  const stats = getDashboardStats(deals);

  if (loading) {
    return <SkeletonDashboardMetrics />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="gap-2 py-4">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <DollarSign className="h-4 w-4 text-emerald-500" />
          <CardTitle className="text-sm font-medium">Total Comisiones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalCommission.toFixed(2)}</div>
          <p className="text-muted-foreground text-xs">10% del valor de cada deal</p>
        </CardContent>
      </Card>

      <Card className="gap-2 py-4">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <ArrowDownUp className="h-4 w-4 text-blue-500" />
          <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalDeals}</div>
          <p className="text-muted-foreground text-xs">De todos los CRMs</p>
        </CardContent>
      </Card>
      {stats.crmStats.map((crmStat) => (
        <Card key={crmStat.source} className="gap-2 py-4">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            {crmStat.source === CRM_NAMES.A ? (
              <FileJson className="h-4 w-4 text-orange-500" />
            ) : (
              <FileSpreadsheet className="h-4 w-4 text-purple-500" />
            )}
            <CardTitle className="text-sm font-medium">{crmStat.source} Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${crmStat.commission.toFixed(2)}
              <p className="text-muted-foreground text-xs">Cantidad: {crmStat.count}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
