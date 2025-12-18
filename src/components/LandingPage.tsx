import { useEffect } from "react";
import { Button } from "./ui/button";
import FeatureCarousel from "./FeatureCarousel";

interface LandingPageProps {
  onNavigate: (
    page:
      | "landing"
      | "consultation"
      | "schedule-demo"
      | "privacy"
      | "probate-checklist"
  ) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  useEffect(() => {
    // Clean up any stray Brevo form elements that might appear on the landing page
    const cleanupBrevoElements = () => {
      // Remove any select elements with SMS__COUNTRY_CODE that aren't inside a form
      const countrySelects = document.querySelectorAll(
        'select[name="SMS__COUNTRY_CODE"]'
      );
      countrySelects.forEach((select) => {
        if (!select.closest(".sib-form")) {
          select.remove();
        }
      });

      // Remove any Brevo-related elements that aren't inside a form container
      const brevoElements = document.querySelectorAll(
        ".sib-container, .sib-form-container, .sib-sms-input-wrapper"
      );
      brevoElements.forEach((el) => {
        if (!el.closest(".sib-form")) {
          el.remove();
        }
      });
    };

    // Run cleanup on mount and after a short delay to catch dynamically added elements
    cleanupBrevoElements();
    const timeoutId = setTimeout(cleanupBrevoElements, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToVideo = () => {
    const videoSection = document.getElementById("video-section");
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold text-slate-800">
            HeirFlow
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4">
          <span className="text-blue-600">Guided</span> Probate Management
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          Streamline every step of probate and estate administration with clear
          timelines, smart document recommendations, and built-in education—all
          in one secure platform.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            onClick={scrollToVideo}
          >
            See it in Action
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8"
            onClick={() => onNavigate("probate-checklist")}
          >
            Free Probate Survival Guide
          </Button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="container mx-auto px-4 py-16">
        <FeatureCarousel />
      </section>

      {/* Intake Process Demo Video */}
      <section id="video-section" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              See It In Action
            </h2>
            <p className="text-lg text-slate-600">
              Watch a demo of our Intake process
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200">
            <div className="aspect-video bg-slate-100">
              <iframe
                src="https://www.loom.com/embed/cc4818e32c974bb483150f1af1d7abc1"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
                title="HeirFlow Intake Process Demo"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap mt-8">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              onClick={() => onNavigate("schedule-demo")}
            >
              Contact Sales
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8"
              onClick={() => onNavigate("probate-checklist")}
            >
              Free Probate Survival Guide
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-slate-200">
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-500">
            Secure • Confidential • Professional
          </p>
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
