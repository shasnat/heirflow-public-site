/**
 * Links from the marketing site to the HeirFlow app (app.heirflow.com).
 *
 * There is no payment or account creation on heirflow.com: self-service
 * purchase happens in-app, post-authentication. The marketing CTAs therefore
 * link to the app's account-creation page, where the user signs up and is then
 * routed into the in-app plan-selection + checkout surface.
 *
 * The app origin is configurable via `VITE_APP_URL` so non-prod deploys can
 * point at a staging app; it defaults to the production app origin.
 */
export function appBaseUrl(): string {
  // `||` (not `??`) so an empty-string env value falls back too, rather than
  // producing a broken relative "/signup/..." link.
  const configured = import.meta.env.VITE_APP_URL;
  return (configured || "https://app.heirflow.com").replace(/\/+$/, "");
}

/** Deep link to the app's account-creation page. Self-service purchasers are
 * attorneys (firm admins); heirs/executors join a case by invite, not here. */
export function appSignupUrl(role: string = "attorney"): string {
  return `${appBaseUrl()}/signup/${role}`;
}
