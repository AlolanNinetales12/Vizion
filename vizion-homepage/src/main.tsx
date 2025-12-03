import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

console.log('[DEBUG] main.tsx: Starting React app initialization...');

const rootElement = document.getElementById('root');
console.log('[DEBUG] main.tsx: Root element found:', rootElement);

if (!rootElement) {
  console.error('[DEBUG] main.tsx: FATAL - root element not found in DOM');
  throw new Error('Root element not found');
}

console.log('[DEBUG] main.tsx: Creating React root...');
const root = createRoot(rootElement);

console.log('[DEBUG] main.tsx: Rendering App component...');
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

console.log('[DEBUG] main.tsx: App rendered successfully');

// Add on-screen debug indicator
if (!(window as any).__vizionDebugInitialized) {
  (window as any).__vizionDebugInitialized = true;
  const debugDiv = document.createElement('div');
  debugDiv.id = 'vizion-debug-init';
  debugDiv.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    background: rgba(0, 200, 100, 0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 99999;
    font-family: monospace;
  `;
  debugDiv.textContent = '✓ Vizion app initializing...';
  document.body.appendChild(debugDiv);
  setTimeout(() => {
    if (document.getElementById('vizion-debug-init')) {
      debugDiv.remove();
    }
  }, 2000);
}
