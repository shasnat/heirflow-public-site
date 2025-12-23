import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import ConsultationPage from "./components/ConsultationPage";
import ScheduleDemoPage from "./components/ScheduleDemoPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import ProbateChecklistPage from "./components/ProbateChecklistPage";
import TeamPage from "./components/TeamPage";

type PageType = "landing" | "consultation" | "schedule-demo" | "privacy" | "probate-checklist" | "team";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const pageToPath: Record<PageType, string> = {
    landing: "/",
    consultation: "/consultation",
    "schedule-demo": "/schedule-demo",
    privacy: "/privacy",
    "probate-checklist": "/probate-checklist",
    team: "/team",
  };

  const handleNavigate = (page: PageType) => {
    navigate(pageToPath[page]);
    window.scrollTo(0, 0);
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navigation onNavigate={handleNavigate} />
      <Routes>
        <Route path="/" element={<LandingPage onNavigate={handleNavigate} />} />
        <Route path="/consultation" element={<ConsultationPage onNavigate={handleNavigate} />} />
        <Route path="/schedule-demo" element={<ScheduleDemoPage onNavigate={handleNavigate} />} />
        <Route path="/privacy" element={<PrivacyPolicyPage onNavigate={handleNavigate} />} />
        <Route path="/probate-checklist" element={<ProbateChecklistPage onNavigate={handleNavigate} />} />
        <Route path="/team" element={<TeamPage onNavigate={handleNavigate} />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

