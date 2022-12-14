export async function getFoods() {
  const response = await fetch(
    "https://react-project-624ca-default-rtdb.firebaseio.com/food.json"
  );

  if (!response.ok) {
    throw new Error("페치 오류");
  }

  const responseData = await response.json();

  const dataArray = [];

  for (const key in responseData) {
    dataArray.push({ id: key, ...responseData[key] });
  }

  return dataArray;
}
