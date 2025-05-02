"use client";

import {createContext, useContext, useState} from "react";
import {toast} from "sonner";

import {fetchDeals, postDeals} from "@/services/dealsService";
import {StandardDeal} from "@/crms/types";
import {CRM_ADAPTERS} from "@/crms";

interface DealsContextValue {
  deals: StandardDeal[];
  loading: boolean;
  fetchDealsFromDb: () => Promise<void>;
  syncAllFromCrms: () => Promise<void>;
}

const DealsContext = createContext<DealsContextValue | undefined>(undefined);

export function DealsProvider({children}: {children: React.ReactNode}) {
  const [deals, setDeals] = useState<StandardDeal[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDealsFromDb = async () => {
    setLoading(true);
    try {
      const data = await fetchDeals();

      setDeals(data);
    } catch (err) {
      console.error("Error fetching deals from DB", err);
    } finally {
      setLoading(false);
    }
  };

  const syncAllFromCrms = async () => {
    const toastId = toast.loading("Importando datos de todos los CRMs...");

    setLoading(true);
    try {
      const allDeals = (await Promise.all(CRM_ADAPTERS.map((adapter) => adapter.load()))).flat();

      await postDeals(allDeals);
      await fetchDealsFromDb();

      toast.success("Importación completa de todos los CRMs ✅", {id: toastId});
    } catch (err) {
      console.error("Error syncing CRMs", err);
      toast.error("Ocurrió un error al importar los CRMs", {id: toastId});
    } finally {
      setLoading(false);
    }
  };

  return (
    <DealsContext.Provider value={{deals, loading, fetchDealsFromDb, syncAllFromCrms}}>
      {children}
    </DealsContext.Provider>
  );
}

export const useDealsContext = () => {
  const context = useContext(DealsContext);

  if (!context) throw new Error("useDealsContext must be used within DealsProvider");

  return context;
};
