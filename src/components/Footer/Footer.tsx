import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const sectionRetry = document.getElementById(sectionId);
        if (sectionRetry) {
          sectionRetry.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.logo}>
          <button onClick={() => scrollToSection("top")}>SneakMax</button>
        </div>
        <div className="copyright">
        <p>© 2024 SneakMax. Все права защищены.</p>
      </div>
        <button
          className={styles.hamburger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
          <ul className={styles.navList}>
            <li>
              <button
                onClick={() => scrollToSection("catalog")}
                className={styles.linkButton}
              >
                Каталог
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className={styles.linkButton}
              >
                О нас
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("quiz")}
                className={styles.linkButton}
              >
                Подобрать пару
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("team")}
                className={styles.linkButton}
              >
                Наша команда
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("Contacts")}
                className={styles.linkButton}
              >
                Контакты
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;