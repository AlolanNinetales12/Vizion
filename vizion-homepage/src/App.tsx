// src/App.tsx
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import AnalyticsPage from "./components/AnalyticsPage";

const features: string[] = [
  "Interactive Charts",
  "Custom Dashboards",
  "Data Upload",
  "Export Options",
];

const App: React.FC = () => {
  const [page, setPage] = useState<string>("home");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex">
      <Sidebar current={page} onNavigate={setPage} />

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

        {page === "dashboard" && (
          <div className="p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Dashboards</h2>
            <p className="text-gray-600">Create and manage saved dashboards (coming soon).</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
