import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

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
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/"
            onClick={() => onNavigate("landing")}
            className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
          >
            <img src="/logo.png" alt="HeirFlow" className="h-[50px] w-auto" />
          </Link>

          <div className="flex min-w-0 max-w-[min(100%,20rem)] items-center justify-end gap-2 text-right text-xs leading-snug text-slate-600 sm:max-w-none sm:text-sm md:text-[15px]">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 self-start text-blue-600 sm:mt-0 sm:self-center" aria-hidden />
            <span className="text-balance">
              Built for NY Attorneys &amp; Legal Professionals
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
