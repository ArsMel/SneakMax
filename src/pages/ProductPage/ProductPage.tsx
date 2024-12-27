import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { addToCart } from "../../features/cartSlice";
import styles from "./ProductPage.module.scss";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) =>
    state.sneakers.items?.find((item) => item.id === Number(id))
  );

  if (!product) {
    return <p>Товар не найден. Попробуйте вернуться назад или обновить страницу.</p>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.title}</h1>
      <div className={styles.productDetails}>
        <img
          src={product.imgUrl}
          alt={product.title}
          className={styles.image}
        />
        <div className={styles.info}>
          <p><strong>Цена:</strong> {product.price} ₽</p>
          <p><strong>Описание:</strong> {product.description}</p>
          <p><strong>Пол:</strong> {product.gender}</p>
          <p><strong>Размеры:</strong> {product.sizes.join(", ")}</p>
          <button onClick={handleAddToCart} className={styles.button}>
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;