"use client";
import {useEffect} from "react";

import {Tabs, TabsList, TabsTrigger} from "../ui/tabs";

import {DashboardTabPanel} from ".";

import {StandardDeal} from "@/crms/types";
import {useDealsContext} from "@/contexts";

export function DashboardTabs() {
  const {deals, loading, fetchDealsFromDb} = useDealsContext();
  const crmSources = Array.from(new Set(deals.map((d) => d.source)));

  const CRM_TABS = [
    {
      key: "all",
      title: "Todos los CRMs",
      description: "Visualización combinada de todos los deals transformados a formato estándar",
      filterFn: () => true,
    },
    ...crmSources.map((source) => ({
      key: source,
      title: source,
      description: `Transformación de datos del ${source}`,
      filterFn: (deal: StandardDeal) => deal.source === source,
    })),
  ];

  useEffect(() => {
    if (deals.length === 0) {
      fetchDealsFromDb();
    }
  }, []);

  return (
    <Tabs className="w-full" defaultValue="all">
      <TabsList className="flex w-full flex-wrap justify-center gap-2">
        {CRM_TABS.map((tab) => (
          <TabsTrigger key={tab.key} value={tab.key}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {CRM_TABS.map((tab) => (
        <DashboardTabPanel
          key={tab.key}
          deals={deals.filter(tab.filterFn)}
          description={tab.description}
          loading={loading}
          tabKey={tab.key}
          title={tab.title}
        />
      ))}
    </Tabs>
  );
}
