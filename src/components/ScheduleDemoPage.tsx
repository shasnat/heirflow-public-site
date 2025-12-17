import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input, Textarea } from "./ui/input";
import { supabase } from "../lib/supabase";

interface ScheduleDemoPageProps {
  onNavigate: (page: "landing" | "consultation" | "schedule-demo") => void;
}

export default function ScheduleDemoPage({ onNavigate }: ScheduleDemoPageProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interestReason, setInterestReason] = useState("");
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

    if (!interestReason.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please tell us why you're interested.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const { error } = await supabase.from("demo_requests").insert({
        email: email,
        phone: phone,
        interest_reason: interestReason,
      });

      if (error) {
        throw error;
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you! We'll be in touch soon to schedule your demo.",
      });

      // Reset form
      setEmail("");
      setPhone("");
      setInterestReason("");
    } catch (error: any) {
      console.error("Error submitting demo request:", error);
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
      <section className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-3xl font-bold text-slate-800">
              Schedule a Demo
            </h1>
          </div>

          <p className="text-slate-600 mb-8 leading-relaxed">
            Let us show you how HeirFlow can streamline your probate and estate
            administration workflow.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email
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

            <div>
              <label
                htmlFor="interestReason"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Tell us why you're interested
              </label>
              <Textarea
                id="interestReason"
                value={interestReason}
                onChange={(e) => setInterestReason(e.target.value)}
                placeholder="What would you like to learn about HeirFlow?"
                rows={4}
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
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}

