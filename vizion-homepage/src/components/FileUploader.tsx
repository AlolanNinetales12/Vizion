import React from "react";
import Papa from "papaparse";

type Props = {
  onData: (rows: any[]) => void;
};

const FileUploader: React.FC<Props> = ({ onData }) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        onData(results.data as any[]);
      },
      error: (err) => {
        console.error("CSV parse error:", err);
      },
    });
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <label htmlFor="csv-file" className="block text-sm font-medium text-gray-700 mb-2">Upload CSV</label>
      <input id="csv-file" aria-label="Upload CSV file" type="file" accept=".csv,text/csv" onChange={handleFile} />
      <p className="text-xs text-gray-500 mt-2">CSV should include a header row. Dates or categories are fine for X column; Y should be numeric.</p>
    </div>
  );
};

export default FileUploader;
