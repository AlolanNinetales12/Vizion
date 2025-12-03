import React from "react";

const OAuthButtons: React.FC = () => {
  return (
    <div className="space-y-2">
      <p className="text-blue-300 text-sm">Sign in with</p>
      <div className="flex gap-2">
        <a className="btn-outline" href="/oauth/google/">Google</a>
        <a className="btn-outline" href="/oauth/github/">GitHub</a>
        <a className="btn-outline" href="/oauth/microsoft/">Microsoft</a>
      </div>
    </div>
  );
};

export default OAuthButtons;
