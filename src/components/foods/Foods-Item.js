import styles from "./Foods-Item.module.css";
import { useState } from "react";

function FoodItem(props) {
  const { id, name, description, price } = props;

  return (
    <div className={styles.maindiv}>
      <div className={styles.foods_info}>
        <h2> {name}</h2>
        <p> {description}</p>
        <p> {price}</p>
      </div>
      <div className={styles.foods_resist}>
        <div className={styles.content}>
          <label htmlFor={"number"}> 수량 </label>
          <input id={"number"} type={"number"} defaultValue={1} />
        </div>
        <button> 담기</button>
      </div>
    </div>
  );
}
export default FoodItem;
