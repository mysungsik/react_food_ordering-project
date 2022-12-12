import AvaliableFoods from "./Foods-Avaliable";
import SummuryFood from "./Foods-Summry";
import styles from "./Foods.module.css";

function Foods() {
  return (
    <div className={`${styles.maindiv}`}>
      <SummuryFood />
      <AvaliableFoods />
    </div>
  );
}
export default Foods;
