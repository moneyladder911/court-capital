import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Discover from "@/pages/Discover";
import Events from "@/pages/Events";
import Lessons from "@/pages/Lessons";
import Leaderboard from "@/pages/Leaderboard";
import Profile from "@/pages/Profile";
import Auth from "@/pages/Auth";
import Messages from "@/pages/Messages";
import CreateSession from "@/pages/CreateSession";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/events" element={<Events />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/create-session" element={<CreateSession />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
