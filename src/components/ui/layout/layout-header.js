import { Fragment, useState, useContext, useEffect } from "react";
import styles from "./layout-header.module.css";
import CartModal from "../modal/Cart-Modal";
import CartContext from "../../../store/Cart-Context";
import OrderSucessModal from "../modal/Order-Sucess-Modal";

function LayoutHeader() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowshowSuccessModalModal] = useState(true);
  const [btnBump, setBtnBump] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalItemAmount = cartCtx.itemInfo.reduce(
    (acc, item) => +acc + +item.amount,
    0
  );

  function toggleModal() {
    setShowModal((prev) => !prev);
  }
  function toggleSuccessModal() {
    setShowshowSuccessModalModal((prev) => !prev);
  }

  let btnStyle = `${styles.cart} ${btnBump ? styles.bump : ""}`;

  useEffect(() => {
    setBtnBump(() => true);
    const setTime = setTimeout(() => {
      setBtnBump(false);
    }, 300);

    return () => {
      clearTimeout(setTime);
    };
  }, [cartCtx.totalPrice]);

  return (
    <Fragment>
      <ul className={styles.header}>
        <li>
          <h1>Logo</h1>
        </li>
        <li className={btnStyle} onClick={toggleModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <h3>카트</h3>
          <span className={styles.total_amount}> {totalItemAmount} </span>
        </li>
      </ul>
      <div className={styles.header_image}>
        <img src="/mainpage/meals.jpg" alt="main-background"></img>
      </div>
      {showModal && (
        <CartModal
          toggleModal={toggleModal}
          toggleSuccessModal={toggleSuccessModal}
        />
      )}
      {showSuccessModal && (
        <OrderSucessModal toggleSuccessModal={toggleSuccessModal} />
      )}
    </Fragment>
  );
}
export default LayoutHeader;
