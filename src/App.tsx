import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { ChecklistPage } from "./pages/ChecklistPage";
import { DashboardPage } from "./pages/DashboardPage";
import { GuidePage } from "./pages/GuidePage";
import { SourcesPage } from "./pages/SourcesPage";
import { useGlobalEffects } from "./lib/useThemeEffects";
import { useProgress } from "./store/progress";

function Home() {
  const chapter = useProgress((s) => s.data.chapter);
  return <Navigate to={`/guide/${chapter}`} replace />;
}

export function App() {
  useGlobalEffects();
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide/:chapter?/:entry?" element={<GuidePage />} />
          <Route path="/checklist/:category?/:chapter?" element={<ChecklistPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/sources" element={<SourcesPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
