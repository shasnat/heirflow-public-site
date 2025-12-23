import { Button } from "./ui/button";

interface TeamPageProps {
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

export default function TeamPage({ onNavigate }: TeamPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Main Content */}
      <section className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Meet Our Team
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The founders behind HeirFlow, dedicated to simplifying probate and
            estate administration.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Daniel Miller */}
          <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-8 text-center">
            <div className="mb-6">
              <img
                src="/daniel-miller.jpg"
                alt="Daniel Miller"
                className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-blue-100"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://via.placeholder.com/300?text=Daniel+Miller";
                }}
              />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Daniel Miller
            </h2>
            <p className="text-blue-600 font-semibold mb-4">Co-Founder</p>
            <p className="text-slate-700 leading-relaxed">
              Daniel Miller is a third-generation attorney and recognized leader
              in elder law and estate planning. As a Super Lawyer and Best
              Lawyer honoree, he brings decades of experience navigating the
              complexities of probate and estate administration. Daniel serves
              on the New York State Bar Association Elder Law Executive
              Committee and chairs the Brooklyn Bar Association Elder Law
              Committee, where he's been instrumental in shaping best practices
              for the profession. His deep understanding of the challenges
              attorneys face in probate court—from document preparation to
              submission workflows—inspired him to co-found HeirFlow, a platform
              designed to streamline estate administration and reduce the
              administrative burden on legal professionals. Outside the office,
              Daniel is a devoted husband, proud father of two daughters, a
              long-suffering Jets fan, and an avid lover of Hawaii.
            </p>
          </div>

          {/* Shay Hasnat */}
          <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-8 text-center">
            <div className="mb-6">
              <img
                src="/shay-hasnat.jpg"
                alt="Shay Hasnat"
                className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-blue-100"
                style={{ objectPosition: "center 0%" }}
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://via.placeholder.com/300?text=Shay+Hasnat";
                }}
              />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Shay Hasnat
            </h2>
            <p className="text-blue-600 font-semibold mb-4">Co-Founder</p>
            <p className="text-slate-700 leading-relaxed">
              Shay Hasnat brings over 12 years of professional software
              development experience to HeirFlow, with a proven track record of
              building transformative fintech platforms. As a former Managing
              Director at iCapital and a founding team member at SIMON Markets,
              he has deep expertise in creating best-in-class wealth management
              software that empowers professionals to better serve their
              clients. Shay's passion lies in modernizing industries burdened by
              outdated technology, bringing them into the digital age with
              intuitive, powerful solutions. This drive led him to co-found
              HeirFlow, where he combines his technical expertise with a deep
              understanding of how modern software can transform complex
              workflows. When not building software, Shay enjoys quiet time with
              a good book and participating in book clubs.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            onClick={() => onNavigate("landing")}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Return to Home
          </Button>
        </div>
      </section>
    </div>
  );
}
