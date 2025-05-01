export interface StandardDeal {
  id: string;
  amount: number;
  salesperson: string;
  date: string;
  source: string;
}

export interface CRMAdapter {
  name: string;
  load: () => Promise<StandardDeal[]>;
}
