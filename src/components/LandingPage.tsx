import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import FeatureCarousel from "./FeatureCarousel";

interface LandingPageProps {
  onNavigate: (page: "landing" | "consultation" | "schedule-demo" | "privacy") => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold text-slate-800">HeirFlow</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4">
          <span className="text-blue-600">Guided</span> Probate Management
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          Streamline every step of probate and estate administration with clear
          timelines, smart document recommendations, and built-in guidance—all
          in one secure platform.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            onClick={() => onNavigate("consultation")}
          >
            Free Consultation <ArrowRight className="ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8"
            onClick={() => onNavigate("schedule-demo")}
          >
            Schedule Demo
          </Button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="container mx-auto px-4 py-16">
        <FeatureCarousel />
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-slate-200">
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-500">Secure • Confidential • Professional</p>
          <p className="text-xs text-slate-400">
            <button
              onClick={() => onNavigate("privacy")}
              className="hover:text-blue-600 transition-colors underline"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
}

