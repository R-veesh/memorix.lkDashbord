import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import Overview from "./pages/Overview";
import Sources from "./pages/Sources";
import Pipeline from "./pages/Pipeline";
import Retrieval from "./pages/Retrieval";
import Agents from "./pages/Agents";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./hooks/useAuth";
import { Loader2 } from "lucide-react";

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/sources" element={<Sources />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/retrieval" element={<Retrieval />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
