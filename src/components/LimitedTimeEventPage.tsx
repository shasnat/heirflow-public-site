import { useEffect } from "react";

interface LimitedTimeEventPageProps {
  onNavigate: (
    page:
      | "landing"
      | "consultation"
      | "schedule-demo"
      | "privacy"
      | "probate-checklist"
      | "team"
      | "limited-time-event"
  ) => void;
}

export default function LimitedTimeEventPage({
  onNavigate,
}: LimitedTimeEventPageProps) {
  useEffect(() => {
    // Load Calendly widget script
    const calendlyScript = document.createElement("script");
    calendlyScript.src = "https://assets.calendly.com/assets/external/widget.js";
    calendlyScript.async = true;
    document.body.appendChild(calendlyScript);

    return () => {
      // Cleanup: remove script when component unmounts
      if (document.body.contains(calendlyScript)) {
        document.body.removeChild(calendlyScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Main Content */}
      <section className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Interested in HeirFlow? Book a demo with us!
          </h1>
        </div>
        <div className="flex items-start justify-center w-full">
          <div
            className="calendly-inline-widget w-full"
            data-url="https://calendly.com/shay-heirflow/heirflow-demo"
            style={{ minWidth: "800px", height: "700px", width: "100%" }}
          ></div>
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
