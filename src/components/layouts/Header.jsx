import styles from "../../styles/Header.module.css";

export default function Header() {
  return (
    <nav className={styles.header}>
      <div className="logo">
        <span>
          <img src="./img/logo.svg" alt="website logo" />
        </span>
      </div>

      <div className="nav">
        <ul>
          <li>Why Momos</li>
          <li>Solutions</li>
          <li>Customers</li>
          <li>Resources</li>
          <li>Company</li>
        </ul>
      </div>

      <div className="auth">
        <span>Login</span>
        <span>Get Started</span>
      </div>
    </nav>
  );
}
