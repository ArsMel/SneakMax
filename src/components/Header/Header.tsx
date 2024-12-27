import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import CartModal from "../CartModal/CartModal";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.headerContainer} ${
        isScrolled ? styles.scrolled : ""
      }`}
    >
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">SneakMax</Link>
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

            <li>
              <button
                onClick={() => setIsCartOpen(true)}
                className={styles.cartButton}
              >
                Корзина ({cartCount})
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Header;