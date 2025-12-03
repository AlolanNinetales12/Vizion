import React, { useCallback, useRef, useState } from "react";
import Papa from "papaparse";

type Props = {
  onData: (rows: any[]) => void;
  accept?: string;
};

const FileUploader: React.FC<Props> = ({ onData, accept = ".csv,text/csv" }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const parseFile = useCallback((file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      worker: true,
      complete: (results) => {
        onData(results.data as any[]);
      },
      error: (err) => {
        console.error("CSV parse error:", err);
      },
    });
  }, [onData]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    parseFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) parseFile(file);
  };

  return (
    <div>
      <label className="block text-lg font-semibold text-blue-300 mb-2">📤 Upload Data</label>
      <div
        role="region"
        aria-label="File upload dropzone"
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`p-6 rounded-lg border-2 ${dragOver ? 'border-dashed border-blue-400 bg-blue-900/20' : 'border-transparent bg-[#041018]'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') fileRef.current?.click();
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="text-blue-200 font-medium">Drag & drop CSV here</div>
            <div className="text-sm text-blue-400">Or click to browse — supports CSV with header row</div>
          </div>
          <div>
            <button
              onClick={() => fileRef.current?.click()}
              className="px-3 py-2 rounded bg-blue-700 hover:bg-blue-600 text-white"
            >
              Browse
            </button>
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept={accept}
          onChange={handleInput}
          className="hidden"
          aria-hidden
          aria-label="Upload file"
          title="Upload file"
        />
      </div>
      <p className="text-xs text-blue-400 mt-2">Supports CSV. For Excel/JSON upload use the advanced uploader.</p>
    </div>
  );
};

export default FileUploader;
