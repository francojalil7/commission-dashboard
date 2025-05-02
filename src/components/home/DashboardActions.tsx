import {RefreshCw, Upload} from "lucide-react";
import {toast} from "sonner";

import {Button} from "../ui/button";

import {StandardDeal} from "@/crms/types";
import {useDealsContext} from "@/contexts";
import {importCRMByName, postDeals} from "@/services";

export function DashboardActions() {
  const {deals, fetchDealsFromDb, syncAllFromCrms} = useDealsContext();

  const crmSources = Array.from(new Set(deals.map((d) => d.source)));

  const CRM_Buttons = [
    ...crmSources.map((source) => ({
      key: source,
      title: source,
      description: `Transformación de datos del ${source}`,
      filterFn: (deal: StandardDeal) => deal.source === source,
    })),
  ];
  const handleImportCRM = async (crmName: string) => {
    const toastId = toast.loading(`Importando datos de ${crmName}...`);

    try {
      const importedDeals = await importCRMByName(crmName);

      await postDeals(importedDeals);
      await fetchDealsFromDb();

      toast.success(`Importación exitosa de ${crmName}`, {id: toastId});
    } catch (error) {
      toast.error(`Error al importar ${crmName}`, {id: toastId});
      console.error(error);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="outline" onClick={() => syncAllFromCrms()}>
        <RefreshCw className="mr-2 h-4 w-4" />
        Actualizar datos
      </Button>
      {CRM_Buttons.map((button) => (
        <Button
          key={button.key}
          size="sm"
          variant="outline"
          onClick={() => handleImportCRM(button.key)}
        >
          <Upload className="mr-2 h-4 w-4" />
          Importar {button.title}
        </Button>
      ))}
    </div>
  );
}
