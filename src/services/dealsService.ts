import {CRM_ADAPTERS} from "@/crms";
import {StandardDeal} from "@/crms/types";

export async function importCRMByName(name: string): Promise<StandardDeal[]> {
  const adapter = CRM_ADAPTERS.find((c) => c.name === name);

  if (!adapter) throw new Error(`CRM adapter for '${name}' not found`);

  return adapter.load();
}

export async function fetchDeals(): Promise<StandardDeal[]> {
  try {
    const res = await fetch("/api/deals");

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data: StandardDeal[] = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching deals:", error);
    throw error;
  }
}

export async function postDeals(deals: StandardDeal[]): Promise<void> {
  const res = await fetch("/api/deals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deals),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(`POST failed: ${res.status} - ${error?.error || "Unknown error"}`);
  }
}
