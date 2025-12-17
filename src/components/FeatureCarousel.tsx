import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Clock, FileCheck, BookOpen, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: Clock,
    tagline: "Never lose track of progress",
    title: "Clear Probate Timeline",
    description:
      "Streamline every step of estate administration with a visual timeline that guides you from intake to final distribution.",
    features: [
      "6-step guided workflow",
      "Real-time progress tracking",
      "Automated milestone updates",
      "Task prioritization",
    ],
    visual: (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="w-full max-w-2xl">
          <h3 className="text-sm font-medium text-slate-600 mb-6 text-center">
            Probate Progress
          </h3>
          <div className="flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200">
              <div className="h-full w-1/5 bg-blue-600 transition-all duration-300" />
            </div>
            {/* Steps */}
            {[
              { num: 1, label: "Intake", active: true },
              { num: 2, label: "Notarize", active: false },
              { num: 3, label: "Submit", active: false },
              { num: 4, label: "Marshal", active: false },
              { num: 5, label: "Liabilities", active: false },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    step.active
                      ? "bg-blue-600 text-white ring-4 ring-blue-100"
                      : "bg-white text-slate-400 border-2 border-slate-200"
                  }`}
                >
                  {step.num}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    step.active ? "text-blue-600" : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: FileCheck,
    tagline: "Never miss a filing",
    title: "Smart Document Recommendations",
    description:
      "Our intelligent system analyzes your case details and recommends the exact court documents you need—no more guesswork.",
    features: [
      "Auto-recommended filings",
      "Pre-filled templates",
      "Court-compliant formats",
      "Document tracking",
    ],
    visual: (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="w-full max-w-md">
          <h3 className="text-sm font-medium text-slate-600 mb-4">
            Recommended Documents
          </h3>
          <div className="space-y-3">
            {[
              "Waiver & Consent",
              "Will Witness Affidavits",
              "Notice of Probate",
            ].map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium text-slate-800">
                    {doc}
                  </span>
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  Recommended
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: BookOpen,
    tagline: "Guidance exactly where you need it",
    title: "Built-in Education",
    description:
      "Access contextual educational content at every step. Never wonder what comes next or why a document is required.",
    features: [
      "Step-by-step explanations",
      "Legal requirement guides",
      "Best practice tips",
      "Court-specific instructions",
    ],
    visual: (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="w-full max-w-md bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              Why is this step important?
            </h3>
          </div>
          <p className="text-sm text-slate-700 mb-4">
            Notarizing documents ensures their legal validity. The court
            requires notarized signatures to verify the identity of all parties
            involved in the estate administration.
          </p>
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-xs font-semibold text-blue-600 mb-2">
              Quick Tips:
            </p>
            <ul className="space-y-2">
              {[
                "Schedule notary appointments in advance",
                "Bring valid government-issued ID",
              ].map((tip, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ),
  },
];

export default function FeatureCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <CarouselItem key={index}>
                <Card className="bg-white shadow-lg border-slate-200">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      {/* Left side - Content */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <p className="text-sm font-medium text-blue-600">
                            {feature.tagline}
                          </p>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800">
                          {feature.title}
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                          {feature.description}
                        </p>
                        <ul className="space-y-3">
                          {feature.features.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span className="text-slate-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Right side - Visual */}
                      <div className="hidden md:block">{feature.visual}</div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              current === index ? "bg-blue-600 w-8" : "bg-slate-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

