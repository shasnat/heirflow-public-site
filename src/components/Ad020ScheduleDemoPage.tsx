import { useEffect } from "react";
import { trackStandardEvent } from "../lib/metaPixel";

interface Ad020ScheduleDemoPageProps {
  onNavigate: (
    page:
      | "landing"
      | "consultation"
      | "schedule-demo"
      | "privacy"
      | "probate-checklist"
      | "team"
      | "limited-time-event"
      | "ad-020-landing"
      | "ad-020-schedule-demo"
  ) => void;
}

export default function Ad020ScheduleDemoPage({
  onNavigate,
}: Ad020ScheduleDemoPageProps) {
  useEffect(() => {
    trackStandardEvent("Schedule", {
      pageName: "ad-020-schedule-demo",
      adId: "ad-020",
    });

    const calendlyScript = document.createElement("script");
    calendlyScript.src = "https://assets.calendly.com/assets/external/widget.js";
    calendlyScript.async = true;
    document.body.appendChild(calendlyScript);

    return () => {
      if (document.body.contains(calendlyScript)) {
        document.body.removeChild(calendlyScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <section className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Not sure what to do next? Let’s figure it out together.
          </h1>
          <p className="text-slate-600">
            In a quick 15-minute call, we’ll walk through your situation and help you understand your next step
          </p>
        </div>
        <div className="flex items-start justify-center w-full">
          <div
            className="calendly-inline-widget w-full"
            data-url="https://calendly.com/shay-heirflow/15-minute-meeting"
            style={{ minWidth: "800px", height: "700px", width: "100%" }}
          ></div>
        </div>
      </section>

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
