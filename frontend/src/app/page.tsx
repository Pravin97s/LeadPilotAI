import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DashboardCards from "@/components/DashboardCards";
import UploadBox from "@/components/UploadBox";
import FileInfo from "@/components/FileInfo";
import KPISection from "@/components/KPISection";
import RevenueChart from "@/components/RevenueChart";
import LeadGrowthChart from "@/components/LeadGrowthChart";
import ConversionChart from "@/components/ConversionChart";
import StatusPieChart from "@/components/StatusPieChart";
import LeadsTable from "@/components/LeadsTable";
import AllInsights from "@/components/AllInsights";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <section className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="p-8 space-y-8">
          <DashboardCards />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <UploadBox />
            <FileInfo />
          </div>

          <KPISection />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RevenueChart />
            <LeadGrowthChart />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ConversionChart />
            <StatusPieChart />
          </div>

          <LeadsTable />

          <AllInsights />
        </div>
      </section>
    </main>
  );
}