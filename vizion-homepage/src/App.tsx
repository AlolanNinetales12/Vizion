// src/App.tsx
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import AnalyticsPage from "./components/AnalyticsPage";
import ProjectsPage from "./components/ProjectsPage";
import LoginPage from "./components/LoginPage";
import DashboardBuilder from "./components/DashboardBuilder";
import AccountPage from "./components/AccountPage";

const features: string[] = [
  "Interactive Charts",
  "Custom Dashboards",
  "Data Upload",
  "Export Options",
];

const App: React.FC = () => {
  const [page, setPage] = useState<string>("home");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check session on mount
  useEffect(() => {
    // Use a lightweight auth-status endpoint to avoid 403 noise from protected endpoints
    (async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/auth-status/', { credentials: 'include' });
        if (res.ok) {
          const j = await res.json();
          setIsAuthenticated(Boolean(j.authenticated));
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    })();
  }, []);

  // listen for global navigation events from components
  useEffect(() => {
    const handler = (e: any) => {
      if (e?.detail && typeof e.detail === 'string') setPage(e.detail);
    };
    window.addEventListener('vizion:navigate', handler as EventListener);
    return () => window.removeEventListener('vizion:navigate', handler as EventListener);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://127.0.0.1:8000/logout/', { credentials: 'include' });
    } catch (err) {
      console.error(err);
    }
    setIsAuthenticated(false);
    setPage('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-gray-100 flex">
      <Sidebar current={page} onNavigate={setPage} isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <main className="flex-1 p-8">
        {page === "home" && (
          <>
            <section className="mb-8">
              <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mb-2">
                Turn Data Into Insights
              </h2>
              <p className="text-lg text-blue-300">
                Interactive dashboards and visualizations to help you understand your data.
              </p>
            </section>

            <section className="grid md:grid-cols-4 gap-6 mb-12">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="bg-gradient-to-br from-blue-900 via-blue-950 to-blue-950 border border-blue-800 shadow-lg shadow-blue-500/10 rounded-xl p-6 text-center hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/20 transition"
                >
                  <h3 className="font-semibold text-lg mb-2 text-blue-300">{feature}</h3>
                  <p className="text-blue-400 text-sm">Powerful analytics capabilities for your data</p>
                </div>
              ))}
            </section>
          </>
        )}

        {page === "analytics" && <AnalyticsPage />}

        {page === "builder" && <DashboardBuilder />}

        {page === "login" && (
          <LoginPage onSuccess={() => { setIsAuthenticated(true); setPage('dashboard'); }} />
        )}

        {page === "account" && <AccountPage />}

        {page === "dashboard" && <ProjectsPage />}
      </main>
    </div>
  );
};

export default App;
