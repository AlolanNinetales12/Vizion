import React from "react";

type Props = {
  current: string;
  onNavigate: (page: string) => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
};

const Sidebar: React.FC<Props> = ({ current, onNavigate, isAuthenticated, onLogout }) => {
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-950 border-r border-blue-800 min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-300">Vizion</h1>
        <p className="text-xs text-blue-400 uppercase tracking-wider">Analytics</p>
      </div>

      <nav className="space-y-1 flex-1">
        <button
          onClick={() => onNavigate("home")}
          className={`w-full text-left px-3 py-2.5 rounded-lg transition ${
            current === "home"
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
              : "text-blue-200 hover:bg-blue-800/40"
          }`}
        >
          Home
        </button>

        <button
          onClick={() => onNavigate("analytics")}
          className={`w-full text-left px-3 py-2.5 rounded-lg transition ${
            current === "analytics"
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
              : "text-blue-200 hover:bg-blue-800/40"
          }`}
        >
          Analytics
        </button>

        <button
          onClick={() => onNavigate("dashboard")}
          className={`w-full text-left px-3 py-2.5 rounded-lg transition ${
            current === "dashboard"
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
              : "text-blue-200 hover:bg-blue-800/40"
          }`}
        >
          Projects
        </button>

        {isAuthenticated ? (
          <button onClick={() => onLogout && onLogout()} className="w-full text-left px-3 py-2.5 rounded-lg text-blue-200 hover:bg-blue-800/40 transition">
            Logout
          </button>
        ) : (
          <button
            onClick={() => onNavigate("login")}
            className={`w-full text-left px-3 py-2.5 rounded-lg transition ${
              current === "login"
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                : "text-blue-200 hover:bg-blue-800/40"
            }`}
          >
            Login
          </button>
        )}
      </nav>

      <div className="pt-4 border-t border-blue-800">
        <p className="text-xs text-blue-500">© 2025 Vizion</p>
      </div>
    </aside>
  );
};

export default Sidebar;

