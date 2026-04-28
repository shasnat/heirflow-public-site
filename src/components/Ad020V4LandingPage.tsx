import { Button } from "./ui/button";
import { trackEvent, trackStandardEvent } from "../lib/metaPixel";
import FeatureCarousel from "./FeatureCarousel";

interface Ad020V4LandingPageProps {
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
      | "ad-020-v2-landing"
      | "ad-020-v2-schedule-demo"
      | "ad-020-v3-landing"
      | "ad-020-v3-schedule-demo"
      | "ad-020-v4-landing"
      | "ad-020-v4-schedule-demo"
  ) => void;
}

export default function Ad020V4LandingPage({
  onNavigate,
}: Ad020V4LandingPageProps) {
  const handleClick = () => {
    trackStandardEvent("Contact", {
      pageName: "ad-020-v4-landing",
      adId: "ad-020-v4",
    });
    trackEvent("Ad020V4LeadFormClick", {
      adId: "ad-020-v4",
      pageName: "ad-020-v4-landing",
      ctaText: "See your next step",
    });
    onNavigate("ad-020-v4-schedule-demo");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <main>
        <section className="container mx-auto px-4 pt-12 md:pt-16 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              Probate feels overwhelming?{" "}
              <span className="text-blue-600">
                You do not have to navigate it alone.
              </span>
            </h1>
            <p className="mt-5 text-xl md:text-2xl text-slate-600">
              HeirFlow helps you stay organized, understand each step, and make
              steady progress with less stress.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <FeatureCarousel />
        </section>

        <section className="container mx-auto px-4 pb-14 text-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg"
            onClick={handleClick}
          >
            See your next step
          </Button>
        </section>
      </main>
    </div>
  );
}
