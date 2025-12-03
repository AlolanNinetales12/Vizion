import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

type Props = {
  targetId?: string; // id of DOM element to export
  data?: any[]; // optional data array for CSV export
};

const ExportControls: React.FC<Props> = ({ targetId = "root", data = [] }) => {
  const exportPNG = async () => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const canvas = await html2canvas(el);
    canvas.toBlob((blob) => { if (blob) saveAs(blob, 'export.png'); });
  };

  const exportPDF = async () => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const canvas = await html2canvas(el);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape' });
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('export.pdf');
  };

  const exportCSV = () => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }
    const headers = Object.keys(data[0]);
    const rows = data.map((row) => headers.map((h) => JSON.stringify(row[h] ?? '')).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'export.csv');
  };

  return (
    <div className="flex gap-3">
      <button onClick={exportPNG} className="btn-primary">Export PNG</button>
      <button onClick={exportPDF} className="btn-outline">Export PDF</button>
      {data.length > 0 && <button onClick={exportCSV} className="btn-outline">Export CSV</button>}
    </div>
  );
};

export default ExportControls;
