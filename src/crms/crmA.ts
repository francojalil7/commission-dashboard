import {z} from "zod";

import {CRMAdapter, StandardDeal} from "./types";
import {CRM_NAMES} from "./constants";

import {BASE_URL} from "@/lib/config";

const schema = z.array(
  z.object({
    deal_id: z.string(),
    rep_name: z.string(),
    total: z.number().optional(),
    amount: z.number().optional(),
    sold_at: z.string().optional(),
    created_on: z.string().optional(),
  }),
);

export const CRM_A: CRMAdapter = {
  name: CRM_NAMES.A,
  load: async () => {
    const res = await fetch(`${BASE_URL}/api/crm-a`);
    const data = await res.json();
    const validated = schema.parse(data);

    type CrmARawDeal = z.infer<typeof schema>[number];

    return validated.map<StandardDeal>((item: CrmARawDeal) => ({
      id: item.deal_id,
      amount: item.total ?? item.amount ?? 0,
      salesperson: item.rep_name,
      date: item.sold_at ?? item.created_on ?? new Date().toISOString(),
      source: CRM_NAMES.A,
    }));
  },
};
