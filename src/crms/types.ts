import {CrmName} from "./constants";

export interface StandardDeal {
  id: string;
  amount: number;
  salesperson: string;
  date: string | Date;
  source: CrmName;
}

export interface CRMAdapter {
  name: CrmName;
  load: () => Promise<StandardDeal[]>;
}
