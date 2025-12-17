import { useState } from "react";
import LandingPage from "./components/LandingPage";
import ConsultationPage from "./components/ConsultationPage";
import ScheduleDemoPage from "./components/ScheduleDemoPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "consultation" | "schedule-demo" | "privacy">("landing");

  const handleNavigate = (page: "landing" | "consultation" | "schedule-demo" | "privacy") => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  switch (currentPage) {
    case "consultation":
      return <ConsultationPage onNavigate={handleNavigate} />;
    case "schedule-demo":
      return <ScheduleDemoPage onNavigate={handleNavigate} />;
    case "privacy":
      return <PrivacyPolicyPage onNavigate={handleNavigate} />;
    default:
      return <LandingPage onNavigate={handleNavigate} />;
  }
}

export default App;

