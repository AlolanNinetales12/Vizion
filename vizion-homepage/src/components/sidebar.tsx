import React from "react";

type Props = {
  current: string;
  onNavigate: (page: string) => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
};

const Sidebar: React.FC<Props> = ({ current, onNavigate, isAuthenticated, onLogout }) => {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Vizion</h1>
        <p className="text-sm text-gray-500">Data Analytics</p>
      </div>

      <nav className="space-y-2">
        <button
          onClick={() => onNavigate("home")}
          className={`w-full text-left px-3 py-2 rounded ${current === "home" ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
        >
          Home
        </button>

        <button
          onClick={() => onNavigate("analytics")}
          className={`w-full text-left px-3 py-2 rounded ${current === "analytics" ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
        >
          Analytics
        </button>

        <button
          onClick={() => onNavigate("dashboard")}
          className={`w-full text-left px-3 py-2 rounded ${current === "dashboard" ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
        >
          Dashboards
        </button>

        {isAuthenticated ? (
          <button onClick={() => onLogout && onLogout()} className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">Logout</button>
        ) : (
          <button onClick={() => onNavigate("login")} className={`w-full text-left px-3 py-2 rounded ${current === "login" ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}>Login</button>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;

