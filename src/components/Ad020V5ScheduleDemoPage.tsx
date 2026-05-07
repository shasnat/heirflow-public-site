import { useEffect } from "react";
import { Check } from "lucide-react";
import { trackStandardEvent } from "../lib/metaPixel";

type Ad020V5ScheduleNavigatePage =
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
  | "ad-020-v3-schedule-demo"
  | "ad-020-v4-landing"
  | "ad-020-v4-schedule-demo"
  | "ad-020-v5-landing"
  | "ad-020-v5-schedule-demo";

interface Ad020V5ScheduleDemoPageProps {
  onNavigate: (page: Ad020V5ScheduleNavigatePage) => void;
}

const CALENDLY_URL =
  "https://calendly.com/shay-heirflow/15-minute-meeting?hide_event_type_details=1";

export default function Ad020V5ScheduleDemoPage({
  onNavigate,
}: Ad020V5ScheduleDemoPageProps) {
  useEffect(() => {
    trackStandardEvent("Schedule", {
      pageName: "ad-020-v5-schedule-demo",
      adId: "ad-020-v5",
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
    <div className="min-h-screen bg-[#f4f1eb]">
      <section className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="overflow-hidden rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-stone-200/80 md:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Let&apos;s talk through your situation
              </p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                Pick a time—
                <span className="text-blue-600">we&apos;ll take it from there.</span>
              </h1>
              <p className="mt-4 text-slate-600">
                We&apos;ll talk through your situation and help you figure out your next
                steps.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Book in seconds",
                  "15-minute call",
                  "No pressure. Just clarity.",
                ].map((line) => (
                  <li key={line} className="flex items-center gap-3 text-slate-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-h-[560px] w-full overflow-x-auto rounded-xl border border-slate-100 bg-slate-50/50">
              <div
                className="calendly-inline-widget min-h-[560px] w-full min-w-[320px]"
                data-url={CALENDLY_URL}
                style={{ minWidth: "320px", height: "640px", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="container mx-auto max-w-6xl px-4 py-8">
        <div className="text-center text-sm text-slate-600">
          <button
            type="button"
            onClick={() => onNavigate("privacy")}
            className="underline transition-colors hover:text-blue-600"
          >
            Privacy Policy
          </button>
        </div>
      </footer>
    </div>
  );
}
