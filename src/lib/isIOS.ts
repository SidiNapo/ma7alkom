/**
 * iOS (Safari/Chrome/In-app) detection.
 * We use this only for performance/scroll-smoothness fallbacks.
 */
export function isIOSWebKit(): boolean {
  if (typeof navigator === "undefined") return false;

  // iPadOS 13+ reports as MacIntel but has touch points.
  const isIPadOS =
    navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1;

  const ua = navigator.userAgent || "";
  const isIOSUA = /iPad|iPhone|iPod/i.test(ua);

  return isIOSUA || isIPadOS;
}
