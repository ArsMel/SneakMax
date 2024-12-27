import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import styles from "./ProductModal.module.scss";

interface ProductModalProps {
  product: {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    imgUrl: string;
    sizes: number[];
    inStock: number;
    description: string;
    gender: string;
    color: string;
    compound: string;
    country: string;
  };
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (selectedSize === null) {
      setError("Пожалуйста, выберите размер.");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        imgUrl: product.imgUrl,
        selectedSize,
        quantity: 0
      })
    );
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.imageWrapper}>
          <img src={product.imgUrl} alt={product.title} />
        </div>
        <div className={styles.detailsWrapper}>
          <h2>{product.title}</h2>
          <div className={styles.priceBlock}>
            <p className={styles.price}>{product.price} ₽</p>
            {product.oldPrice && (
              <p className={styles.oldPrice}>{product.oldPrice} ₽</p>
            )}
          </div>
          <p>В наличии: {product.inStock} шт.</p>
          <div className={styles.sizeSelector}>
            <label>Выберите размер:</label>
            <div className={styles.sizeOptions}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setError("");
                  }}
                  className={`${styles.sizeButton} ${
                    selectedSize === size ? styles.selectedSize : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.addToCartButton} onClick={handleAddToCart}>
            Добавить в корзину
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.description}>
          <h3>Описание</h3>
          <p>{product.description}</p>
        </div>
        <div className={styles.characteristics}>
          <h3>Характеристики</h3>
          <ul>
            <li>Пол: {product.gender}</li>
            <li>Цвет: {product.color}</li>
            <li>Состав: {product.compound}</li>
            <li>Страна: {product.country}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;