import { useState } from "react";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import ConsultationPage from "./components/ConsultationPage";
import ScheduleDemoPage from "./components/ScheduleDemoPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import ProbateChecklistPage from "./components/ProbateChecklistPage";
import TeamPage from "./components/TeamPage";

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "consultation" | "schedule-demo" | "privacy" | "probate-checklist" | "team">("landing");

  const handleNavigate = (page: "landing" | "consultation" | "schedule-demo" | "privacy" | "probate-checklist" | "team") => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
      {currentPage === "consultation" && <ConsultationPage onNavigate={handleNavigate} />}
      {currentPage === "schedule-demo" && <ScheduleDemoPage onNavigate={handleNavigate} />}
      {currentPage === "privacy" && <PrivacyPolicyPage onNavigate={handleNavigate} />}
      {currentPage === "probate-checklist" && <ProbateChecklistPage onNavigate={handleNavigate} />}
      {currentPage === "team" && <TeamPage onNavigate={handleNavigate} />}
      {currentPage === "landing" && <LandingPage onNavigate={handleNavigate} />}
    </>
  );
}

export default App;

