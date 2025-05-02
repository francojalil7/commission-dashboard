import {RefreshCw} from "lucide-react";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs";

import {DealsTable} from ".";

import {StandardDeal} from "@/crms/types";
import {CRM_NAMES} from "@/crms/constants";

interface DashboardTabsProps {
  deals: StandardDeal[];
  loading: boolean;
}

const CRM_TABS = [
  {
    key: "all",
    title: "Todos los CRMs",
    description: "Visualización combinada de todos los deals transformados a formato estándar",
    filterFn: () => true,
  },
  {
    key: CRM_NAMES.A,
    title: CRM_NAMES.A,
    description: `Transformación de datos del ${CRM_NAMES.A}`,
    filterFn: (deal: StandardDeal) => deal.source === CRM_NAMES.A,
  },
  {
    key: CRM_NAMES.B,
    title: CRM_NAMES.B,
    description: `Transformación de datos del ${CRM_NAMES.B}`,
    filterFn: (deal: StandardDeal) => deal.source === CRM_NAMES.B,
  },
];

export function DashboardTabs({deals, loading}: DashboardTabsProps) {
  return (
    <Tabs className="w-full" defaultValue="all">
      <TabsList className={`grid w-full grid-cols-${CRM_TABS.length}`}>
        {CRM_TABS.map((tab) => (
          <TabsTrigger key={tab.key} value={tab.key}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {CRM_TABS.map((tab) => (
        <TabsContent key={tab.key} value={tab.key}>
          <Card>
            <CardHeader>
              <CardTitle>{tab.title}</CardTitle>
              <CardDescription>{tab.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <RefreshCw className="text-muted-foreground h-8 w-8 animate-spin" />
                </div>
              ) : (
                <DealsTable deals={deals.filter(tab.filterFn)} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
