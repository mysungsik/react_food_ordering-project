import styles from "./Cart.module.css";
import { useContext } from "react";
import CartContext from "../../store/Cart-Context";

function Cart(props) {
  const { toggleModal } = props;
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

  function cartItemRemove(id) {}

  const cartItems = cartItemInfo.map((item) => (
    <div>
      <li>
        <div className={styles.item_info}>
          <h2> {item.name}</h2>
          <p> {item.price}</p>
        </div>
        <div className={styles.item_quantity}>
          <div>
            <label htmlFor={"number"}> 수량 </label>
            <input
              id={"number"}
              type={"number"}
              value={item.amount}
              defaultValue={item.amount}
            />
          </div>
          <div>
            <button onClick={cartItemAdd.bind(null, item.id)}> + </button>
            <button onClick={cartItemRemove.bind(null, item.id)}> - </button>
          </div>
        </div>
      </li>
      <hr />
    </div>
  ));

  return (
    <div className={styles.maindiv}>
      <ul className={styles.cartItmes}>{cartItems}</ul>
      <div className={styles.total_price}>
        <span>Total Price</span>
        <span> {cartCtx.totalPrice.toFixed(2)} </span>
      </div>
      <div className={styles.cart_buttons}>
        {hasItem && <button> 주문</button>}
        <button onClick={toggleModal}> 닫기 </button>
      </div>
    </div>
  );
}

export default Cart;
