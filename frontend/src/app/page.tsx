import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DashboardCards from "@/components/DashboardCards";
import UploadBox from "@/components/UploadBox";
import FileInfo from "@/components/FileInfo";
import ColumnMapper from "@/components/ColumnMapper";
import KPISection from "@/components/KPISection";
import RevenueChart from "@/components/RevenueChart";
import LeadGrowthChart from "@/components/LeadGrowthChart";
import ConversionChart from "@/components/ConversionChart";
import StatusPieChart from "@/components/StatusPieChart";
import LeadsTable from "@/components/LeadsTable";
import AllInsights from "@/components/AllInsights";
import AIInsights from "@/components/AIInsights";
import AILeadScore from "@/components/AILeadScore";
import AILeadRanking from "@/components/AILeadRanking";
import AIDataQuality from "@/components/AIDataQuality";
import AISmartRecommendations from "@/components/AISmartRecommendations";
import AICSVSummary from "@/components/AICSVSummary";
import AIDuplicateDetection from "@/components/AIDuplicateDetection";
import AIPredictiveAnalytics from "@/components/AIPredictiveAnalytics";
import AIChatAssistant from "@/components/AIChatAssistant";
import AIExportReport from "@/components/AIExportReport";
import AIDashboardSettings from "@/components/AIDashboardSettings";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <section className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="space-y-8 p-8">
          <section id="dashboard">
            <DashboardCards />
          </section>

          <section id="upload">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <UploadBox />
              <FileInfo />
            </div>

            <ColumnMapper />
          </section>

          <section id="analytics">
            <KPISection />
          </section>

          <section id="charts">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <RevenueChart />
              <LeadGrowthChart />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <ConversionChart />
              <StatusPieChart />
            </div>
          </section>

          <section id="leads">
            <LeadsTable />
          </section>

          <section id="insights">
            <AllInsights />
          </section>

          <section id="ai-insights">
            <AIInsights />
          </section>

          <section id="ai-lead-score">
            <AILeadScore />
          </section>

          <section id="ai-lead-ranking">
            <AILeadRanking />
          </section>

          <section id="ai-data-quality">
            <AIDataQuality />
          </section>

          <section id="ai-smart-recommendations">
            <AISmartRecommendations />
          </section>

          <section id="ai-csv-summary">
            <AICSVSummary />
          </section>

          <section id="ai-duplicate-detection">
            <AIDuplicateDetection />
          </section>

          <section id="ai-predictive-analytics">
            <AIPredictiveAnalytics />
          </section>

          <section id="ai-chat-assistant">
            <AIChatAssistant />
          </section>

          <section id="export">
            <AIExportReport />
          </section>

          <section id="ai-dashboard-settings">
            <AIDashboardSettings />
          </section>
        </div>
      </section>
    </main>
  );
}