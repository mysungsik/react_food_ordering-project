import styles from "./Foods-Avaliable.module.css";
import Card from "../ui/card/Card";
import FoodItem from "./Foods-Item";
import { getFoods } from "../../helper/foods-http";
import { useEffect, useState } from "react";

function AvaliableFoods() {
  const [foodsArray, setFoodsArray] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchFoods = async () => {
      const data = await getFoods();
      setFoodsArray(data);
    };
    fetchFoods();

    setLoading(false);
  }, []);

  let makedFoodsList;

  if (loading) {
    makedFoodsList = <p> ...loading</p>;
  } else {
    makedFoodsList = foodsArray.map((food) => (
      <FoodItem
        key={food.id}
        id={food.id}
        name={food.name}
        description={food.description}
        price={food.price}
      />
    ));
  }

  return (
    <section className={styles.bump}>
      <Card>
        <ul className={`${styles.foodList} `}>{makedFoodsList}</ul>
      </Card>
    </section>
  );
}
export default AvaliableFoods;
