import React from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;