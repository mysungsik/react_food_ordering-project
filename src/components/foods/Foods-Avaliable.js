import styles from "./Foods-Avaliable.module.css";
import Card from "../ui/card/Card";
import FoodItem from "./Foods-Item";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

function AvaliableFoods() {
  const makedFoodsList = DUMMY_MEALS.map((food) => (
    <FoodItem
      key={food.id}
      id={food.id}
      name={food.name}
      description={food.description}
      price={food.price}
    />
  ));

  return (
    <section>
      <Card>
        <ul className={styles.foodList}>{makedFoodsList}</ul>
      </Card>
    </section>
  );
}
export default AvaliableFoods;
