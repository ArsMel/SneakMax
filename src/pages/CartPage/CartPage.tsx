import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../../features/cartSlice";
import axios from "axios";
import styles from "./CartPage.module.scss";

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [orderStatus, setOrderStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleRemove = (id: number, selectedSize: number | null) => {
    if (selectedSize !== null) {
      dispatch(removeFromCart({ id, selectedSize }));
    }
  };

  const handleIncrement = (id: number, selectedSize: number | null) => {
    if (selectedSize !== null) {
      dispatch(incrementQuantity({ id, selectedSize }));
    }
  };

  const handleDecrement = (id: number, selectedSize: number | null) => {
    if (selectedSize !== null) {
      dispatch(decrementQuantity({ id, selectedSize }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://cb91213a01996430.mokky.dev/orders",
        {
          customer: formData,
          items: cartItems,
        }
      );
      if (response.status === 200 || response.status === 201) {
        setOrderStatus("success");
        dispatch(clearCart());
      } else {
        setOrderStatus("error");
      }
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error);
      setOrderStatus("error");
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Корзина</h1>
      {orderStatus === "success" && (
        <div className={styles.successMessage}>
          <p>Ваш заказ успешно отправлен! Спасибо за покупку.</p>
        </div>
      )}
      {orderStatus === "error" && (
        <div className={styles.errorMessage}>
          <p>Произошла ошибка при отправке заказа. Попробуйте еще раз.</p>
        </div>
      )}
      {cartItems.length === 0 && orderStatus === "idle" ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <>
          <div className={styles.cartList}>
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}`}
                className={styles.cartItem}
              >
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className={styles.image}
                />
                <div className={styles.details}>
                  <h3>{item.title}</h3>
                  <p>Размер: {item.selectedSize}</p>
                  <p>Цена: {item.price} ₽</p>
                  <div className={styles.quantityControls}>
                    <button
                      onClick={() =>
                        handleDecrement(item.id, item.selectedSize)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleIncrement(item.id, item.selectedSize)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id, item.selectedSize)}
                    className={styles.removeButton}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
          {orderStatus === "idle" || orderStatus === "error" ? (
            <div className={styles.summary}>
              <p>
                <strong>Общая сумма:</strong> {totalAmount} ₽
              </p>
              <form onSubmit={handleOrderSubmit} className={styles.orderForm}>
                <h2>Оформление заказа</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Ваш email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Ваш телефон"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" className={styles.submitButton}>
                  Отправить заказ
                </button>
              </form>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default CartPage;