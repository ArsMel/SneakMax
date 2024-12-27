import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSneakers } from "../../features/sneakersSlice";
import { RootState, AppDispatch } from "../../app/store";
import ProductModal from "../../components/ProductModal/ProductModal";
import AddToCartModal from "../../components/AddToCartModal/AddToCartModal";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import Nouislider from "nouislider-react";
import "nouislider/dist/nouislider.css";
import styles from "./HomePage.module.scss";
import { addToCart } from "../../features/cartSlice";
import aboutUsImage from "../../images/about-us.jpg";
import { fetchTeam } from "../../features/teamSlice";
import SneakerPicker from "../../components/SneakerPicker/SneakerPicker";
import FAQ from "../../components/FAQ/FAQ";
import Contacts from "../../components/Contacts/Contacts";
import ContactForm from "../../components/ContactForm/ContactForm";

const ITEMS_PER_PAGE = 6;

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sneakers = useSelector((state: RootState) => state.sneakers.items);
  const status = useSelector((state: RootState) => state.sneakers.status);

  const [priceRange, setPriceRange] = useState<number[]>([5500, 30000]);
  const [gender, setGender] = useState<string>("");
  const [size, setSize] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedForCart, setSelectedForCart] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchSneakers());
  }, [dispatch]);

  const handlePriceChange = (values: string[]) => {
    const [min, max] = values.map(Number);
    setPriceRange([min, max]);
  };

  const handleSneakerClick = (sneaker: any) => {
    setSelectedProduct(sneaker);
  };

  const handleAddToCartClick = (sneaker: any) => {
    setSelectedForCart(sneaker);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const closeAddToCartModal = () => {
    setSelectedForCart(null);
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  const filteredSneakers = sneakers.filter((sneaker) => {
    const priceMatch =
      sneaker.price >= priceRange[0] && sneaker.price <= priceRange[1];
    const genderMatch = gender ? sneaker.gender === gender : true;
    const sizeMatch = size ? sneaker.sizes.includes(size) : true;
    return priceMatch && genderMatch && sizeMatch;
  });

  const visibleSneakers = filteredSneakers.slice(0, visibleCount);

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  const team = useSelector((state: RootState) => state.team.members);
  const teamStatus = useSelector((state: RootState) => state.team.status);

  return (
    <>
      <div id="catalog" className={styles.container}>
        <h1 className={styles.title}>Каталог</h1>
        <div className={styles.content}>
          <div className={styles.filters}>
            <h2 className={styles.filtersTitle}>Подбор по параметрам</h2>
            <div className={styles.filterGroup}>
              <label>Цена, руб:</label>
              <Nouislider
                range={{ min: 5500, max: 30000 }}
                start={priceRange}
                step={100}
                connect
                onSlide={(values: string[]) => handlePriceChange(values)}
              />
              <p>
                {priceRange[0]} ₽ - {priceRange[1]} ₽
              </p>
            </div>
            <div className={styles.filterGroup}>
              <label htmlFor="genderFilter">Пол:</label>
              <select
                id="genderFilter"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={styles.select}
              >
                <option value="">Все</option>
                <option value="Мужской">Мужской</option>
                <option value="Женский">Женский</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label htmlFor="sizeFilter">Размер:</label>
              <select
                id="sizeFilter"
                value={size ?? ""}
                onChange={(e) => setSize(e.target.value ? Number(e.target.value) : null)}
                className={styles.select}
              >
                <option value="">Все</option>
                <option value="35">35</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
              </select>
            </div>
            <div className={styles.buttons}>
              <button
                className={styles.resetButton}
                onClick={() => {
                  setPriceRange([0, 30000]);
                  setGender("");
                  setSize(null);
                }}
              >
                Сбросить
              </button>
            </div>
          </div>

          <div className={styles.catalog}>
            {status === "loading" ? (
              <p>Загрузка...</p>
            ) : status === "failed" ? (
              <p>Ошибка загрузки данных.</p>
            ) : (
              <>
                <div className={styles.grid}>
                  {visibleSneakers.map((sneaker) => (
                    <div key={sneaker.id} className={styles.card}>
                      <div className={styles.imageWrapper}>
                        <img src={sneaker.imgUrl} alt={sneaker.title} />
                        <div className={styles.overlay}>
                          <button
                            className={styles.iconButton}
                            onClick={() => handleSneakerClick(sneaker)}
                          >
                            <FaEye />
                          </button>
                          <button
                            className={styles.iconButton}
                            onClick={() => handleAddToCartClick(sneaker)}
                          >
                            <FaShoppingCart />
                          </button>
                        </div>
                      </div>
                      <h3>{sneaker.title}</h3>
                      <p>{sneaker.price} ₽</p>
                    </div>
                  ))}
                </div>
                {visibleCount < filteredSneakers.length && (
                  <button
                    className={styles.loadMoreButton}
                    onClick={handleLoadMore}
                  >
                    Показать еще
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={closeProductModal} />
        )}
        {selectedForCart && (
          <AddToCartModal
            product={selectedForCart}
            onClose={closeAddToCartModal}
            addToCart={(product, selectedSize) => {
              if (selectedSize !== null) {
                dispatch(
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    imgUrl: product.imgUrl,
                    selectedSize,
                    quantity: 1,
                  })
                );
                closeAddToCartModal();
              } else {
                alert("Пожалуйста, выберите размер перед добавлением в корзину.");
              }
            }}
          />
        )}
      </div>
      <div id="about" className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <h2>Пара слов о нас</h2>
          <p>
            Спорт держит нас в форме. Учит дисциплине. Объединяет нас. Через
            спорт мы можем менять жизни. В том числе с помощью
            воодушевляющих историй спортсменов. Чтобы помочь тебе подняться и
            двигаться вперед.
          </p>
          <p className={styles.signature}>— SneakMax</p>
        </div>
        <div className={styles.aboutImage}>
          <img src={aboutUsImage} alt="О нас" />
        </div>
      </div>
      <div id="team" className={styles.teamSection}>
        <h2>Наша команда</h2>
        {teamStatus === "loading" ? (
          <p>Загрузка команды...</p>
        ) : teamStatus === "failed" ? (
          <p>Не удалось загрузить данные о команде.</p>
        ) : (
          <div className={styles.teamGrid}>
            {team.map((member) => (
              <div key={member.id} className={styles.teamMember}>
                <img src={member.imgUrl} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div id="quiz" className={styles.sneakerPickerSection}>
        <SneakerPicker />
      </div>
      <div id="FAQ" className={styles.faq}>
        <FAQ />
      </div>
      <div id="Contacts" className={styles.Contacts}>
        <Contacts />
      </div>
      <div id="ContactForm" className={styles.ContactForm}>
        <ContactForm />
      </div>
    </>
  );
};

export default HomePage;