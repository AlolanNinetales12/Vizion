import React, { useMemo, useState } from "react";
import FileUploader from "./FileUploader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const AnalyticsPage: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [xCol, setXCol] = useState<string | null>(null);
  const [yCol, setYCol] = useState<string | null>(null);
  const [chartType, setChartType] = useState<"line" | "bar" | "pie">("line");

  const columns = useMemo(() => {
    if (!rows || rows.length === 0) return [];
    return Object.keys(rows[0]);
  }, [rows]);

  const numericColumns = useMemo(() => {
    return columns.filter((c) => rows.some((r) => typeof r[c] === "number"));
  }, [columns, rows]);

  const chartData = useMemo(() => {
    if (!rows || !xCol || !yCol) return [];
    return rows.map((r) => ({ name: String(r[xCol]), value: Number(r[yCol]) }));
  }, [rows, xCol, yCol]);

  const exampleCSV = `category,value,date
Apples,120,2025-11-01
Bananas,90,2025-11-02
Cherries,45,2025-11-03
Dates,60,2025-11-04
Elderberry,30,2025-11-05`;

  const downloadExample = () => {
    const blob = new Blob([exampleCSV], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "example.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-blue-300 mb-2">Data Analytics</h2>
        <p className="text-blue-400">Upload a CSV and visualize your data with interactive charts</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Upload and Instructions */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-blue-950 border border-blue-800 rounded-xl p-6 shadow-lg shadow-blue-500/10">
            <FileUploader onData={(d) => { setRows(d); setXCol(null); setYCol(null); }} />
          </div>

          <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-blue-950 border border-blue-800 rounded-xl p-6 shadow-lg shadow-blue-500/10">
            <div className="font-bold text-blue-300 mb-3 text-lg">📋 CSV Format</div>
            <div className="space-y-2 text-sm text-blue-300">
              <p>• Include a header row</p>
              <p>• Use comma-separated values</p>
              <p>• X column: dates or categories</p>
              <p>• Y column: numeric values</p>
            </div>
            <div className="mt-4">
              <div className="text-xs text-blue-400 mb-2 font-semibold">Example:</div>
              <pre className="bg-blue-900/40 border border-blue-700/30 rounded p-3 text-xs text-blue-200 overflow-auto max-h-32">{exampleCSV}</pre>
            </div>
            <button onClick={downloadExample} className="w-full mt-3 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-sm transition">
              ⬇ Download Example
            </button>
          </div>
        </div>

        {/* Chart and Controls */}
        <div className="md:col-span-2 bg-gradient-to-br from-blue-900 via-blue-950 to-blue-950 border border-blue-800 rounded-xl p-6 shadow-lg shadow-blue-500/10">
          <div className="space-y-4">
            {/* Controls */}
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-fit">
                <label htmlFor="x-col-select" className="block text-sm font-medium text-blue-300 mb-1.5">
                  X Column (Categories)
                </label>
                <select
                  id="x-col-select"
                  title="x column"
                  className="w-full px-3 py-2 bg-blue-900/30 border border-blue-700/50 rounded-lg text-blue-100 focus:outline-none focus:border-blue-500 transition"
                  value={xCol ?? ""}
                  onChange={(e) => setXCol(e.target.value || null)}
                >
                  <option value="">Select column</option>
                  {columns.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 min-w-fit">
                <label htmlFor="y-col-select" className="block text-sm font-medium text-blue-300 mb-1.5">
                  Y Column (Numbers)
                </label>
                <select
                  id="y-col-select"
                  title="y column"
                  className="w-full px-3 py-2 bg-blue-900/30 border border-blue-700/50 rounded-lg text-blue-100 focus:outline-none focus:border-blue-500 transition"
                  value={yCol ?? ""}
                  onChange={(e) => setYCol(e.target.value || null)}
                >
                  <option value="">Select column</option>
                  {numericColumns.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 min-w-fit">
                <label htmlFor="chart-select" className="block text-sm font-medium text-blue-300 mb-1.5">
                  Chart Type
                </label>
                <select
                  id="chart-select"
                  title="chart type"
                  className="w-full px-3 py-2 bg-blue-900/30 border border-blue-700/50 rounded-lg text-blue-100 focus:outline-none focus:border-blue-500 transition"
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value as any)}
                >
                  <option value="line">📈 Line</option>
                  <option value="bar">📊 Bar</option>
                  <option value="pie">🥧 Pie</option>
                </select>
              </div>
            </div>

            {/* Chart */}
            {chartData.length > 0 ? (
              <div className="w-full h-80 bg-blue-800/20 border border-blue-700/20 rounded-lg p-4">
                {chartType === "line" && (
                  <ResponsiveContainer>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e40af" />
                      <XAxis dataKey="name" stroke="#93c5fd" />
                      <YAxis stroke="#93c5fd" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0b2130",
                          border: "1px solid #1e40af",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#93c5fd" }}
                      />
                      <Line type="monotone" dataKey="value" stroke="#1e90ff" strokeWidth={2} dot={{ fill: "#1e90ff" }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}

                {chartType === "bar" && (
                  <ResponsiveContainer>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e40af" />
                      <XAxis dataKey="name" stroke="#93c5fd" />
                      <YAxis stroke="#93c5fd" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0b2130",
                          border: "1px solid #1e40af",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#93c5fd" }}
                      />
                      <Bar dataKey="value" fill="#1e90ff" />
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {chartType === "pie" && (
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} label={{ fill: "#93c5fd" }}>
                        {chartData.map((_, idx) => (
                          <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0b2130",
                          border: "1px solid #1e40af",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#93c5fd" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            ) : (
              <div className="w-full h-80 bg-blue-800/20 border border-blue-700/20 rounded-lg flex items-center justify-center">
                <p className="text-blue-400">Upload a CSV and select columns to visualize data</p>
              </div>
            )}
          </div>

          {/* Data Preview */}
          {rows.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-blue-300 mb-3">Data Preview ({rows.length} rows)</h3>
              <div className="overflow-auto max-h-64 border border-blue-700/30 rounded-lg bg-blue-900/20">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-blue-900/40 border-b border-blue-700/30 sticky top-0">
                    <tr>
                      {columns.map((c) => (
                        <th key={c} className="px-3 py-2 text-xs font-semibold text-blue-300">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.slice(0, 20).map((r, i) => (
                      <tr key={i} className={`border-b border-blue-700/20 ${i % 2 === 0 ? "bg-blue-900/10" : ""}`}>
                        {columns.map((c) => (
                          <td key={c} className="px-3 py-2 text-blue-200">
                            {String(r[c])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
