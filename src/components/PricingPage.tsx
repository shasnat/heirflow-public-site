import { useEffect, useState, type ReactNode } from "react";
import {
  Calculator,
  Check,
  Clock,
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
type ModuleStatus = "live" | "coming";

const AssetsIcon = (
  <span className="relative inline-flex">
    <Landmark className="h-6 w-6" aria-hidden />
    <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-600 text-white ring-2 ring-blue-50">
      <DollarSign className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
    </span>
  </span>
);

// Module availability drives the pre-sale messaging. Document Filing is live
// today; Accounting and Assets & Liabilities are pre-sold with the Complete
// plan and ship on the timeline below. Order reflects the ship roadmap.
const MODULE_ORDER: {
  key: ModuleKey;
  name: string;
  status: ModuleStatus;
  eta?: string;
}[] = [
  { key: "doc-filing", name: "Document Filing", status: "live" },
  {
    key: "accounting",
    name: "Accounting",
    status: "coming",
    eta: "Coming August 2026",
  },
  {
    key: "assets",
    name: "Assets & Liabilities",
    status: "coming",
    eta: "Coming soon",
  },
];

const moduleMeta = (key: ModuleKey) =>
  MODULE_ORDER.find((mod) => mod.key === key)!;

interface PricingTier {
  name: string;
  tagline: string;
  monthly: number;
  annual: number;
  includes: ModuleKey[];
  highlight?: boolean;
  badge?: string;
  note?: string;
  /** Displayed but not yet purchasable: muted, badged, non-interactive. No tier
   *  is coming-soon during the Complete pre-sale, but the mechanism is kept so a
   *  future tier can be teased before launch by setting this flag. */
  comingSoon?: boolean;
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
    name: "Complete",
    tagline: "The full estate-administration workflow, end to end.",
    monthly: 349,
    annual: 3349,
    includes: ["doc-filing", "accounting", "assets"],
    highlight: true,
    badge: "Early access",
    note: "Early-access rate, locked in now. It rises as the Accounting and Assets & Liabilities modules ship.",
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
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const toggleTier = (name: string) => {
    // Coming-soon tiers are informational only and cannot be selected.
    if (TIERS.find((tier) => tier.name === name)?.comingSoon) return;
    setSelectedTier((current) => (current === name ? null : name));
  };

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
  // Advertise only a discount a visitor can actually get today: the best annual
  // saving across purchasable tiers.
  const purchasableTiers = TIERS.filter((tier) => !tier.comingSoon);
  const maxDiscount = Math.max(
    ...purchasableTiers.map((tier) =>
      annualDiscountPct(tier.monthly, tier.annual),
    ),
  );
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
            Start with Document Filing, or lock in the Complete plan at an
            early-access rate while the remaining modules ship. Pricing is per
            seat.
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
                Save up to {maxDiscount}%
              </span>
            </button>
          </div>
        </div>

        {/* Plan tiers */}
        <div className="mx-auto mt-10 grid max-w-3xl items-start gap-6 md:grid-cols-2">
          {TIERS.map((tier) => {
            const price = isAnnual
              ? effectiveMonthly(tier.annual)
              : tier.monthly;
            const pct = annualDiscountPct(tier.monthly, tier.annual);
            const isSelected = selectedTier === tier.name;
            const comingSoon = tier.comingSoon;
            const interactive = !comingSoon;
            return (
              <Card
                key={tier.name}
                role={interactive ? "button" : undefined}
                tabIndex={interactive ? 0 : undefined}
                aria-pressed={interactive ? isSelected : undefined}
                aria-disabled={comingSoon || undefined}
                onClick={interactive ? () => toggleTier(tier.name) : undefined}
                onKeyDown={
                  interactive
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          toggleTier(tier.name);
                        }
                      }
                    : undefined
                }
                className={cn(
                  "flex h-full flex-col shadow-sm transition-all",
                  interactive &&
                    "cursor-pointer hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  // Coming-soon tiers read as unavailable: dashed, muted, dimmed.
                  comingSoon && "border-dashed border-slate-300 bg-slate-50/70 opacity-80",
                  !comingSoon &&
                    tier.highlight &&
                    "border-blue-300 shadow-md ring-2 ring-blue-200 md:-mt-2",
                  isSelected &&
                    "border-blue-500 ring-2 ring-blue-500 shadow-md",
                )}
              >
                <CardHeader>
                  {comingSoon ? (
                    <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                      Coming soon
                    </div>
                  ) : tier.badge ? (
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
                    {comingSoon ? (
                      // Pricing is withheld until the tier launches.
                      <p className="text-sm font-medium text-slate-500">
                        Pricing announced at launch
                      </p>
                    ) : (
                      <>
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
                        {tier.note ? (
                          <p className="mt-3 flex gap-1.5 text-xs text-amber-700">
                            <Sparkles
                              className="mt-0.5 h-3.5 w-3.5 shrink-0"
                              aria-hidden
                            />
                            <span>{tier.note}</span>
                          </p>
                        ) : null}
                      </>
                    )}
                  </div>
                  <ul className="mt-5 space-y-3">
                    {MODULE_ORDER.map((mod) => {
                      const included = tier.includes.includes(mod.key);
                      const coming = included && mod.status === "coming";
                      return (
                        <li
                          key={mod.key}
                          className={cn(
                            "flex items-center gap-2.5 text-sm",
                            !included && "text-slate-400",
                            included && !coming && "font-medium text-slate-800",
                            coming && "text-slate-600",
                          )}
                        >
                          {!included ? (
                            <Minus
                              className="h-4 w-4 shrink-0 text-slate-300"
                              aria-hidden
                            />
                          ) : coming ? (
                            <Clock
                              className="h-4 w-4 shrink-0 text-amber-500"
                              aria-hidden
                            />
                          ) : (
                            <Check
                              className="h-4 w-4 shrink-0 text-blue-600"
                              aria-hidden
                            />
                          )}
                          <span>
                            {mod.name}
                            {coming ? (
                              <span className="ml-1.5 text-xs font-medium text-amber-700">
                                {mod.eta}
                              </span>
                            ) : null}
                          </span>
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
                  {selectedModules.map((module) => {
                    const meta = moduleMeta(module.key);
                    const coming = meta.status === "coming";
                    return (
                      <div key={module.key}>
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 [&_svg]:h-4 [&_svg]:w-4">
                            {module.icon}
                          </span>
                          <span className="font-medium text-slate-800">
                            {module.name}
                          </span>
                          {coming ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                              <Clock className="h-3 w-3" aria-hidden />
                              {meta.eta}
                            </span>
                          ) : null}
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
                    );
                  })}
                </div>
                {/* Purchase happens in the app (account creation + checkout are
                    authenticated), so this links out to app signup rather than a
                    heirflow.com payment flow. The plan is chosen again in-app. */}
                <Button
                  asChild
                  className="mt-6 w-full bg-blue-600 font-semibold text-white hover:bg-blue-700"
                >
                  <a href={appSignupUrl()}>Try for Free</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <p className="mt-6 text-center text-sm text-slate-500">
            Select a plan to see everything it includes.
          </p>
        )}

        <p className="mt-10 text-center text-sm text-slate-500">
          All prices are per seat. The Complete plan is an early-access rate that
          increases as new modules ship. Pricing is preliminary and subject to
          change.
        </p>
      </section>
    </div>
  );
}
