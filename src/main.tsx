import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.tsx";
import * as Sentry from "@sentry/react";
import FallbackComponent from "./feature/pages/fallback/FallbackComponent.tsx";

// Initialize Sentry as early as possible
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN as string,
  
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions. Downsample in production!
  
  // Optional: Session Replay (highly recommended to see visual bug reproductions)
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling, this captures 100% of sessions with an error.
  
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],

 

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true, 

  //Enable logs
  enableLogs: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<FallbackComponent />} showDialog>
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>
);
