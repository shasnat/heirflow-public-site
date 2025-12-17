import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface PrivacyPolicyPageProps {
  onNavigate: (page: "landing" | "consultation" | "schedule-demo" | "privacy") => void;
}

export default function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center">
        <button
          onClick={() => onNavigate("landing")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Privacy Policy
          </h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
            <p className="text-sm text-slate-500 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Introduction
              </h2>
              <p>
                HeirFlow LLC ("we," "our," or "us") operates this website to provide information about our probate management services. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Information We Collect
              </h2>
              <p>
                When you request a consultation or schedule a demo, we collect the following information:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Email Address:</strong> Used to contact you about your request and provide updates about our services.</li>
                <li><strong>Phone Number:</strong> Used to reach you to discuss your consultation or demo request.</li>
                <li><strong>Case Information:</strong> For consultation requests, we collect non-sensitive case details you choose to share to help us understand how we can assist you.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                How We Use Your Information
              </h2>
              <p>
                We use the information you provide to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Respond to your consultation requests and schedule demos</li>
                <li>Contact you about our probate management services</li>
                <li>Improve our services and website experience</li>
                <li>For lead generation and business development purposes</li>
              </ul>
              <p className="mt-4">
                We do not sell your personal information to third parties. Your information is used solely by HeirFlow LLC for the purposes described above.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Data Security
              </h2>
              <p>
                We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Your Rights
              </h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Request access to the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at:
              </p>
              <p className="mt-4">
                <strong>HeirFlow LLC</strong><br />
                Email: [Your contact email]<br />
                Website: heirflow.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <Button
              onClick={() => onNavigate("landing")}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

