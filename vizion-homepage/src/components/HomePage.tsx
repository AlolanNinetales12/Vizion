import React from "react";
import { FiBarChart3, FiLayout, FiUploadCloud, FiDownload } from "react-icons/fi";
import styles from "./HomePage.module.css";

type Props = {
  onNavigate: (page: string) => void;
};

const HomePage: React.FC<Props> = ({ onNavigate }) => {
  console.log('[DEBUG] HomePage: rendering');

  return (
    <div className={styles["home-page"]}>
      {/* Top Navigation */}
      <nav className={styles["home-nav"]}>
        <div className={styles["home-logo"]}>VIZION</div>
        <div className={styles["home-nav-links"]}>
          <button onClick={() => onNavigate("home")} className={styles["home-nav-button"]}>Home</button>
          <button onClick={() => onNavigate("analytics")} className={styles["home-nav-button"]}>Analytics</button>
          <button onClick={() => onNavigate("dashboard")} className={styles["home-nav-button"]}>Projects</button>
          <button onClick={() => onNavigate("account")} className={styles["home-nav-button"]}>Account</button>
          <button onClick={() => onNavigate("login")} className={styles["home-login-button"]}>
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className={styles["home-main"]}>
        <section className={styles["home-hero"]}>
          <h1 className={styles["home-title"]}>
            Turn Data Into Insights
          </h1>
          <p className={styles["home-subtitle"]}>
            Interactive dashboards and visualizations to help you understand your data. Drag and drop widgets, export to any format, and collaborate in real-time.
          </p>
          <button
            onClick={() => onNavigate("login")}
            className={styles["home-cta-button"]}
          >
            Get Started
          </button>
        </section>

        {/* Feature Cards */}
        <section className={styles["home-grid"]}>
          <div className={styles["home-card"]}>
            <div className={`${styles["home-card-icon"]} ${styles["home-card-icon-blue"]}`}><FiBarChart3 /></div>
            <h3 className={styles["home-card-title"]}>Interactive Charts</h3>
            <p className={styles["home-card-desc"]}>Powerful analytics capabilities for your data</p>
          </div>

          <div className={styles["home-card"]}>
            <div className={`${styles["home-card-icon"]} ${styles["home-card-icon-purple"]}`}><FiLayout /></div>
            <h3 className={styles["home-card-title"]}>Custom Dashboards</h3>
            <p className={styles["home-card-desc"]}>Powerful analytics capabilities for your data</p>
          </div>

          <div className={styles["home-card"]}>
            <div className={`${styles["home-card-icon"]} ${styles["home-card-icon-teal"]}`}><FiUploadCloud /></div>
            <h3 className={styles["home-card-title"]}>Data Upload</h3>
            <p className={styles["home-card-desc"]}>Powerful analytics capabilities for your data</p>
          </div>

          <div className={styles["home-card"]}>
            <div className={`${styles["home-card-icon"]} ${styles["home-card-icon-cyan"]}`}><FiDownload /></div>
            <h3 className={styles["home-card-title"]}>Export Options</h3>
            <p className={styles["home-card-desc"]}>Powerful analytics capabilities for your data</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
