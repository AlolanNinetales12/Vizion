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
    <div className="space-y-3">
      <label htmlFor="csv-file" className="block text-lg font-semibold text-blue-300">
        📤 Upload CSV File
      </label>
      <input
        id="csv-file"
        aria-label="Upload CSV file"
        type="file"
        accept=".csv,text/csv"
        className="w-full text-sm text-blue-400 file:bg-blue-600 file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:cursor-pointer file:font-semibold hover:file:bg-blue-500 transition"
        onChange={handleFile}
      />
      <p className="text-xs text-blue-400">
        CSV should include a header row. Dates or categories are fine for X column; Y should be numeric.
      </p>
    </div>
  );
};

export default FileUploader;
