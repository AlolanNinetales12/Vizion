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
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <FileUploader onData={(d) => { setRows(d); setXCol(null); setYCol(null); }} />

          <div className="mt-4 bg-white border rounded p-3 text-sm text-gray-700">
            <div className="font-semibold mb-2">CSV format & example</div>
            <div className="mb-2">
              - Provide a header row. The file must be UTF-8 encoded CSV.
            </div>
            <div className="mb-2">
              - Choose an X column (categorical or date) and a numeric Y column.
            </div>
            <div className="mb-2">Example (comma separated):</div>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">{exampleCSV}</pre>
            <button onClick={downloadExample} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">Download example CSV</button>
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-4 rounded shadow">
          <div className="flex flex-wrap gap-4 items-center mb-4">
            <div>
              <label htmlFor="x-col-select" className="block text-sm">X column</label>
              <select id="x-col-select" className="border p-2" value={xCol ?? ""} onChange={(e) => setXCol(e.target.value || null)}>
                <option value="">Select column</option>
                {columns.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="y-col-select" className="block text-sm">Y column</label>
              <select id="y-col-select" className="border p-2" value={yCol ?? ""} onChange={(e) => setYCol(e.target.value || null)}>
                <option value="">Select column</option>
                {numericColumns.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="chart-select" className="block text-sm">Chart</label>
              <select id="chart-select" className="border p-2" value={chartType} onChange={(e) => setChartType(e.target.value as any)}>
                <option value="line">Line</option>
                <option value="bar">Bar</option>
                <option value="pie">Pie</option>
              </select>
            </div>
          </div>

          <div className="w-full h-80">
            {chartType === "line" && (
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            )}

            {chartType === "bar" && (
              <ResponsiveContainer>
                <BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#82ca9d" /></BarChart>
              </ResponsiveContainer>
            )}

            {chartType === "pie" && (
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} label>
                    {chartData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Data preview</h3>
            <div className="overflow-auto max-h-64 border rounded">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    {columns.map((c) => (
                      <th key={c} className="px-2 py-1 text-xs text-gray-600">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 20).map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      {columns.map((c) => (
                        <td key={c} className="px-2 py-1 text-sm">{String(r[c])}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
