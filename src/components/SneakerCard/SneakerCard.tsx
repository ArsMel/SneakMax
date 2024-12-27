import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import styles from './SneakerCard.module.scss';

interface SneakerCardProps {
  sneaker: {
    id: number;
    title: string;
    price: number;
    imgUrl: string;
  };
}

const SneakerCard: React.FC<SneakerCardProps> = ({ sneaker }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...sneaker,
        quantity: 1, // Добавляем поле quantity вручную
      })
    );
  };

  return (
    <div className={styles.card}>
      <img src={sneaker.imgUrl} alt={sneaker.title} className={styles.image} />
      <h3 className={styles.name}>{sneaker.title}</h3>
      <p className={styles.price}>{sneaker.price} ₽</p>
      <button className={styles.button} onClick={handleAddToCart}>
        Добавить в корзину
      </button>
    </div>
  );
};

export default SneakerCard;