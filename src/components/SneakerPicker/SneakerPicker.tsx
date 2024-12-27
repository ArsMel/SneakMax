import React, { useState } from "react";
import styles from "./SneakerPicker.module.scss";

const SneakerPicker: React.FC = () => {
  const [step, setStep] = useState(1);
  const [size, setSize] = useState("");
  const [purpose, setPurpose] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Подбор завершен: ${name}, ${email}, ${size}, ${notes}, ${purpose}`);
    setName("");
    setEmail("");
    setPurpose("")
    setSize("");
    setNotes("");
    setStep(1);
  };

  return (
    <div className={styles.sneakerPicker}>
      <h2>Мы подберем идеальную пару для вас</h2>
      <p>Ответьте на три вопроса и мы вышлем каталог с самыми подходящими для вас моделями</p>
      {step === 1 && (
        <div className={styles.step}>
          <h3>Какой размер вам подойдет?</h3>
          <div className={styles.options}>
            {["менее 36", "36-38", "39-41", "42-44", "45 и больше"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  value={option}
                  checked={size === option}
                  onChange={(e) => setSize(e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>
          <button onClick={handleNextStep}>Следующий шаг</button>
        </div>
      )}

      {step === 2 && (
        <div className={styles.step}>
          <h3>Какой стиль кроссовок Вас интересует?</h3>
          <div className={styles.options}>
            {["спортивный", "повседневный", "для бега", "фитнес", "45 и больше"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  value={option}
                  checked={purpose === option}
                  onChange={(e) => setPurpose(e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>
          <button onClick={handleNextStep}>Следующий шаг</button>
        </div>
      )}

      {step === 3 && (
        <div className={styles.step}>
          <h3>Уточните какие-либо моменты</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Введите сообщение"
          />
          <button onClick={handlePreviousStep}>Назад</button>
          <button onClick={handleNextStep}>Следующий шаг</button>
        </div>
      )}
      {step === 4 && (
        <form onSubmit={handleSubmit} className={styles.step}>
          <h3>Ваша подборка готова!</h3>
          <p>Оставьте свои контактные данные, чтобы мы могли отправить подборку на почту</p>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Получить</button>
        </form>
      )}
    </div>
  );
};

export default SneakerPicker;