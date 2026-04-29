import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PrivateRoute } from "./components/PrivateRoute";
import { PortalLayout } from "./components/portal/PortalLayout";
import { WhatsAppButton } from "./components/WhatsAppButton";

// ── Public pages — lazy loaded
const Index      = lazy(() => import("./pages/Index"));
const About      = lazy(() => import("./pages/About"));
const Membership = lazy(() => import("./pages/Membership"));
const TheHouse   = lazy(() => import("./pages/TheHouse"));
const Contact    = lazy(() => import("./pages/Contact"));
const Login      = lazy(() => import("./pages/Login"));
const NotFound   = lazy(() => import("./pages/NotFound"));

// ── Portal pages — lazy loaded (won't be fetched until user enters portal)
const PortalHome     = lazy(() => import("./pages/portal/PortalHome"));
const PortalMatches  = lazy(() => import("./pages/portal/PortalMatches"));
const PortalTraining = lazy(() => import("./pages/portal/PortalTraining"));
const PortalEvents   = lazy(() => import("./pages/portal/PortalEvents"));
const PortalLounge   = lazy(() => import("./pages/portal/PortalLounge"));
const PortalProfile  = lazy(() => import("./pages/portal/PortalProfile"));

// Minimal full-screen loader shown during chunk fetches
function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-6 h-6 border border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,  // cache for 2 min — avoids refetch on tab switch
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public routes */}
            <Route path="/"           element={<Index />} />
            <Route path="/about"      element={<About />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/the-house"  element={<TheHouse />} />
            <Route path="/contact"    element={<Contact />} />
            <Route path="/login"      element={<Login />} />

            {/* Private portal routes */}
            <Route
              path="/portal"
              element={
                <PrivateRoute>
                  <PortalLayout />
                </PrivateRoute>
              }
            >
              <Route index            element={<PortalHome />} />
              <Route path="matches"   element={<PortalMatches />} />
              <Route path="training"  element={<PortalTraining />} />
              <Route path="events"    element={<PortalEvents />} />
              <Route path="lounge"    element={<PortalLounge />} />
              <Route path="profile"   element={<PortalProfile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
