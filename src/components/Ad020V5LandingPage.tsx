import { useEffect } from "react";
import {
  BookOpen,
  Calendar,
  Check,
  CircleHelp,
  FileText,
  GitBranch,
  Shield,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import { trackEvent, trackStandardEvent } from "../lib/metaPixel";

type Ad020V5NavigatePage =
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

interface Ad020V5LandingPageProps {
  onNavigate: (page: Ad020V5NavigatePage) => void;
}

const CALENDLY_URL =
  "https://calendly.com/shay-heirflow/15-minute-meeting?hide_event_type_details=1";

const heroImageSrc = "/hero-v5-lifestyle.png";

export default function Ad020V5LandingPage({ onNavigate }: Ad020V5LandingPageProps) {
  useEffect(() => {
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

  const handleBookIntroClick = (ctaText: string) => {
    trackStandardEvent("Contact", {
      pageName: "ad-020-v5-landing",
      adId: "ad-020-v5",
    });
    trackEvent("Ad020V5BookCallClick", {
      adId: "ad-020-v5",
      pageName: "ad-020-v5-landing",
      ctaText,
    });
    document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main>
        {/* Hero — right-side bg image + gradient overlays (no hard-cut image edge) */}
        {/* pt-0: image top aligns with section top = flush under header (no extra band above image) */}
        <section className="bg-[#faf8f5] pt-0">
          <div className="container mx-auto max-w-6xl px-4 pb-12 md:pb-16 lg:pb-20">
            <div className="relative isolate min-h-[520px] overflow-hidden md:min-h-[560px]">
              {/*
                Photo layer + overlays (no hard card edge — fades use section #faf8f5).
                ::before = existing left wash into copy (desktop) / strong top wash (mobile).
                ::after = layered right + bottom fades into page background (#faf8f5).
              */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 bg-cover bg-[16%_40%] md:inset-auto md:bottom-0 md:right-0 md:top-0 md:left-[44%] md:h-full md:w-[56%] md:bg-[20%_46%]
                  before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:content-['']
                  before:bg-[linear-gradient(to_bottom,rgba(250,248,245,0.88)_0%,rgba(250,248,245,0.82)_8%,rgba(250,248,245,0.62)_22%,rgba(250,248,245,0.35)_42%,rgba(248,250,252,0.12)_68%,rgba(255,255,255,0)_100%)]
                  md:before:bg-[linear-gradient(to_right,#faf8f5_0%,rgba(255,255,255,0.42)_10%,rgba(248,250,252,0.18)_24%,rgba(255,255,255,0)_42%)]
                  after:pointer-events-none after:absolute after:inset-0 after:z-[2] after:content-['']
                  after:bg-[linear-gradient(to_right,transparent_0%,transparent_70%,#faf8f5_100%),linear-gradient(to_bottom,transparent_68%,#faf8f5_100%)]"
                style={{ backgroundImage: `url(${heroImageSrc})` }}
              />

              <div className="relative z-20 max-w-full px-1 pb-8 pt-10 md:max-w-[48%] md:pb-10 md:pt-12 md:pr-4">
                <p className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-800">
                  Probate doesn&apos;t have to be confusing
                </p>
                <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-[2.75rem] lg:leading-[1.15]">
                  <span className="block">Still figuring out probate on your own?</span>
                  <span className="mt-1 block text-blue-600 md:mt-2">
                    There&apos;s a better way.
                  </span>
                </h1>
                <p className="mt-5 text-lg text-slate-600 md:text-xl">
                  HeirFlow gives you a step-by-step way to handle probate without guessing.
                </p>
                <div className="mt-8 flex flex-col items-start gap-2">
                  <Button
                    size="lg"
                    className="rounded-xl bg-blue-600 px-8 py-6 text-base font-semibold text-white shadow-md hover:bg-blue-700"
                    onClick={() => handleBookIntroClick("See if it's a fit (15 min)")}
                  >
                    <Calendar className="h-5 w-5" aria-hidden />
                    See if it&apos;s a fit (15 min)
                  </Button>
                  <p className="flex items-start gap-2 text-sm text-slate-500">
                    <span className="mt-0.5 text-blue-500" aria-hidden>
                      ↳
                    </span>
                    Quick call to understand your situation and point you to the right next
                    step.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-6 border-t border-slate-200/60 pt-10 sm:grid-cols-3">
              {[
                { title: "15-minute call", sub: "Quick intro" },
                { title: "See if it fits your situation", sub: "Before a full demo" },
                { title: "No obligation", sub: "Just a quick check" },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="bg-white py-14 md:py-16 lg:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="rounded-[1.75rem] border border-slate-200/90 bg-gradient-to-b from-slate-50 to-slate-100/90 px-6 py-12 text-center shadow-sm md:px-10 md:py-14 lg:px-14 lg:py-16">
              <div className="mb-5 flex justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-inner ring-1 ring-blue-200/80">
                  <Users className="h-7 w-7 stroke-[1.75]" aria-hidden />
                </span>
              </div>
              <h2 className="text-[1.65rem] font-bold leading-snug tracking-tight text-slate-900 md:text-3xl lg:text-[2rem]">
                Built with New York probate attorneys
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-slate-600 md:text-lg">
                Used by solo and small firms across the state
              </p>
            </div>
          </div>
        </section>

        {/* Probate is confusing + What happens on the call */}
        <section className="bg-white py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="rounded-3xl bg-blue-50/80 p-6 md:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                    Probate is confusing—you&apos;re not alone.
                  </h2>
                  <ul className="mt-6 space-y-4">
                    {[
                      "Not sure what forms to file",
                      "Unsure who needs to sign what",
                      "Worried about making a mistake",
                    ].map((text) => (
                      <li key={text} className="flex gap-3 text-slate-700">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <CircleHelp className="h-4 w-4" aria-hidden />
                        </span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center gap-3 rounded-xl bg-blue-100/90 px-4 py-4 text-slate-800">
                    <Users className="h-8 w-8 shrink-0 text-blue-600" aria-hidden />
                    <p className="text-sm font-medium md:text-base">
                      Most people are guessing their way through it.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                    What this call is for
                  </h2>
                  <ul className="mt-6 space-y-6">
                    {[
                      {
                        n: 1,
                        title: "Understand your situation",
                        body: "Tell us what you're working on and what stage you're in.",
                      },
                      {
                        n: 2,
                        title: "See if HeirFlow is relevant",
                        body: "We'll quickly determine if the platform can help with your case.",
                      },
                      {
                        n: 3,
                        title: "Point you to the right next step",
                        body: "If it's a fit, we'll schedule a full walkthrough. If not, we'll tell you.",
                      },
                    ].map((step) => (
                      <li key={step.n} className="flex gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-base font-bold text-white">
                          {step.n}
                        </span>
                        <div>
                          <p className="font-semibold text-slate-900">{step.title}</p>
                          <p className="mt-1 text-sm text-slate-600 md:text-base">
                            {step.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product */}
        <section className="bg-white py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold text-slate-900 md:text-4xl">
              A better way to handle probate
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Guided workflow",
                  body: "Know what to do, in the right order",
                  Icon: GitBranch,
                },
                {
                  title: "Built-in training",
                  body: "Learn each step as you go",
                  Icon: BookOpen,
                },
                {
                  title: "Court-ready filings",
                  body: "Documents formatted for NY courts",
                  Icon: FileText,
                },
              ].map(({ title, body, Icon }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-100 bg-white p-8 text-left shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scheduling */}
        <section id="book-call" className="bg-[#f4f1eb] py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="overflow-hidden rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-stone-200/80 md:p-10 lg:p-12">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
                <div className="max-w-xl space-y-4">
                  <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                    Start with a quick intro call
                  </h2>
                  <p className="text-lg text-slate-600 md:text-xl">
                    We&apos;ll see if HeirFlow makes sense for your situation before showing you
                    the full platform.
                  </p>
                  <p className="pt-1 text-sm text-slate-500 md:text-[0.9375rem]">
                    Book in seconds • 15-minute intro • No pressure
                  </p>
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
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            <div className="flex gap-4">
              <ShieldCheck className="mt-1 h-8 w-8 shrink-0 text-blue-400" aria-hidden />
              <div>
                <p className="font-semibold">Built for NY</p>
                <p className="mt-1 text-sm text-slate-300">
                  Designed specifically for New York probate cases.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Users className="mt-1 h-8 w-8 shrink-0 text-blue-400" aria-hidden />
              <div>
                <p className="font-semibold">Trusted by Attorneys</p>
                <p className="mt-1 text-sm text-slate-300">
                  Used by probate attorneys across New York.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="mt-1 h-8 w-8 shrink-0 text-blue-400" aria-hidden />
              <div>
                <p className="font-semibold">Focus on What Matters</p>
                <p className="mt-1 text-sm text-slate-300">
                  We handle the paperwork so you can focus on your clients and their families.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
            <p>© 2026 HeirFlow. All rights reserved.</p>
            <button
              type="button"
              onClick={() => onNavigate("privacy")}
              className="mt-2 text-slate-400 underline transition-colors hover:text-white"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
