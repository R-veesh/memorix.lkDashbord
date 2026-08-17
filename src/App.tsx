import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import Overview from "./pages/Overview";
import Sources from "./pages/Sources";
import Pipeline from "./pages/Pipeline";
import Retrieval from "./pages/Retrieval";
import Agents from "./pages/Agents";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/sources" element={<Sources />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/retrieval" element={<Retrieval />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
