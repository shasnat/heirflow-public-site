import { Calendar, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { trackEvent, trackStandardEvent } from "../lib/metaPixel";

type PageType =
  | "landing"
  | "consultation"
  | "schedule-demo"
  | "privacy"
  | "probate-checklist"
  | "team"
  | "limited-time-event";

interface NavigationProps {
  onNavigate: (page: PageType) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const handleBookDemo = () => {
    trackStandardEvent("Contact", { pageName: "nav" });
    trackEvent("BookDemoClick", { pageName: "nav", ctaText: "Nav - Book a demo" });

    // On pages that have the inline Calendly section (the landing page), scroll
    // to it. Otherwise fall back to the dedicated schedule-demo route.
    const bookCall = document.getElementById("book-call");
    if (bookCall) {
      bookCall.scrollIntoView({ behavior: "smooth" });
      return;
    }
    onNavigate("schedule-demo");
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
            <div className="hidden min-w-0 items-center gap-2 text-right text-sm leading-snug text-slate-600 md:flex md:text-[15px]">
              <Shield className="h-4 w-4 shrink-0 text-blue-600" aria-hidden />
              <span className="text-balance">
                Built for NY Attorneys &amp; Legal Professionals
              </span>
            </div>
            <Button
              className="shrink-0 bg-blue-600 px-4 font-semibold text-white shadow-sm hover:bg-blue-700 sm:px-6"
              onClick={handleBookDemo}
            >
              <Calendar className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Book a demo</span>
              <span className="sm:hidden">Book demo</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
