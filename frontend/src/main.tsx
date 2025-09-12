import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "./contexts/SnackbarContext.tsx";
import { LatLongProvider } from "./contexts/LatLongContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <LatLongProvider>
          <App />
        </LatLongProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  </StrictMode>
);
