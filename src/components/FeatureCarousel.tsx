import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import {
  Clock,
  FileCheck,
  BookOpen,
  CheckCircle2,
  X,
  Play,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";

const features = [
  {
    icon: Clock,
    tagline: "Never lose track of progress",
    title: "Clear Probate Timeline",
    description:
      "Streamline every step of estate administration with a visual timeline that guides you from intake to final distribution.",
    features: [
      "Step-by-step workflow",
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
              <div
                key={idx}
                className="flex flex-col items-center relative z-10"
              >
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
      "Auto-filled templates",
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
    visual: null, // Will be handled separately with modal
  },
];

// Video modal component
function VideoModal({
  isOpen,
  onClose,
  title,
  description,
  videoUrl,
  videoTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  videoUrl: string;
  videoTitle: string;
}) {
  if (!isOpen) return null;

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.includes("youtube.com/watch?v=")
      ? url.split("v=")[1]?.split("&")[0]
      : url.includes("youtu.be/")
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
            <p className="text-sm text-slate-600 mt-1">{description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-6">
          <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden mb-4">
            <iframe
              src={getYouTubeEmbedUrl(videoUrl)}
              title={videoTitle}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => window.open(videoUrl, "_blank")}
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Watch on YouTube
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(videoUrl);
              }}
              className="flex items-center gap-2"
            >
              Copy link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeatureCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    title: string;
    description: string;
    videoUrl: string;
    videoTitle: string;
  } | null>(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-cycle carousel every 5 seconds (pauses on hover)
  useEffect(() => {
    if (!api || isHovered) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 12000);

    return () => {
      clearInterval(interval);
    };
  }, [api, isHovered]);

  // Educational videos data
  const educationalVideos = [
    {
      title: "Understanding Probate Process",
      description:
        "Learn the step-by-step process of probate administration and what to expect.",
      videoUrl: "https://www.youtube.com/watch?v=wgE4jooCBlY",
      videoTitle: "Probate Process Explained",
      topic: "Probate Basics",
    },
    {
      title: "What is Intestacy",
      description:
        "Understanding what happens when someone dies without a will and how assets are distributed.",
      videoUrl: "https://www.youtube.com/watch?v=lndrFiY7EHs",
      videoTitle: "Intestacy",
      topic: "Intestacy",
    },
    {
      title: "How Assets Are Passed On After Death",
      description:
        "Understanding how different types of ownership affect asset distribution after someone passes away.",
      videoUrl: "https://www.youtube.com/watch?v=4P9tILg8cxs",
      videoTitle: "THE 3 BUCKETS THAT CONTROL WHO GET YOUR MONEY & PROPERTY",
      topic: "Asset Ownership",
    },
  ];

  return (
    <>
      <div
        className="w-full max-w-6xl mx-auto relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Previous Arrow - Outside carousel on the left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-4 z-10">
          <Button
            variant="outline"
            size="icon"
            className="size-10 rounded-full bg-white shadow-lg border border-slate-200"
            onClick={() => api?.scrollPrev()}
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* Next Arrow - Outside carousel on the right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-4 z-10">
          <Button
            variant="outline"
            size="icon"
            className="size-10 rounded-full bg-white shadow-lg border border-slate-200"
            onClick={() => api?.scrollNext()}
            aria-label="Next slide"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isEducationPanel = index === 2; // Built-in Education is the 3rd panel

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
                        <div className="hidden md:block">
                          {isEducationPanel ? (
                            <div className="flex flex-col items-center justify-center h-full p-6">
                              <div className="w-full max-w-md">
                                <h3 className="text-sm font-medium text-slate-600 mb-4 text-center">
                                  Educational Resources
                                </h3>
                                <div className="space-y-3">
                                  {educationalVideos.map((video, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer group"
                                      onClick={() => setSelectedVideo(video)}
                                    >
                                      <div className="flex items-center gap-2.5 flex-1">
                                        <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors flex-shrink-0">
                                          <Play className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm font-semibold text-slate-800 truncate">
                                            {video.topic}
                                          </p>
                                          <p className="text-xs text-slate-600 truncate mt-0.5">
                                            {video.title}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-4 text-center">
                                  <p className="text-xs text-slate-500">
                                    Click any topic to watch educational videos
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            feature.visual
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
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

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          title={selectedVideo.title}
          description={selectedVideo.description}
          videoUrl={selectedVideo.videoUrl}
          videoTitle={selectedVideo.videoTitle}
        />
      )}
    </>
  );
}
