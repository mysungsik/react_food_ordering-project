import styles from "./Cart.module.css";
import { useContext, useState } from "react";
import CartContext from "../../store/Cart-Context";
import CartUseInput from "./Cart-userInput";

function Cart(props) {
  const [showCheckOut, setShowCheckOut] = useState(false);
  const { toggleModal, toggleSuccessModal } = props;
  const cartCtx = useContext(CartContext);
  const cartItemInfo = cartCtx.itemInfo;

  const hasItem = cartCtx.itemInfo.length > 0;

  function cartItemAdd(id) {
    //  cartCtx.addItem 메서드는, item(id,name,amount,price) 를 받는다.

    const selectedItem = cartItemInfo.find((item) => item.id == id);

    cartCtx.addItem({
      id: selectedItem.id,
      name: selectedItem.name,
      amount: 1,
      price: selectedItem.price,
    });
  }

  function cartItemDecrease(id) {
    //  cartCtx.removeItem 메서드는, (id) 를 받는다.
    cartCtx.removeItem(id);
  }

  // 카트 아이템 컴포넌트
  const cartItems = cartItemInfo.map((item) => (
    <div key={item.id}>
      <li>
        <div className={styles.item_info}>
          <h2> {item.name}</h2>
          <p> {item.price}</p>
        </div>
        <div className={styles.item_quantity}>
          <div>
            <label htmlFor={"number"}> 수량 </label>
            <input id={"number"} type={"number"} value={item.amount} readOnly />
          </div>
          <div>
            <button onClick={cartItemAdd.bind(null, item.id)}> + </button>
            <button onClick={cartItemDecrease.bind(null, item.id)}> - </button>
          </div>
        </div>
      </li>
      <hr />
    </div>
  ));

  // 카트의 메인 버튼
  let Buttons;

  if (!showCheckOut) {
    Buttons = (
      <div className={styles.cart_buttons}>
        {hasItem && (
          <button onClick={() => setShowCheckOut(true)}> 주문</button>
        )}
        <button onClick={toggleModal}> 닫기 </button>
      </div>
    );
  } else {
    Buttons = <div></div>;
  }

  return (
    <div className={styles.maindiv}>
      <ul className={styles.cartItmes}>{cartItems}</ul>
      <div className={styles.total_price}>
        <span>총 금액 : </span>
        <span> {cartCtx.totalPrice.toLocaleString("ko-KR")} 원 </span>
      </div>
      {Buttons}
      {showCheckOut && <CartUseInput toggleModal={toggleModal} toggleSuccessModal={toggleSuccessModal} />}
    </div>
  );
}

export default Cart;
