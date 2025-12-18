import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { supabase } from "../lib/supabase";

interface ProbateChecklistPageProps {
  onNavigate: (page: "landing" | "consultation" | "schedule-demo" | "privacy" | "probate-checklist") => void;
}

export default function ProbateChecklistPage({ onNavigate }: ProbateChecklistPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firmName, setFirmName] = useState("");
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
    if (!name.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please enter your name.",
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

    if (!firmName.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please enter your firm name.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const { error } = await supabase.from("probate_checklist_submissions").insert({
        name: name,
        email: email,
        phone: phone,
        firm_name: firmName,
      });

      if (error) {
        throw error;
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your free Probate Survival Guide will be sent to your email shortly.",
      });

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setFirmName("");
    } catch (error: any) {
      console.error("Error submitting probate survival guide request:", error);
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
              Get Your Free Probate Survival Guide
            </h1>
          </div>

          <p className="text-slate-600 mb-8 leading-relaxed">
            The probate court submission process can be brutal if you miss key steps. Court clerks will reject your submission, causing delays and frustration. Get your free Probate Survival Guide—a comprehensive walkthrough that ensures you don't miss any critical steps and helps you navigate the probate process successfully.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
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

            <div>
              <label
                htmlFor="firmName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Firm Name
              </label>
              <Input
                id="firmName"
                type="text"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                placeholder="Your law firm name"
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
              {isSubmitting ? "Submitting..." : "Get Free Survival Guide"}
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

