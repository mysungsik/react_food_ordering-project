import styles from "./Foods-Item.module.css";
import { useContext, useRef } from "react";
import CartContext from "../../store/Cart-Context";

function FoodItem(props) {
  const { id, name, description, price } = props;
  const amountRef = useRef();
  const cartCtx = useContext(CartContext);

  function submitHandler(e) {
    e.preventDefault();

    const amountData = amountRef.current.value;

    if (amountData > 0) {
      cartCtx.addItem({
        id: id,
        name: name,
        amount: amountData,
        price: price,
      });
    } else {
      return;
    }
  }

  return (
    <div className={styles.maindiv}>
      <div className={styles.foods_info}>
        <input type={"hidden"} value={id} />
        <h2> {name}</h2>
        <p> {description}</p>
        <p> {price}</p>
      </div>
      <div className={styles.foods_resist}>
        <div className={styles.content}>
          <label htmlFor={"number"}> 수량 </label>
          <input
            id={"number"}
            type={"number"}
            defaultValue={1}
            ref={amountRef}
          />
        </div>
        <button onClick={(e) => submitHandler(e)}> 담기</button>
      </div>
    </div>
  );
}
export default FoodItem;
