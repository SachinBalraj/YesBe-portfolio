import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { isHydrationTargetPath } from "./utils/hydration";
import { initAnalytics } from "./utils/analytics";
import "@/styles/globals.css";

initAnalytics();

const rootElement = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The Phase 2 pages are prerendered and have no lazy sections above the fold,
// so hydrating preserves their first paint. Other routes still mount from
// scratch until their lazy boundaries are hydration-safe.
if (!rootElement.querySelector("#app-loader") && isHydrationTargetPath(window.location.pathname)) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
