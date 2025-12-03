import React from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

type Props = {
  onLoad: (rows: any[]) => void;
};

const DataUploadEnhanced: React.FC<Props> = ({ onLoad }) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const name = file.name.toLowerCase();
    if (name.endsWith('.csv')) {
      Papa.parse(file, { header: true, dynamicTyping: true, skipEmptyLines: true, complete: (res) => onLoad(res.data as any[]) });
    } else if (name.endsWith('.json')) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(String(reader.result));
          onLoad(Array.isArray(data) ? data : [data]);
        } catch (err) { console.error(err); }
      };
      reader.readAsText(file);
    } else if (name.endsWith('.xls') || name.endsWith('.xlsx')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const data = new Uint8Array(ev.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const ws = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(ws, { defval: null });
        onLoad(json as any[]);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Unsupported file type. Supported: CSV, JSON, Excel');
    }
  };

  return (
    <div className="p-4 bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-800 rounded-lg">
      <label className="block text-sm font-medium text-blue-300 mb-2">Upload data (CSV / JSON / Excel)</label>
      <input type="file" accept=".csv,.json,.xls,.xlsx" onChange={handleFile} className="file-input" />
      <div className="text-xs text-blue-400 mt-2">Files are validated client-side and previewed.</div>
    </div>
  );
};

export default DataUploadEnhanced;
