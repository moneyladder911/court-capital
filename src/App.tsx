import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Messages from "./pages/Messages";
import Connections from "./pages/Connections";
import Events from "./pages/Events";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Matchmaking from "./pages/Matchmaking";
import Groups from "./pages/Groups";
import CreateSession from "./pages/CreateSession";
import Lessons from "./pages/Lessons";
import Manifesto from "./pages/Manifesto";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/events" element={<Events />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/matchmaking" element={<Matchmaking />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/create-session" element={<CreateSession />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
