import React from "react";
import { Link } from "react-router-dom";
import styles from "./OrderSuccessPage.module.scss";

const OrderSuccessPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Спасибо за ваш заказ!</h1>
      <p className={styles.message}>
        Мы получили ваш заказ и начнем обработку в ближайшее время.
      </p>
      <Link to="/" className={styles.button}>
        Вернуться на главную страницу
      </Link>
    </div>
  );
};

export default OrderSuccessPage;