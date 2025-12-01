// src/App.tsx
import React from "react";

const features: string[] = [
  "Interactive Charts",
  "Custom Dashboards",
  "Data Upload",
  "Export Options",
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Vizion Analytics</h1>
          <nav className="space-x-6">
            <a href="#" className="hover:text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600">Dashboards</a>
            <a href="#" className="hover:text-blue-600">Datasets</a>
            <a href="#" className="hover:text-blue-600">About</a>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h2 className="text-4xl font-bold mb-4">Turn Data Into Insights</h2>
        <p className="text-lg mb-6">
          Interactive dashboards and visualizations to help you understand your data.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-blue-600 px-6 py-2 rounded shadow hover:bg-gray-100">
            Get Started
          </button>
          <button className="bg-indigo-700 px-6 py-2 rounded shadow hover:bg-indigo-800">
            Upload Data
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div key={feature} className="bg-white shadow rounded p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">{feature}</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        ))}
      </section>

      {/* Sample Visualization Placeholder */}
      <section className="text-center py-16 bg-gray-100">
        <h3 className="text-2xl font-bold mb-4">Sample Visualization</h3>
        <div className="mx-auto w-2/3 h-64 bg-white shadow rounded flex items-center justify-center">
          <span className="text-gray-400">[ Chart Placeholder ]</span>
        </div>
      </section>

      {/* About */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h3 className="text-2xl font-bold mb-4">About Vizion</h3>
        <p className="text-gray-600">
          Vizion is a learning project designed to make analytics simple and accessible.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 text-center">
        <p>© 2025 Vizion Analytics. Built with React + Tailwind.</p>
        <div className="space-x-4 mt-2">
          <a href="#" className="hover:text-white">GitHub</a>
          <a href="#" className="hover:text-white">Docs</a>
          <a href="#" className="hover:text-white">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
