import {z} from "zod";

import {CRMAdapter, StandardDeal} from "./types";
import {CRM_NAMES} from "./constants";

import {BASE_URL} from "@/lib/config";

const rawDealSchema = z.object({
  opportunity_id: z.string(),
  amount: z.coerce.number(),
  seller: z.string(),
  deal_date: z.string(),
});

const schema = z.array(rawDealSchema);

type CrmBRawDeal = z.infer<typeof rawDealSchema>;

function parseCSV(csv: string): Record<string, string>[] {
  const [headerLine, ...lines] = csv.trim().split("\n");
  const headers = headerLine.split(",");

  return lines.map((line) => {
    const values = line.split(",");

    return Object.fromEntries(headers.map((key, i) => [key, values[i]]));
  });
}

export const CRM_B: CRMAdapter = {
  name: CRM_NAMES.B,
  load: async () => {
    const res = await fetch(`${BASE_URL}/api/crm-b`);
    const csv = await res.text();

    const parsed = parseCSV(csv);
    const validated = schema.parse(parsed);

    return validated.map<StandardDeal>((item: CrmBRawDeal) => ({
      id: item.opportunity_id,
      amount: item.amount,
      salesperson: item.seller,
      date: new Date(item.deal_date).toISOString(),
      source: CRM_NAMES.B,
    }));
  },
};
