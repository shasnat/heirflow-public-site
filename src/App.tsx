import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import ConsultationPage from "./components/ConsultationPage";
import ScheduleDemoPage from "./components/ScheduleDemoPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import ProbateChecklistPage from "./components/ProbateChecklistPage";
import TeamPage from "./components/TeamPage";
import LimitedTimeEventPage from "./components/LimitedTimeEventPage";
import Ad020LandingPage from "./components/Ad020LandingPage";
import Ad020ScheduleDemoPage from "./components/Ad020ScheduleDemoPage";
import Ad020V2LandingPage from "./components/Ad020V2LandingPage";
import Ad020V2ScheduleDemoPage from "./components/Ad020V2ScheduleDemoPage";
import Ad020V3LandingPage from "./components/Ad020V3LandingPage";
import Ad020V3LeadFormPage from "./components/Ad020V3LeadFormPage";
import { trackPageView } from "./lib/metaPixel";

type PageType =
  | "landing"
  | "consultation"
  | "schedule-demo"
  | "privacy"
  | "probate-checklist"
  | "team"
  | "limited-time-event"
  | "ad-020-landing"
  | "ad-020-schedule-demo"
  | "ad-020-v2-landing"
  | "ad-020-v2-schedule-demo"
  | "ad-020-v3-landing"
  | "ad-020-v3-schedule-demo";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasTrackedInitialRouteRef = useRef(false);

  const pageToPath: Record<PageType, string> = {
    landing: "/",
    consultation: "/consultation",
    "schedule-demo": "/schedule-demo",
    privacy: "/privacy",
    "probate-checklist": "/probate-checklist",
    team: "/team",
    "limited-time-event": "/limited-time-event",
    "ad-020-landing": "/lp/020-probate-help",
    "ad-020-schedule-demo": "/lp/020-probate-help/schedule-demo",
    "ad-020-v2-landing": "/lp/020-probate-help/v2",
    "ad-020-v2-schedule-demo": "/lp/020-probate-help/v2/schedule-demo",
    "ad-020-v3-landing": "/lp/020-probate-help/v3",
    "ad-020-v3-schedule-demo": "/lp/020-probate-help/v3/schedule-demo",
  };

  const handleNavigate = (page: PageType) => {
    navigate(pageToPath[page]);
    window.scrollTo(0, 0);
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Track page views for client-side route transitions.
  useEffect(() => {
    if (!hasTrackedInitialRouteRef.current) {
      hasTrackedInitialRouteRef.current = true;
      return;
    }
    trackPageView();
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
        <Route path="/limited-time-event" element={<LimitedTimeEventPage onNavigate={handleNavigate} />} />
        <Route path="/lp/020-probate-help" element={<Ad020LandingPage onNavigate={handleNavigate} />} />
        <Route path="/lp/020-probate-help/schedule-demo" element={<Ad020ScheduleDemoPage onNavigate={handleNavigate} />} />
        <Route path="/lp/020-probate-help/v2" element={<Ad020V2LandingPage onNavigate={handleNavigate} />} />
        <Route path="/lp/020-probate-help/v2/schedule-demo" element={<Ad020V2ScheduleDemoPage onNavigate={handleNavigate} />} />
        <Route path="/lp/020-probate-help/v3" element={<Ad020V3LandingPage onNavigate={handleNavigate} />} />
        <Route path="/lp/020-probate-help/v3/schedule-demo" element={<Ad020V3LeadFormPage onNavigate={handleNavigate} />} />
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

