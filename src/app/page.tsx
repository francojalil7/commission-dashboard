import {DashboardHeader} from "@/components/home";
import {DashboardManager} from "@/components/home";
import {StandardDeal} from "@/crms/types";
import {prisma} from "@/lib/prisma";

export default async function HomePage() {
  const deals = (await prisma.deal.findMany()) as StandardDeal[];

  return (
    <main className="flex flex-col space-y-6">
      <DashboardHeader />
      <DashboardManager deals={deals} />
    </main>
  );
}
