import styles from "./Cart.module.css";

function Cart(props) {
  const { toggleModal } = props;
  const Dummy_Cart = [
    { id: "m1", name: "Sushi", amount: 2, price: 12.99 },
    { id: "m2", name: "Schnitzel", amount: 3, price: 16.5 },
  ];

  const cartItems = Dummy_Cart.map((item) => (
    <div>
      <li>
        <div className={styles.item_info}>
          <h2> {item.name}</h2>
          <p> {item.price}</p>
        </div>
        <div className={styles.item_quantity}>
          <div>
            <label htmlFor={"number"}> 수량 </label>
            <input id={"number"} type={"number"} />
          </div>
          <div>
            <button> +</button>
            <button> -</button>
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
        <span> 얼마 </span>
      </div>
      <div className={styles.cart_buttons}>
        <button> 주문</button>
        <button onClick={toggleModal}> 닫기 </button>
      </div>
    </div>
  );
}

export default Cart;
