import { Shield, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import FeatureCarousel from "./FeatureCarousel";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-semibold text-slate-800">HeirFlow</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-slate-700">
            Sign In
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4">
          Probate Management,{" "}
          <span className="text-blue-600">Simplified</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          Streamline every step of estate administration with intelligent
          timelines, smart document recommendations, and built-in guidance—all
          in one secure platform.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Start Free Trial <ArrowRight className="ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8"
          >
            Schedule Demo
          </Button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Everything You Need for Estate Administration
          </h2>
          <p className="text-lg text-blue-600">
            Discover how HeirFlow transforms the probate process
          </p>
        </div>
        <FeatureCarousel />
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-slate-200">
        <div className="text-center text-sm text-slate-500">
          <p>Secure • Confidential • Professional</p>
        </div>
      </footer>
    </div>
  );
}

