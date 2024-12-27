import React, { useState } from "react";
import styles from "./ContactForm.module.scss";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", form);

    // Имитация отправки
    setIsSubmitted(true);
    setForm({ name: "", phone: "" });

    // Скрываем уведомление через 3 секунды
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className={styles.contactForm}>
      <h2>Есть вопросы?</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Номер телефона"
          value={form.phone}
          onChange={handleChange}
        />
        <button type="submit">Отправить</button>
      </form>
      {isSubmitted && (
        <p className={styles.successMessage}>Мы с Вами свяжемся в ближайшее время!</p>
      )}
    </section>
  );
};

export default ContactForm;