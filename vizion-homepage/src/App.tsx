// src/App.tsx
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import AnalyticsPage from "./components/AnalyticsPage";
import ProjectsPage from "./components/ProjectsPage";
import LoginPage from "./components/LoginPage";

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
    (async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/projects-api/', { credentials: 'include' });
        setIsAuthenticated(res.ok);
      } catch (err) {
        setIsAuthenticated(false);
      }
    })();
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
    <div className="min-h-screen bg-gray-50 text-gray-800 flex">
      <Sidebar current={page} onNavigate={setPage} isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <main className="flex-1 p-6">
        {page === "home" && (
          <>
            <section className="text-center py-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded mb-6">
              <h2 className="text-4xl font-bold mb-2">Turn Data Into Insights</h2>
              <p className="text-lg">Interactive dashboards and visualizations to help you understand your data.</p>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div key={feature} className="bg-white shadow rounded p-4 text-center">
                  <h3 className="font-semibold text-lg mb-2">{feature}</h3>
                  <p className="text-gray-600 text-sm">Quick preview of the product capability.</p>
                </div>
              ))}
            </section>
          </>
        )}

        {page === "analytics" && <AnalyticsPage />}

        {page === "login" && (
          <LoginPage onSuccess={() => { setIsAuthenticated(true); setPage('dashboard'); }} />
        )}

        {page === "dashboard" && <ProjectsPage />}
      </main>
    </div>
  );
};

export default App;
