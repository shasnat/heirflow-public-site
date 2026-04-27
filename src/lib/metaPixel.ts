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
