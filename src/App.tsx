import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Membership from "./pages/Membership";
import Contact from "./pages/Contact";
import TheHouse from "./pages/TheHouse";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { PrivateRoute } from "./components/PrivateRoute";
import { PortalLayout } from "./components/portal/PortalLayout";
import PortalHome from "./pages/portal/PortalHome";
import PortalMatches from "./pages/portal/PortalMatches";
import PortalTraining from "./pages/portal/PortalTraining";
import PortalEvents from "./pages/portal/PortalEvents";
import PortalLounge from "./pages/portal/PortalLounge";
import PortalProfile from "./pages/portal/PortalProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/the-house" element={<TheHouse />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* Private portal routes */}
          <Route
            path="/portal"
            element={
              <PrivateRoute>
                <PortalLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<PortalHome />} />
            <Route path="matches" element={<PortalMatches />} />
            <Route path="training" element={<PortalTraining />} />
            <Route path="events" element={<PortalEvents />} />
            <Route path="lounge" element={<PortalLounge />} />
            <Route path="profile" element={<PortalProfile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Only show WhatsApp button outside the portal */}
        <WhatsAppButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
