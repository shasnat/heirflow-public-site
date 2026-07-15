import { Calendar, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { trackEvent, trackStandardEvent } from "../lib/metaPixel";
import { appSignupUrl } from "../lib/appUrl";

type PageType =
  | "landing"
  | "consultation"
  | "schedule-demo"
  | "privacy"
  | "probate-checklist"
  | "team"
  | "limited-time-event"
  | "pricing";

interface NavigationProps {
  onNavigate: (page: PageType) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const handleBookDemo = () => {
    trackStandardEvent("Contact", { pageName: "nav" });
    trackEvent("BookDemoClick", { pageName: "nav", ctaText: "Nav - Book a call" });

    // On pages that have the inline Calendly section (the landing page), scroll
    // to it. Otherwise fall back to the dedicated schedule-demo route.
    const bookCall = document.getElementById("book-call");
    if (bookCall) {
      bookCall.scrollIntoView({ behavior: "smooth" });
      return;
    }
    onNavigate("schedule-demo");
  };

  // Self-service on-ramp: account creation + checkout live in the app, so this
  // links out to app signup (not a heirflow.com flow). New attorneys get a 7-day
  // free trial automatically on their first checkout, so this is the primary CTA.
  const handleStartTrial = () => {
    trackStandardEvent("Lead", { pageName: "nav" });
    trackEvent("StartTrialClick", { pageName: "nav", ctaText: "Nav - Try for Free" });
    window.location.href = appSignupUrl();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link
            to="/"
            onClick={() => onNavigate("landing")}
            className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
          >
            <img src="/logo.png" alt="HeirFlow" className="h-[50px] w-auto" />
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden min-w-0 items-center gap-2 text-right text-sm leading-snug text-slate-600 lg:flex lg:text-[15px]">
              <Shield className="h-4 w-4 shrink-0 text-blue-600" aria-hidden />
              <span className="text-balance">
                Built for NY Attorneys &amp; Legal Professionals
              </span>
            </div>
            <Link
              to="/pricing"
              onClick={() => onNavigate("pricing")}
              className="hidden shrink-0 text-sm font-medium text-slate-600 transition-colors hover:text-blue-700 sm:inline"
            >
              Pricing
            </Link>
            <Button
              variant="outline"
              className="shrink-0 px-3 font-semibold sm:px-4"
              onClick={handleBookDemo}
            >
              <Calendar className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Book a call</span>
            </Button>
            <Button
              className="shrink-0 bg-blue-600 px-4 font-semibold text-white shadow-sm hover:bg-blue-700 sm:px-6"
              onClick={handleStartTrial}
            >
              Try for Free
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
