import {DashboardHeader} from "@/components/home";
import {DashboardManager} from "@/components/home";

export default async function HomePage() {
  return (
    <main className="flex flex-col space-y-6">
      <DashboardHeader />
      <DashboardManager />
    </main>
  );
}
