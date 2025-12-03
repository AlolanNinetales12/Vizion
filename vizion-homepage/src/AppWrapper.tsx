import React from 'react';
import DiagnosticsPage from './components/DiagnosticsPage';

const AppWrapper: React.FC = () => {
  const [renderDiag, setRenderDiag] = React.useState(true);

  React.useEffect(() => {
    console.log('[WRAPPER] App wrapper mounted');
    
    // Try to load the real app after diagnostics
    const timer = setTimeout(() => {
      console.log('[WRAPPER] Attempting to render real app...');
      // Keep showing diagnostics as overlay
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (renderDiag) {
    return <DiagnosticsPage />;
  }

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: '#ffffff',
      color: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'monospace',
    }}>
      <h1>Loading app...</h1>
    </div>
  );
};

export default AppWrapper;
