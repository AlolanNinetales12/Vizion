// src/App.tsx
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ProjectsPage from "./components/ProjectsPage";
import LoginPage from "./components/LoginPage";
import DashboardBuilder from "./components/DashboardBuilder";
import AccountPage from "./components/AccountPage";
import HomePage from "./components/HomePage";
import ErrorBoundary from "./components/ErrorBoundary";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [page, setPage] = useState<string>("home");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  console.log('[DEBUG] App: Rendering with page=', page, 'isAuthenticated=', isAuthenticated);

  // Check session on mount
  useEffect(() => {
    console.log('[DEBUG] App: useEffect - checking auth status...');
    // Use a lightweight auth-status endpoint to avoid 403 noise from protected endpoints
    (async () => {
      try {
        console.log('[DEBUG] App: Fetching /api/auth-status/...');
        const res = await fetch('http://127.0.0.1:8000/api/auth-status/', { credentials: 'include' });
        console.log('[DEBUG] App: auth-status response:', res.status);
        if (res.ok) {
          const j = await res.json();
          console.log('[DEBUG] App: auth-status data:', j);
          setIsAuthenticated(Boolean(j.authenticated));
        } else {
          console.log('[DEBUG] App: auth-status not ok, setting authenticated=false');
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('[DEBUG] App: auth-status fetch error:', err);
        setIsAuthenticated(false);
      }
    })();
  }, []);

  // listen for global navigation events from components
  useEffect(() => {
    console.log('[DEBUG] App: Setting up vizion:navigate event listener');
    const handler = (e: any) => {
      console.log('[DEBUG] App: vizion:navigate event received with detail:', e?.detail);
      if (e?.detail && typeof e.detail === 'string') setPage(e.detail);
    };
    window.addEventListener('vizion:navigate', handler as EventListener);
    return () => {
      console.log('[DEBUG] App: Removing vizion:navigate event listener');
      window.removeEventListener('vizion:navigate', handler as EventListener);
    };
  }, []);

  const handleLogout = async () => {
    console.log('[DEBUG] App: handleLogout called');
    try {
      console.log('[DEBUG] App: Fetching logout endpoint...');
      await fetch('http://127.0.0.1:8000/logout/', { credentials: 'include' });
      console.log('[DEBUG] App: Logout successful');
    } catch (err) {
      console.error('[DEBUG] App: Logout error:', err);
    }
    setIsAuthenticated(false);
    setPage('home');
  };

  // If not authenticated, show landing page
  console.log('[DEBUG] App: isAuthenticated=', isAuthenticated, '-> rendering', isAuthenticated ? 'authenticated layout' : 'HomePage');
  
  if (!isAuthenticated) {
    console.log('[DEBUG] App: Rendering HomePage');
    return (
      <ErrorBoundary componentName="HomePage">
        <HomePage onNavigate={setPage} />
      </ErrorBoundary>
    );
  }

  // If authenticated, show sidebar + dashboard layout
  console.log('[DEBUG] App: Rendering authenticated layout with page=', page);
  return (
    <ErrorBoundary componentName="AuthenticatedLayout">
      <div className={styles.container}>
        <Sidebar current={page} onNavigate={setPage} isAuthenticated={isAuthenticated} onLogout={handleLogout} />

        <main className={styles.mainContent}>
          {page === "analytics" && (
            <ErrorBoundary componentName="ProjectsPage">
              <ProjectsPage />
            </ErrorBoundary>
          )}

          {page === "builder" && (
            <ErrorBoundary componentName="DashboardBuilder">
              <DashboardBuilder />
            </ErrorBoundary>
          )}

          {page === "login" && (
            <ErrorBoundary componentName="LoginPage">
              <LoginPage onSuccess={() => { setIsAuthenticated(true); setPage('dashboard'); }} />
            </ErrorBoundary>
          )}

          {page === "account" && (
            <ErrorBoundary componentName="AccountPage">
              <AccountPage />
            </ErrorBoundary>
          )}

          {page === "dashboard" && (
            <ErrorBoundary componentName="ProjectsPage">
              <ProjectsPage />
            </ErrorBoundary>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;
