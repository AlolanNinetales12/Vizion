import React from "react";

const MFASetup: React.FC = () => {
  return (
    <div className="p-4 bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-800 rounded-lg">
      <h3 className="text-blue-300 font-semibold mb-2">Multi-factor Authentication</h3>
      <p className="text-blue-400 text-sm mb-3">Secure your account by adding an authenticator app or SMS-based verification.</p>
      <div className="flex gap-2">
        <button className="btn-primary">Setup Authenticator</button>
        <button className="btn-outline">Enable SMS</button>
      </div>
    </div>
  );
};

export default MFASetup;
