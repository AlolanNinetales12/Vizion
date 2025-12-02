import React, { useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift();
  return null;
}

type Props = {
  onSuccess: () => void;
};

const LoginPage: React.FC<Props> = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Ensure CSRF cookie is present by fetching the login page first
      await fetch(`${API_BASE}/login/`, { credentials: "include" });

      const csrftoken = getCookie('csrftoken');

      const body = new URLSearchParams();
      body.append('username', username);
      body.append('password', password);

      const res = await fetch(`${API_BASE}/login/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...(csrftoken ? { 'X-CSRFToken': csrftoken } : {}),
        },
        body: body.toString(),
      });

      // After login attempt, verify by calling the projects API
      const verify = await fetch(`${API_BASE}/api/projects-api/`, { credentials: 'include' });
      if (verify.ok) {
        onSuccess();
      } else {
        setError('Invalid credentials or server error.');
      }
    } catch (err) {
      setError('Network error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-blue-950 border border-blue-800 rounded-xl p-8 shadow-2xl shadow-blue-500/10">
          <h2 className="text-2xl font-bold mb-2 text-blue-300">Log in to Vizion</h2>
          <p className="text-blue-400 text-sm mb-6">Access your analytics projects</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="login-username" className="block text-sm font-medium text-blue-300 mb-1.5">
                Username
              </label>
              <input
                id="login-username"
                title="username"
                placeholder="Enter your username"
                className="w-full px-3 py-2 bg-blue-900/30 border border-blue-700/50 rounded-lg text-blue-100 placeholder-blue-500/50 focus:outline-none focus:border-blue-500 focus:bg-blue-900/50 transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-blue-300 mb-1.5">
                Password
              </label>
              <input
                id="login-password"
                title="password"
                placeholder="Enter your password"
                type="password"
                className="w-full px-3 py-2 bg-blue-900/30 border border-blue-700/50 rounded-lg text-blue-100 placeholder-blue-500/50 focus:outline-none focus:border-blue-500 focus:bg-blue-900/50 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              type="submit"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-blue-800">
            <p className="text-blue-400 text-sm text-center">
              Don&apos;t have an account?{" "}
              <a href="/register/" className="text-blue-300 hover:text-blue-200 font-semibold">
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
