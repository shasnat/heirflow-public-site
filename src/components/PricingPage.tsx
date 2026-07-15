import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowLeftRight,
  Calculator,
  Check,
  DollarSign,
  FileText,
  Landmark,
  Minus,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { appSignupUrl } from "../lib/appUrl";
import { cn } from "./ui/utils";

type BillingCadence = "monthly" | "annual";
type ModuleKey = "doc-filing" | "assets" | "accounting";

const AssetsIcon = (
  <span className="relative inline-flex">
    <Landmark className="h-6 w-6" aria-hidden />
    <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-600 text-white ring-2 ring-blue-50">
      <DollarSign className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
    </span>
  </span>
);

const MODULE_ORDER: { key: ModuleKey; name: string }[] = [
  { key: "doc-filing", name: "Document Filing" },
  { key: "assets", name: "Assets & Liabilities" },
  { key: "accounting", name: "Accounting" },
];

interface PricingTier {
  name: string;
  tagline: string;
  monthly: number;
  annual: number;
  includes: ModuleKey[];
  highlight?: boolean;
  badge?: string;
}

const TIERS: PricingTier[] = [
  {
    name: "Essentials",
    tagline: "File the estate's court documents with confidence.",
    monthly: 249,
    annual: 2388,
    includes: ["doc-filing"],
  },
  {
    name: "Professional",
    tagline: "File documents and marshal the estate's assets.",
    monthly: 599,
    annual: 5748,
    includes: ["doc-filing", "assets"],
  },
  {
    name: "Complete",
    tagline: "The full estate-administration workflow, end to end.",
    monthly: 949,
    annual: 7668,
    includes: ["doc-filing", "assets", "accounting"],
    highlight: true,
    badge: "Best value",
  },
];

interface PricingModule {
  key: ModuleKey;
  name: string;
  icon: ReactNode;
  tagline: string;
  monthly: number;
  annual: number;
  features: string[];
}

const MODULES: PricingModule[] = [
  {
    key: "doc-filing",
    name: "Document Filing",
    icon: <FileText className="h-6 w-6" aria-hidden />,
    tagline: "The right court forms, filled out and filed.",
    monthly: 249,
    annual: 2388,
    features: [
      "Pinpoints every court form and cover letter your matter needs and drafts them for you",
      "Walks you step by step through notarizing and filing each document with the court",
      "Turns court feedback into corrected, ready-to-refile amended forms",
    ],
  },
  {
    key: "assets",
    name: "Assets & Liabilities",
    icon: AssetsIcon,
    tagline: "Take control of the estate's assets and debts.",
    monthly: 349,
    annual: 3348,
    features: [
      "Builds a complete, organized inventory of the estate's assets as you go",
      "Generates the paperwork to marshal, appraise, and safeguard every asset",
      "Tells you exactly what to send, and to whom, at each step",
      "Shows you how to pay down or negotiate the estate's debts and liabilities",
    ],
  },
  {
    key: "accounting",
    name: "Accounting",
    icon: <Calculator className="h-6 w-6" aria-hidden />,
    tagline: "Account for every dollar and close out the estate.",
    monthly: 449,
    annual: 4308,
    features: [
      "Tracks every dollar that moves into and out of the estate",
      "Produces court-ready formal and informal accountings for judges and beneficiaries",
      "Guides you through final distributions and releasing the fiduciary",
    ],
  },
];

function formatPrice(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

function annualDiscountPct(monthly: number, annual: number): number {
  return Math.round((1 - annual / (monthly * 12)) * 100);
}

function effectiveMonthly(annual: number): number {
  // Annual totals are set to exactly 12x the charm per-month rate, so this is
  // an exact division; floor just guards against any future non-divisible value.
  return Math.floor(annual / 12);
}

export default function PricingPage() {
  const [cadence, setCadence] = useState<BillingCadence>("annual");
  const [showModules, setShowModules] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const toggleTier = (name: string) =>
    setSelectedTier((current) => (current === name ? null : name));

  // Keep this page out of search indexes while it is mounted. Pricing is in
  // flux and this route is intentionally unlisted.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const isAnnual = cadence === "annual";
  const selectedTierData =
    TIERS.find((tier) => tier.name === selectedTier) ?? null;
  const selectedModules = selectedTierData
    ? MODULES.filter((module) => selectedTierData.includes.includes(module.key))
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <section className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800">
            Pricing
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Pick the plan that covers how far you take the estate. Pricing is
            per seat.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="mt-8 flex items-center justify-center">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setCadence("monthly")}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                !isAnnual
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-800",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setCadence("annual")}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                isAnnual
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-800",
              )}
            >
              Annual
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-semibold",
                  isAnnual
                    ? "bg-white/20 text-white"
                    : "bg-green-100 text-green-700",
                )}
              >
                Save up to {showModules ? "20%" : "33%"}
              </span>
            </button>
          </div>
        </div>

        {/* Plan tiers — swapped with single modules via the link below */}
        {!showModules && (
          <>
            <div className="mt-10 grid items-start gap-6 md:grid-cols-3">
          {TIERS.map((tier) => {
            const price = isAnnual
              ? effectiveMonthly(tier.annual)
              : tier.monthly;
            const pct = annualDiscountPct(tier.monthly, tier.annual);
            const isSelected = selectedTier === tier.name;
            return (
              <Card
                key={tier.name}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => toggleTier(tier.name)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleTier(tier.name);
                  }
                }}
                className={cn(
                  "flex h-full cursor-pointer flex-col shadow-sm transition-all hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  tier.highlight &&
                    "border-blue-300 shadow-md ring-2 ring-blue-200 md:-mt-2",
                  isSelected &&
                    "border-blue-500 ring-2 ring-blue-500 shadow-md",
                )}
              >
                <CardHeader>
                  {tier.badge && isAnnual ? (
                    <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden />
                      {tier.badge}
                    </div>
                  ) : (
                    <div className="h-[26px]" aria-hidden />
                  )}
                  <CardTitle className="mt-2">{tier.name}</CardTitle>
                  <p className="text-sm text-slate-600">{tier.tagline}</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <div className="border-y border-slate-100 py-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold text-slate-900">
                        {formatPrice(price)}
                      </span>
                      <span className="text-sm font-medium text-slate-500">
                        / seat / month
                      </span>
                    </div>
                    {isAnnual ? (
                      <p className="mt-2 text-sm text-slate-500">
                        Billed annually at {formatPrice(tier.annual)} / seat ·{" "}
                        <span className="font-medium text-green-700">
                          save {pct}%
                        </span>
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-slate-500">Billed monthly</p>
                    )}
                  </div>
                  <ul className="mt-5 space-y-3">
                    {MODULE_ORDER.map((mod) => {
                      const included = tier.includes.includes(mod.key);
                      return (
                        <li
                          key={mod.key}
                          className={cn(
                            "flex items-center gap-2.5 text-sm",
                            included
                              ? "font-medium text-slate-800"
                              : "text-slate-400",
                          )}
                        >
                          {included ? (
                            <Check
                              className="h-4 w-4 shrink-0 text-blue-600"
                              aria-hidden
                            />
                          ) : (
                            <Minus
                              className="h-4 w-4 shrink-0 text-slate-300"
                              aria-hidden
                            />
                          )}
                          <span>{mod.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Selected-plan detail */}
        {selectedTierData ? (
          <div className="mx-auto mt-8 max-w-2xl">
            <Card className="border-blue-200 shadow-sm ring-1 ring-blue-100">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  What you get with {selectedTierData.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {isAnnual
                    ? `${formatPrice(effectiveMonthly(selectedTierData.annual))} / seat / month, billed annually at ${formatPrice(selectedTierData.annual)} / seat.`
                    : `${formatPrice(selectedTierData.monthly)} / seat / month.`}
                </p>
                <div className="mt-5 space-y-5">
                  {selectedModules.map((module) => (
                    <div key={module.key}>
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 [&_svg]:h-4 [&_svg]:w-4">
                          {module.icon}
                        </span>
                        <span className="font-medium text-slate-800">
                          {module.name}
                        </span>
                      </div>
                      <ul className="mt-2 space-y-2 pl-[42px]">
                        {module.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex gap-2.5 text-sm text-slate-700"
                          >
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                              aria-hidden
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {/* Purchase happens in the app (account creation + checkout are
                    authenticated), so this links out to app signup rather than a
                    heirflow.com payment flow. The plan is chosen again in-app. */}
                <Button
                  asChild
                  className="mt-6 w-full bg-blue-600 font-semibold text-white hover:bg-blue-700"
                >
                  <a href={appSignupUrl()}>Get started with {selectedTierData.name}</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <p className="mt-6 text-center text-sm text-slate-500">
            Select a plan to see everything it includes.
          </p>
        )}
          </>
        )}

        {/* Single modules — swapped in place of the plan tiers */}
        {showModules && (
          <div>
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-slate-500">
              Modules can be purchased on their own. Buying them separately costs
              more than the Complete plan, which bundles all three.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {MODULES.map((module) => {
                const price = isAnnual
                  ? effectiveMonthly(module.annual)
                  : module.monthly;
                const pct = annualDiscountPct(module.monthly, module.annual);
                return (
                  <Card
                    key={module.key}
                    className="flex h-full flex-col shadow-sm transition-shadow hover:shadow-md"
                  >
                    <CardHeader>
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        {module.icon}
                      </div>
                      <CardTitle className="mt-3">{module.name}</CardTitle>
                      <p className="text-sm text-slate-600">{module.tagline}</p>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col">
                      <div className="border-y border-slate-100 py-4">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-bold text-slate-900">
                            {formatPrice(price)}
                          </span>
                          <span className="text-sm font-medium text-slate-500">
                            / seat / month
                          </span>
                        </div>
                        {isAnnual ? (
                          <p className="mt-2 text-sm text-slate-500">
                            Billed annually at {formatPrice(module.annual)} /
                            seat ·{" "}
                            <span className="font-medium text-green-700">
                              save {pct}%
                            </span>
                          </p>
                        ) : (
                          <p className="mt-2 text-sm text-slate-500">
                            Billed monthly
                          </p>
                        )}
                      </div>
                      <ul className="mt-5 space-y-3">
                        {module.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex gap-2.5 text-sm text-slate-700"
                          >
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                              aria-hidden
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Swap between bundle tiers and single modules */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowModules((shown) => !shown)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeftRight className="h-4 w-4" aria-hidden />
            {showModules
              ? "Want everything together? Buy a bundle"
              : "Just need one part? Buy a single module"}
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          All prices are per seat. Pricing is preliminary and subject to change.
        </p>
      </section>
    </div>
  );
}
