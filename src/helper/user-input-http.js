export async function userOrder(userData) {
  if (userData.name === "") {
    return { nameError: "이름을 확인해주세요" };
  }
  if (userData.address === "") {
    return { addressError: "주소를 확인해주세요" };
  }
  if (userData.phone === "") {
    return { nphoneError: "번호를 확인해주세요" };
  }

  let response;
  try {
    response = await fetch(
      "https://react-project-624ca-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return { responseError: "전송 실패" };
  }
  if (!response.ok) {
    return { responseError: "전송 실패" };
  }

  const responseData = await response.json();

  return responseData;
}
