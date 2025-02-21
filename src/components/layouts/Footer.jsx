import styles from "../../styles/Footer.module.css";

export default function footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <img
          src="./img/prasaarLogo.webp"
          alt="Prasaar Logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.footerContent}>
        <div>
          <ul>
            <li>
              <h1>Products</h1>
            </li>

            <li>
              <a href="#" className={styles.footerLinks}>
                Customer Care
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                Customer Active
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <h1>Company</h1>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                About Us
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <h1>Support</h1>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                Legal & privacy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <h1>Resources</h1>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                Case Studies
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                Press Room
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div className={styles.followUs}>
        <h2>Follow us on social media</h2>
        <div className={styles.footerIcons}>
          <span>
            <a href="#" className={styles.footerLinks}>
              <img src="./img/facebook.svg" alt="Facebook" className="icon24" />
            </a>
          </span>
          <span>
            <a href="#" className={styles.footerLinks}>
              <img src="./img/insta.svg" alt="Facebook" className="icon24" />
            </a>
          </span>
          <span>
            <a href="#">
              <img src="./img/linkedin.svg" alt="Facebook" className="icon24" />
            </a>
          </span>
          <span>
            <a href="#">
              <img
                src="./img/messanger.svg"
                alt="Facebook"
                className="icon24"
              />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
