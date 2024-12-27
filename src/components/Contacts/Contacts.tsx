import styles from "./Contacts.module.scss";

const Contacts = () => {
  return (
    <section className={styles.contacts}>
      <h2>Контакты</h2>
      <div className={styles.content}>
        <div className={styles.info}>
          <p><strong>Магазин SneakerMax:</strong></p>
          <p>+7 916 221 41 72</p>
          <p>Первомайская ул., 3А, г. Долгопрудный</p>
        </div>
        <div className={styles.map}>
          {<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A36b28b7bc3e6921a011b39b0be7a34487bf9c05ce22868ea852d840c5031fe54&amp;source=constructor" width="100%" height="300" frameBorder="0"></iframe>}
        </div>
      </div>
    </section>
  );
};

export default Contacts;