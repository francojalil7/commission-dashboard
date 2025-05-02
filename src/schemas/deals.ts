import {z} from "zod";

export const dealSchema = z.object({
  id: z.string(),
  amount: z.number(),
  salesperson: z.string(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  source: z.string(),
});

export const dealsArraySchema = z.array(dealSchema);

export type DealInput = z.infer<typeof dealSchema>;
