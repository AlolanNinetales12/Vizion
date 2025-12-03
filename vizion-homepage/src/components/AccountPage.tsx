import React, { useEffect, useState } from "react";

type Account = {
  username: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
};

const AccountPage: React.FC = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pwState, setPwState] = useState({ old_password: "", new_password: "" });
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/api/account/", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setAccount(j))
      .catch(() => setAccount(null))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!account) return;
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/account/", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: account.email,
          first_name: account.first_name,
          last_name: account.last_name,
        }),
      });
      if (res.ok) setMsg("Profile updated");
      else setMsg("Unable to update profile");
    } catch (e) {
      setMsg("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setMsg(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/account/change-password/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pwState),
      });
      const j = await res.json();
      if (res.ok) {
        setMsg("Password changed successfully");
        setPwState({ old_password: "", new_password: "" });
      } else {
        setMsg(j.detail || "Unable to change password");
      }
    } catch (e) {
      setMsg("Network error");
    }
  };

  return (
    <div className="card-surface max-w-4xl mx-auto">
      <header className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-200">Account</h2>
        <p className="text-sm text-blue-400">Manage your profile, security and connected apps</p>
      </header>

      {loading && <p>Loading...</p>}

      {!loading && account && (
        <div className="grid md:grid-cols-2 gap-6">
          <section className="space-y-4">
            <div>
              <label className="text-xs text-blue-300">Username</label>
              <div className="mt-1 text-sm text-blue-100 p-3 bg-[#05121a] rounded-md">{account.username}</div>
            </div>

            <div>
              <label className="text-xs text-blue-300">Email</label>
              <input
                className="w-full mt-1 p-3 rounded-md bg-[#05121a] text-blue-100 border border-transparent focus:border-blue-400"
                value={account.email || ""}
                onChange={(e) => setAccount({ ...account, email: e.target.value })}
                placeholder="you@company.com"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-blue-300">First name</label>
                <input
                  className="w-full mt-1 p-3 rounded-md bg-[#05121a] text-blue-100 border border-transparent focus:border-blue-400"
                  value={account.first_name || ""}
                  onChange={(e) => setAccount({ ...account, first_name: e.target.value })}
                />
              </div>

              <div className="flex-1">
                <label className="text-xs text-blue-300">Last name</label>
                <input
                  className="w-full mt-1 p-3 rounded-md bg-[#05121a] text-blue-100 border border-transparent focus:border-blue-400"
                  value={account.last_name || ""}
                  onChange={(e) => setAccount({ ...account, last_name: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <button onClick={handleSave} className="cta-btn" disabled={saving}>
                {saving ? "Saving..." : "Save profile"}
              </button>
              <div className="text-sm text-blue-300">{msg}</div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-medium text-blue-200">Security</h3>
            <div>
              <label className="text-xs text-blue-300">Change password</label>
              <input
                type="password"
                placeholder="Current password"
                className="w-full mt-1 p-3 rounded-md bg-[#05121a] text-blue-100 border border-transparent focus:border-blue-400 mb-2"
                value={pwState.old_password}
                onChange={(e) => setPwState({ ...pwState, old_password: e.target.value })}
              />
              <input
                type="password"
                placeholder="New password (min 8 chars)"
                className="w-full mt-1 p-3 rounded-md bg-[#05121a] text-blue-100 border border-transparent focus:border-blue-400"
                value={pwState.new_password}
                onChange={(e) => setPwState({ ...pwState, new_password: e.target.value })}
              />
              <div className="flex gap-3 mt-3">
                <button onClick={handleChangePassword} className="cta-btn">
                  Change password
                </button>
                <div className="text-sm text-blue-300">{msg}</div>
              </div>
            </div>

            <div className="pt-6">
              <h4 className="text-sm font-medium text-blue-200 mb-3">Connected apps</h4>
              <div className="space-y-3">
                <div className="p-3 rounded-md bg-[#041017] border border-blue-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-blue-100">Google OAuth</div>
                    <div className="text-xs text-blue-400">Not connected</div>
                  </div>
                  <div>
                    <button className="px-3 py-1 rounded-md bg-blue-700 text-white text-sm">Connect</button>
                  </div>
                </div>

                <div className="p-3 rounded-md bg-[#041017] border border-blue-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-blue-100">SAML / SSO</div>
                    <div className="text-xs text-blue-400">Enterprise only</div>
                  </div>
                  <div>
                    <button className="px-3 py-1 rounded-md bg-blue-700 text-white text-sm">Details</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {!loading && !account && <p className="text-blue-300">You need to be logged in to view account details.</p>}
    </div>
  );
};

export default AccountPage;
