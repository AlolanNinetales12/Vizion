import React from 'react';

interface LogEntry {
  time: string;
  level: 'LOG' | 'ERROR' | 'WARN' | 'INFO';
  message: string;
}

const DiagnosticsPage: React.FC = () => {
  const [logs, setLogs] = React.useState<LogEntry[]>([]);
  const [showDebug, setShowDebug] = React.useState(true);

  React.useEffect(() => {
    // Capture all console output
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    const addLog = (level: 'LOG' | 'ERROR' | 'WARN' | 'INFO', ...args: any[]) => {
      const message = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      const time = new Date().toLocaleTimeString();
      setLogs(prev => [...prev, { time, level, message }].slice(-100));
    };

    console.log = function(...args: any[]) {
      originalLog(...args);
      addLog('LOG', ...args);
    };

    console.error = function(...args: any[]) {
      originalError(...args);
      addLog('ERROR', ...args);
    };

    console.warn = function(...args: any[]) {
      originalWarn(...args);
      addLog('WARN', ...args);
    };

    window.addEventListener('error', (e) => {
      addLog('ERROR', `Uncaught Error: ${e.message} @ ${e.filename}:${e.lineno}:${e.colno}`);
    });

    window.addEventListener('unhandledrejection', (e) => {
      addLog('ERROR', `Unhandled Promise Rejection: ${e.reason}`);
    });

    addLog('INFO', 'Diagnostics page loaded');

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: '#ffffff',
      color: '#000000',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'monospace',
      fontSize: '12px',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        background: '#000000',
        color: '#00ff00',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid #00ff00',
      }}>
        <h2 style={{ margin: '0', fontSize: '14px' }}>🔍 VIZION DIAGNOSTICS</h2>
        <button
          onClick={() => setShowDebug(!showDebug)}
          style={{
            background: '#000000',
            color: '#00ff00',
            border: '1px solid #00ff00',
            padding: '5px 10px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          {showDebug ? 'Hide Logs' : 'Show Logs'}
        </button>
      </div>

      {/* System Info */}
      <div style={{
        background: '#f5f5f5',
        color: '#000000',
        padding: '10px',
        borderBottom: '1px solid #cccccc',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '10px',
        fontSize: '11px',
      }}>
        <div><strong>📍 URL:</strong> {window.location.href}</div>
        <div><strong>🕐 Time:</strong> {new Date().toLocaleTimeString()}</div>
        <div><strong>📱 User Agent:</strong> {navigator.userAgent.slice(0, 60)}...</div>
        <div><strong>💾 Local Storage:</strong> {Object.keys(localStorage).length} items</div>
        <div><strong>🍪 Cookies:</strong> {document.cookie ? document.cookie.length : 0} bytes</div>
        <div><strong>✅ React Mounted:</strong> Yes</div>
      </div>

      {/* Logs Display */}
      {showDebug && (
        <div style={{
          flex: 1,
          background: '#000000',
          color: '#00ff00',
          padding: '10px',
          overflowY: 'auto',
          borderTop: '1px solid #00ff00',
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '12px' }}>📋 CONSOLE LOGS ({logs.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {logs.map((log, i) => (
              <div key={i} style={{
                color: log.level === 'ERROR' ? '#ff6666' : log.level === 'WARN' ? '#ffff00' : '#00ff00',
                padding: '2px 5px',
                borderLeft: '2px solid ' + (log.level === 'ERROR' ? '#ff6666' : log.level === 'WARN' ? '#ffff00' : '#00ff00'),
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontSize: '11px',
              }}>
                <span style={{ opacity: 0.7 }}>[{log.time}]</span> <span style={{ opacity: 0.8 }}>[{log.level}]</span> {log.message}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Summary */}
      <div style={{
        background: '#e8f5e9',
        color: '#2e7d32',
        padding: '10px',
        borderTop: '1px solid #cccccc',
        fontSize: '11px',
      }}>
        <strong>✅ Status:</strong> App is running ({logs.length} log entries) • Last log: {logs[logs.length - 1]?.time || 'N/A'}
      </div>
    </div>
  );
};

export default DiagnosticsPage;
