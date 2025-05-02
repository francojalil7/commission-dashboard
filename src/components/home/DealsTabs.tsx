import {RefreshCw} from "lucide-react";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs";

import {DealsTable} from "./";

import {StandardDeal} from "@/crms/types";
import {CRM_NAMES} from "@/crms/constants";

interface DashboardTableProps {
  deals: StandardDeal[];
}

export function DashboardTable({deals}: DashboardTableProps) {
  const loading = false;

  return (
    <Tabs className="w-full" defaultValue="all">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">Todos los CRMs</TabsTrigger>
        <TabsTrigger value="crm-a">CRM A (JSON)</TabsTrigger>
        <TabsTrigger value="crm-b">CRM B (CSV)</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>Todos los Deals Estandarizados</CardTitle>
            <CardDescription>
              Visualización combinada de todos los deals transformados a formato estándar
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="text-muted-foreground h-8 w-8 animate-spin" />
              </div>
            ) : (
              <DealsTable deals={deals} />
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="crm-a">
        <Card>
          <CardHeader>
            <CardTitle>CRM A - Datos JSON</CardTitle>
            <CardDescription>Transformación de datos del CRM A (formato JSON)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-md bg-slate-50 p-4 dark:bg-slate-900">
              <h3 className="mb-2 font-medium">Datos originales:</h3>
            </div>
            {loading ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="text-muted-foreground h-8 w-8 animate-spin" />
              </div>
            ) : (
              <DealsTable deals={deals.filter((deal) => deal.source === CRM_NAMES.A)} />
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="crm-b">
        <Card>
          <CardHeader>
            <CardTitle>CRM B - Datos CSV</CardTitle>
            <CardDescription>Transformación de datos del CRM B (formato CSV)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-md bg-slate-50 p-4 dark:bg-slate-900">
              <h3 className="mb-2 font-medium">Datos originales:</h3>
            </div>
            {loading ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="text-muted-foreground h-8 w-8 animate-spin" />
              </div>
            ) : (
              <DealsTable deals={deals.filter((deal) => deal.source === CRM_NAMES.B)} />
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
