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
    <div className="p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Log in to Vizion</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={submit}>
          <label htmlFor="login-username" className="block text-sm">Username</label>
          <input id="login-username" title="username" placeholder="username" className="border p-2 w-full mb-2" value={username} onChange={(e) => setUsername(e.target.value)} />

          <label htmlFor="login-password" className="block text-sm">Password</label>
          <input id="login-password" title="password" placeholder="password" type="password" className="border p-2 w-full mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="flex items-center justify-between">
            <button className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading} type="submit">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <a className="text-sm text-blue-600" href="/register/">Create account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
