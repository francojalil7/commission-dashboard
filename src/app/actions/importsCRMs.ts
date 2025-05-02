"use server";

import {CRM_ADAPTERS} from "@/crms";
import {CrmName} from "@/crms/constants";
import {StandardDeal} from "@/crms/types";

export async function importCRM(name: CrmName): Promise<StandardDeal[]> {
  const adapter = CRM_ADAPTERS.find((a) => a.name === name);

  if (!adapter) throw new Error(`CRM "${name}" not found`);

  return await adapter.load();
}

export async function importAllCRMs(): Promise<StandardDeal[]> {
  const results = await Promise.all(CRM_ADAPTERS.map((adapter) => adapter.load()));

  return results.flat();
}
