import { useState } from "react";
import styles from "./FAQ.module.scss";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: "Вопрос 1", answer: "Ответ 1: Подробный текст ответа." },
    { question: "Вопрос 2", answer: "Ответ 2: Подробный текст ответа." },
    { question: "Вопрос 3", answer: "Ответ 3: Подробный текст ответа." },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faq}>
      <h2>Часто задаваемые вопросы</h2>
      <div className={styles.accordion}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div
              className={styles.question}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </div>
            {openIndex === index && <div className={styles.answer}>{faq.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;