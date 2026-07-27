import { useEffect } from "react";
import {
  AlertTriangle,
  Calendar,
  Check,
  Clock,
  GraduationCap,
  MapPin,
  Quote,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import FeatureCarousel from "./FeatureCarousel";
import { trackEvent, trackStandardEvent } from "../lib/metaPixel";
import { appSignupUrl } from "../lib/appUrl";

interface LandingPageProps {
  onNavigate: (
    page:
      | "landing"
      | "consultation"
      | "schedule-demo"
      | "privacy"
      | "probate-checklist"
      | "team"
  ) => void;
}

const CALENDLY_URL =
  "https://calendly.com/shay-heirflow/15-minute-meeting?hide_event_type_details=1";

export default function LandingPage({ onNavigate }: LandingPageProps) {
  useEffect(() => {
    // Clean up any stray Brevo form elements that might appear on the landing page
    const cleanupBrevoElements = () => {
      const countrySelects = document.querySelectorAll(
        'select[name="SMS__COUNTRY_CODE"]'
      );
      countrySelects.forEach((select) => {
        if (!select.closest(".sib-form")) {
          select.remove();
        }
      });

      const brevoElements = document.querySelectorAll(
        ".sib-container, .sib-form-container, .sib-sms-input-wrapper"
      );
      brevoElements.forEach((el) => {
        if (!el.closest(".sib-form")) {
          el.remove();
        }
      });
    };

    cleanupBrevoElements();
    const timeoutId = setTimeout(cleanupBrevoElements, 100);

    // Load the Calendly widget script for the inline booking embed.
    const calendlyScript = document.createElement("script");
    calendlyScript.src = "https://assets.calendly.com/assets/external/widget.js";
    calendlyScript.async = true;
    document.body.appendChild(calendlyScript);

    return () => {
      clearTimeout(timeoutId);
      if (document.body.contains(calendlyScript)) {
        document.body.removeChild(calendlyScript);
      }
    };
  }, []);

  const scrollToVideo = () => {
    document
      .getElementById("video-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleBookDemoClick = (ctaText: string) => {
    trackStandardEvent("Contact", { pageName: "landing" });
    trackEvent("BookDemoClick", { pageName: "landing", ctaText });
    document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartTrialClick = (ctaText: string) => {
    trackStandardEvent("Lead", { pageName: "landing" });
    trackEvent("StartTrialClick", { pageName: "landing", ctaText });
    window.location.href = appSignupUrl();
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#faf8f5]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"
          />
          <div className="container relative mx-auto max-w-6xl px-4 py-10 md:py-12 lg:py-14">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-800">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  Built for New York legal professionals
                </p>
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                  Probate paperwork that&apos;s right for{" "}
                  <span className="text-blue-600">every NY county</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg text-slate-600 md:text-xl">
                  HeirFlow guides your firm through every step of probate and
                  estate administration, automatically surfacing the exact forms
                  and local requirements for the county you&apos;re filing in.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    size="lg"
                    className="rounded-xl bg-blue-600 px-8 py-6 text-base font-semibold text-white shadow-md hover:bg-blue-700"
                    onClick={() => handleStartTrialClick("Hero - Try for Free")}
                  >
                    Try for Free
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-xl border-slate-300 px-8 py-6 text-base font-semibold text-slate-800 hover:bg-slate-50"
                    onClick={scrollToVideo}
                  >
                    Watch demo
                  </Button>
                </div>
                <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-500" strokeWidth={3} aria-hidden />
                    7-day free trial
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-500" strokeWidth={3} aria-hidden />
                    Cancel anytime
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-500" strokeWidth={3} aria-hidden />
                    See if it fits your firm
                  </span>
                </p>
              </div>

              {/* Product visual: county selector to tailored forms */}
              <div className="relative">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      Filing county
                    </p>
                    <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                      <MapPin className="h-4 w-4" aria-hidden />
                      Kings County
                    </span>
                  </div>
                  <div className="mt-5 border-t border-slate-100 pt-5">
                    <p className="mb-3 text-sm font-medium text-slate-600">
                      Required for this county
                    </p>
                    <div className="space-y-3">
                      {[
                        "Probate Petition (P-1)",
                        "Notice of Probate",
                        "Waiver & Consent",
                        "Will Witness Affidavit",
                      ].map((doc) => (
                        <div
                          key={doc}
                          className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                              <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                            </span>
                            <span className="text-sm font-medium text-slate-800">
                              {doc}
                            </span>
                          </div>
                          <span className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
                            Auto-detected
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-y border-slate-200 bg-white">
          <div className="container mx-auto max-w-6xl px-4 py-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center text-sm font-medium text-slate-600 sm:flex-row sm:gap-8 md:text-base">
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" aria-hidden />
                Built with New York probate attorneys
              </span>
              <span className="hidden text-slate-300 sm:inline">•</span>
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" aria-hidden />
                Covers all 62 NY counties
              </span>
              <span className="hidden text-slate-300 sm:inline">•</span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" aria-hidden />
                Used by solo &amp; small firms
              </span>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="bg-blue-50 pt-8 pb-14 md:pt-10 md:pb-16">
          <div className="container mx-auto max-w-3xl px-4">
            <figure className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200/80 md:p-12">
              <Quote className="h-10 w-10 text-blue-500" aria-hidden />
              <blockquote className="mt-6 text-xl font-medium leading-relaxed text-slate-800 md:text-2xl">
                HeirFlow has made preparing probate filings much faster and
                easier. The interface is intuitive, the documents are well
                organized, and the team is incredibly responsive to support and
                feature requests.
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
                <img
                  src="/kathleen-peer.jpg"
                  alt="Kathleen C. Peer"
                  className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-base font-bold text-slate-900">
                    Kathleen C. Peer
                  </span>
                  <span className="text-sm text-slate-600">
                    Peer Law Firm &bull; Stuyvesant, NY
                  </span>
                  <span className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <a
                      href="https://www.linkedin.com/in/kathleen-peer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </span>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Problem section */}
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Probate in New York is a moving target
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Every county does things a little differently. Keeping it all
                straight slows your firm down, and one wrong form can mean a
                rejection.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: MapPin,
                  title: "Per-county guesswork",
                  body: "Each Surrogate's Court has its own forms and local quirks. Tracking them by hand wastes hours.",
                },
                {
                  Icon: AlertTriangle,
                  title: "Mistakes & rejections",
                  body: "A missing affidavit or the wrong version of a form means delays, re-filings, and frustrated clients.",
                },
                {
                  Icon: GraduationCap,
                  title: "Slow staff onboarding",
                  body: "New paralegals and associates can't run matters confidently without constant supervision.",
                },
              ].map(({ Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-7 shadow-sm"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-[#faf8f5] py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Everything your firm needs in one place
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Purpose-built for New York probate and estate administration.
              </p>
            </div>
            <FeatureCarousel />
          </div>
        </section>

        {/* Outcomes */}
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                What it means for your practice
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Clock,
                  title: "Save hours per matter",
                  body: "Stop hunting for the right county forms and re-keying the same details across documents.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Reduce filing errors",
                  body: "Submit the correct, complete paperwork the first time and cut down on rejections and delays.",
                },
                {
                  Icon: Users,
                  title: "Onboard staff faster",
                  body: "Built-in guidance lets paralegals and associates run matters with confidence.",
                },
              ].map(({ Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-100 bg-white p-7 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo video */}
        <section id="video-section" className="bg-[#faf8f5] py-16 md:py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                See it in action
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                Watch a quick walkthrough of the HeirFlow intake process.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
              <div className="aspect-video bg-slate-100">
                <iframe
                  src="https://www.youtube.com/embed/wuGnxNl70UE"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                  title="HeirFlow Demo"
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="rounded-xl bg-blue-600 px-8 py-6 text-base font-semibold text-white shadow-md hover:bg-blue-700"
                onClick={() => handleStartTrialClick("Video - Try for Free")}
              >
                Try for Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-slate-300 px-8 py-6 text-base font-semibold text-slate-800 hover:bg-slate-50"
                onClick={() => handleBookDemoClick("Video - Book a call")}
              >
                <Calendar className="h-5 w-5" aria-hidden />
                Book a call
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA: inline Calendly */}
        <section id="book-call" className="bg-white py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="overflow-hidden rounded-3xl bg-[#faf8f5] p-6 shadow-sm ring-1 ring-slate-200/80 md:p-10 lg:p-12">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
                <div className="max-w-xl space-y-4">
                  <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                    Book a 15-minute call
                  </h2>
                  <p className="text-lg text-slate-600">
                    See how HeirFlow handles county-specific probate for your
                    firm. We&apos;ll walk you through the platform and answer your
                    questions.
                  </p>
                  <p className="pt-1 text-sm text-slate-500">
                    Book in seconds • 15-minute call • No obligation
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onNavigate("probate-checklist")}
                      className="text-sm font-medium text-blue-600 underline-offset-4 hover:underline"
                    >
                      Or grab the free Probate Survival Guide →
                    </button>
                  </div>
                </div>
                <div className="min-h-[560px] w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
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

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            <div className="flex gap-4">
              <MapPin className="mt-1 h-8 w-8 shrink-0 text-blue-400" aria-hidden />
              <div>
                <p className="font-semibold">Built for NY</p>
                <p className="mt-1 text-sm text-slate-300">
                  Covers county-specific requirements across all 62 New York
                  Surrogate&apos;s Courts.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Users className="mt-1 h-8 w-8 shrink-0 text-blue-400" aria-hidden />
              <div>
                <p className="font-semibold">Trusted by attorneys</p>
                <p className="mt-1 text-sm text-slate-300">
                  Built with and used by probate attorneys across New York.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <ShieldCheck className="mt-1 h-8 w-8 shrink-0 text-blue-400" aria-hidden />
              <div>
                <p className="font-semibold">Secure &amp; confidential</p>
                <p className="mt-1 text-sm text-slate-300">
                  We handle the paperwork so you can focus on your clients and
                  their families.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center gap-3 border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
            <p>© 2026 HeirFlow. All rights reserved.</p>
            <p className="space-x-4">
              <button
                onClick={() => onNavigate("privacy")}
                className="underline transition-colors hover:text-white"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => onNavigate("team")}
                className="underline transition-colors hover:text-white"
              >
                Our Team
              </button>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
