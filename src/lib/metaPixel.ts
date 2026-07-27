type FbqFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded?: boolean;
  version?: string;
  push?: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq?: FbqFunction;
  }
}

/**
 * Tracks a standard page view event.
 * Use this on route changes in SPAs. Initial PageView comes from index.html.
 */
export const trackPageView = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.fbq?.("track", "PageView");
};

type StandardMetaEvent = "Contact" | "Schedule" | "Lead" | "CompleteRegistration";

/**
 * Tracks standard Meta Pixel events used for ad optimization/reporting.
 * Prefer this for key conversion milestones (Contact, Schedule, Lead, etc.).
 */
export const trackStandardEvent = (
  eventName: StandardMetaEvent,
  params?: Record<string, unknown>
): void => {
  if (typeof window === "undefined") {
    return;
  }

  if (params) {
    window.fbq?.("track", eventName, params);
    return;
  }

  window.fbq?.("track", eventName);
};

/**
 * Tracks custom Meta Pixel events.
 * Example: trackEvent("ContactSalesClick", { pageName: "landing" });
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>
): void => {
  if (typeof window === "undefined") {
    return;
  }

  if (params) {
    window.fbq?.("trackCustom", eventName, params);
    return;
  }

  window.fbq?.("trackCustom", eventName);
};

/**
 * Fires a single `Schedule` conversion when the user *actually books* via the
 * Calendly inline widget — detected from Calendly's `calendly.event_scheduled`
 * postMessage, not on page load. Also emits a distinct `ViewSchedulePage`
 * custom event immediately so the "reached booking page" funnel step is still
 * counted (without being mistaken for a conversion).
 *
 * Returns a cleanup function; call it on component unmount.
 */
export const observeCalendlyBooking = (
  params?: Record<string, unknown>
): (() => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  trackEvent("ViewSchedulePage", params);

  let booked = false;

  const isCalendlyMessage = (
    e: MessageEvent
  ): e is MessageEvent<{ event: string }> =>
    typeof e.data === "object" &&
    e.data !== null &&
    typeof (e.data as { event?: unknown }).event === "string" &&
    (e.data as { event: string }).event.indexOf("calendly.") === 0;

  const handler = (e: MessageEvent): void => {
    if (booked || !isCalendlyMessage(e)) {
      return;
    }
    if (e.data.event === "calendly.event_scheduled") {
      booked = true;
      trackStandardEvent("Schedule", params);
    }
  };

  window.addEventListener("message", handler);
  return () => window.removeEventListener("message", handler);
};

/**
 * Fires a single `Lead` conversion when the Brevo form is *actually submitted
 * successfully* — detected by watching the form's success panel become visible,
 * not on page load. Also emits a distinct `ViewLeadForm` custom event
 * immediately so the "reached form page" funnel step is still counted.
 *
 * Returns a cleanup function; call it on component unmount.
 */
export const observeBrevoLeadSuccess = (
  params?: Record<string, unknown>,
  successElementId = "success-message"
): (() => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  trackEvent("ViewLeadForm", params);

  let fired = false;
  let cancelled = false;
  let observer: MutationObserver | undefined;
  let rafId = 0;

  const isVisible = (el: HTMLElement): boolean =>
    window.getComputedStyle(el).display !== "none";

  const start = (): void => {
    if (cancelled) {
      return;
    }
    // The Brevo form HTML is injected into the DOM after mount, so the success
    // panel may not exist yet — retry until it does.
    const el = document.getElementById(successElementId);
    if (!el) {
      rafId = window.requestAnimationFrame(start);
      return;
    }
    observer = new MutationObserver(() => {
      if (fired || cancelled) {
        return;
      }
      if (isVisible(el)) {
        fired = true;
        trackStandardEvent("Lead", params);
        observer?.disconnect();
      }
    });
    observer.observe(el, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });
  };

  start();

  return () => {
    cancelled = true;
    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }
    observer?.disconnect();
  };
};
