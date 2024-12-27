import React, { useState } from "react";
import styles from "./AddToCartModal.module.scss";

interface AddToCartModalProps {
  product: {
    id: number;
    title: string;
    price: number;
    imgUrl: string;
    sizes: number[];
  };
  onClose: () => void;
  addToCart: (product: any, selectedSize: number) => void;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  product,
  onClose,
  addToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleAddToCart = () => {
    if (selectedSize === null) {
      setError("Пожалуйста, выберите размер.");
      return;
    }
    addToCart(product, selectedSize);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Добавить в корзину</h2>
        <div className={styles.productDetails}>
          <img src={product.imgUrl} alt={product.title} />
          <p>{product.title}</p>
          <p>{product.price} ₽</p>
        </div>
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
                  selectedSize === size ? styles.selected : ""
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.addToCartButton} onClick={handleAddToCart}>
          Добавить
        </button>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default AddToCartModal;