import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

type Props = {
  targetId?: string; // id of DOM element to export
};

const ExportControls: React.FC<Props> = ({ targetId = "root" }) => {
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

  const exportExcel = (data: any[] = []) => {
    const ws = XLSX.utils.json_to_sheet(data.length ? data : [{ note: 'No data provided' }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Export');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'export.xlsx');
  };

  return (
    <div className="flex gap-3">
      <button onClick={exportPNG} className="btn-primary">Export PNG</button>
      <button onClick={exportPDF} className="btn-outline">Export PDF</button>
      <button onClick={() => exportExcel()} className="btn-outline">Export Excel</button>
    </div>
  );
};

export default ExportControls;
