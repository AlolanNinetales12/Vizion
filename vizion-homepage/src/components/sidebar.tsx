
import React from "react";
import styles from "./Sidebar.module.css";

type Props = {
  current: string;
  onNavigate: (page: string) => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
};

const Sidebar: React.FC<Props> = ({ current, onNavigate, isAuthenticated, onLogout }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h1 className={styles.title}>Vizion</h1>
        <p className={styles.subtitle}>Analytics</p>
      </div>

      <nav className={styles.nav}>
        <button
          onClick={() => onNavigate("home")}
          className={`${styles.navButton} ${
            current === "home" ? styles.navButtonActive : styles.navButtonInactive
          }`}
        >
          Home
        </button>

        <button
          onClick={() => onNavigate("analytics")}
          className={`${styles.navButton} ${
            current === "analytics" ? styles.navButtonActive : styles.navButtonInactive
          }`}
        >
          Analytics
        </button>

        <button
          onClick={() => onNavigate("dashboard")}
          className={`${styles.navButton} ${
            current === "dashboard" ? styles.navButtonActive : styles.navButtonInactive
          }`}
        >
          Projects
        </button>

        <button
          onClick={() => onNavigate("account")}
          className={`${styles.navButton} ${
            current === "account" ? styles.navButtonActive : styles.navButtonInactive
          }`}
        >
          Account
        </button>

        {/* Project folders and team tools */}
        <div className={styles.folders}>
          <div className={styles.folderLabel}>Folders</div>
          <button onClick={() => onNavigate('dashboard')} className={styles.folderButton}>All Projects</button>
          <button onClick={() => onNavigate('dashboard')} className={styles.folderButton}>Starred</button>
          <button onClick={() => onNavigate('dashboard')} className={styles.folderButton}>Team</button>
        </div>

        {isAuthenticated ? (
          <button onClick={() => onLogout && onLogout && onLogout()} className={`${styles.navButton} ${styles.navButtonInactive}`}>
            Logout
          </button>
        ) : (
          <button
            onClick={() => onNavigate("login")}
            className={`${styles.navButton} ${
              current === "login" ? styles.navButtonActive : styles.navButtonInactive
            }`}
          >
            Login
          </button>
        )}
      </nav>

      <div className={styles.footer}>
        <p className={styles.footerText}>© 2025 Vizion</p>
      </div>
    </aside>
  );
};

export default Sidebar;

