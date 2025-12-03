import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DiagnosticsPage from './components/DiagnosticsPage'

// Immediately show on-screen status
function showStatus(msg: string, type: 'info' | 'error' | 'success' = 'info') {
  const statusDiv = document.getElementById('status') || (() => {
    const div = document.createElement('div');
    div.id = 'status';
    div.style.cssText = 'position:fixed;top:10px;left:10px;background:#000;color:#0f0;padding:15px;font-family:monospace;font-size:12px;z-index:99999;border:2px solid #0f0;max-width:300px;';
    document.body.appendChild(div);
    return div;
  })();
  
  const color = type === 'error' ? '#ff0000' : type === 'success' ? '#00ff00' : '#ffff00';
  statusDiv.innerHTML = `<div style="color:${color};white-space:pre-wrap;word-break:break-all">${msg}</div>`;
}

showStatus('🟡 Initializing React...');

try {
  showStatus('🟡 Finding root element...', 'info');
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    showStatus('🔴 ERROR: root element NOT found!\n\nCheck index.html has:\n<div id="root"></div>', 'error');
    throw new Error('Root element not found');
  }
  
  showStatus('🟢 Root found\n\n🟡 Creating React root...', 'success');
  const root = createRoot(rootElement);
  
  showStatus('🟢 Root created\n\n🟡 Rendering DiagnosticsPage...', 'success');
  
  root.render(
    <StrictMode>
      <DiagnosticsPage />
    </StrictMode>,
  );
  
  showStatus('🟢 React mounted!\n\nDiagnostics displaying below.\nAll console output captured.', 'success');
  
} catch (error: any) {
  showStatus(`🔴 FATAL ERROR\n\n${error?.message}\n\n${error?.stack || ''}`, 'error');
  document.body.innerHTML += `<div style="margin:50px 20px;color:red;font-family:monospace;background:#fee;padding:20px;border:2px solid red"><h2>🔴 INIT ERROR</h2><pre>${error?.stack || error?.message}</pre></div>`;
}

// Global handlers
window.addEventListener('error', (e) => {
  showStatus(`🔴 UNCAUGHT ERROR\n\n${e.message}`, 'error');
});

window.addEventListener('unhandledrejection', (e) => {
  showStatus(`🔴 UNHANDLED PROMISE\n\n${String(e.reason)}`, 'error');
});
