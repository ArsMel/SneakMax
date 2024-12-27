import React from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { removeFromCart } from '../../features/cartSlice';
import { Link } from 'react-router-dom';
import styles from './CartModal.module.scss';

Modal.setAppElement('#root');

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Ваша корзина</h2>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul className={styles.cartList}>
          {cartItems.map((item) => (
            <li key={`${item.id}-${item.selectedSize}`} className={styles.cartItem}>
              <img src={item.imgUrl} alt={item.title} className={styles.image} />
              <div>
                <p>{item.title}</p>
                <p>Размер: {item.selectedSize}</p>
                <p>
                  {item.price} ₽ x {item.quantity}
                </p>
              </div>
              <button
                onClick={() =>
                  dispatch(removeFromCart({ id: item.id, selectedSize: item.selectedSize }))
                }
                className={styles.removeButton}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.actions}>
        <button onClick={onClose} className={styles.closeButton}>
          Закрыть
        </button>
        <Link to="/cart" className={styles.cartButton} onClick={onClose}>
          Перейти в корзину
        </Link>
      </div>
    </Modal>
  );
};

export default CartModal;