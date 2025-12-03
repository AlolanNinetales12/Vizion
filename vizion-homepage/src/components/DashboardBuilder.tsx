import React from "react";

// Lightweight dashboard builder skeleton. For full drag/drop use a
// library like `react-grid-layout` or `@hello-pangea/dnd`.

const DashboardBuilder: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-300 mb-4">Dashboard Builder</h2>
      <p className="text-blue-400 mb-4">Create a custom dashboard by adding widgets. Drag & drop support coming soon.</p>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="col-span-1 bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-800 rounded-xl p-4">
          <h3 className="font-semibold text-blue-200 mb-2">Widgets</h3>
          <ul className="space-y-2 text-blue-300 text-sm">
            <li>• Line Chart</li>
            <li>• Bar Chart</li>
            <li>• Pie Chart</li>
            <li>• Table</li>
            <li>• KPI</li>
          </ul>
        </div>

        <div className="md:col-span-2 bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-800 rounded-xl p-6 min-h-[240px]">
          <div className="text-blue-400">Drop area (placeholder). Widgets will snap into the grid here.</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBuilder;
