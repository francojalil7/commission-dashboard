import {DashboardHeader} from "@/components/home";
import {DashboardClient} from "@/components/home/DashboardClient";

export default async function HomePage() {
  return (
    <main className="flex flex-col space-y-6">
      <DashboardHeader />
      <DashboardClient />
    </main>
  );
}
