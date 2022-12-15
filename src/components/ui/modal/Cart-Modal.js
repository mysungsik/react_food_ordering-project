import Cart from "../../cart/Cart";
import { createPortal } from "react-dom";
import styles from "./Cart-Modal.module.css";

function CartModalContent(props) {
  const { toggleModal, toggleSuccessModal } = props;

  return (
    <div className={styles.modal_content}>
      <Cart toggleModal={toggleModal} toggleSuccessModal={toggleSuccessModal} />
    </div>
  );
}

function CartModalBackgroundprops(props) {
  const { toggleModal } = props;
  return <div className={styles.modal_background} onClick={toggleModal}></div>;
}

function CartModal(props) {
  const { toggleModal, toggleSuccessModal } = props;
  return (
    <div className={styles.modal}>
      {createPortal(
        <CartModalBackgroundprops toggleModal={toggleModal} />,
        document.getElementById("cart-modal-background")
      )}
      {createPortal(
        <CartModalContent
          toggleModal={toggleModal}
          toggleSuccessModal={toggleSuccessModal}
        />,
        document.getElementById("cart-modal-content")
      )}
    </div>
  );
}

export default CartModal;
