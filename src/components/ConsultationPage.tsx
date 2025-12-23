import { useState } from "react";
import { Button } from "./ui/button";
import { Input, Textarea } from "./ui/input";
import { supabase } from "../lib/supabase";

interface ConsultationPageProps {
  onNavigate: (page: "landing" | "consultation" | "schedule-demo" | "privacy" | "probate-checklist" | "team") => void;
}

export default function ConsultationPage({ onNavigate }: ConsultationPageProps) {
  const [caseDetails, setCaseDetails] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!caseDetails.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please tell us about your case.",
      });
      return;
    }

    if (!email.trim() || !validateEmail(email)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (!phone.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a phone number.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const { error } = await supabase.from("consultations").insert({
        case_details: caseDetails,
        email: email,
        phone: phone,
      });

      if (error) {
        throw error;
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you! We'll review your case and get back to you soon.",
      });

      // Reset form
      setCaseDetails("");
      setEmail("");
      setPhone("");
    } catch (error: any) {
      console.error("Error submitting consultation:", error);
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Main Content */}
      <section className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-3xl font-bold text-slate-800">
              Free Legal Consultation
            </h1>
          </div>

          <p className="text-slate-600 mb-8 leading-relaxed">
            Tell us about an active probate or estate administration case. Our
            legal team will review it and help ensure you're filing the right
            court documents for your client.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="caseDetails"
                  className="block text-sm font-medium text-slate-700"
                >
                  Tell us about a case in a few sentences
                </label>
                <span className="text-xs text-slate-500">
                  {caseDetails.length}/800
                </span>
              </div>
              <Textarea
                id="caseDetails"
                value={caseDetails}
                onChange={(e) => {
                  if (e.target.value.length <= 800) {
                    setCaseDetails(e.target.value);
                  }
                }}
                placeholder="Non-sensitive case details..."
                rows={6}
                required
                maxLength={800}
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                required
                className="w-full"
              />
            </div>

            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Consultation"}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-slate-200">
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-500">Secure • Confidential • Professional</p>
          <p className="text-xs text-slate-400">
            <button
              onClick={() => onNavigate("privacy")}
              className="hover:text-blue-600 transition-colors underline"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
}

