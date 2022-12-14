import { useRef } from "react";
import { userOrder } from "../../helper/user-input-http";

function CartUseInput(props) {
  const { toggleModal } = props;
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();

  async function sumbitHandler(e) {
    e.preventDefault();
    toggleModal();

    const userOrderInput = {
      name: nameRef.current.value,
      address: addressRef.current.value,
      phone: phoneRef.current.value,
    };

    const orderResult = await userOrder(userOrderInput);
    if (orderResult) {
      console.log(orderResult);
    }
  }

  function cancelHandler(e) {
    e.preventDefault();
    toggleModal();
  }
  return (
    <form>
      <div>
        <label htmlFor="name"> 주문자 이름 </label>
        <input type={"text"} id={"name"} ref={nameRef} />
      </div>
      <div>
        <label htmlFor="address"> 주소 </label>
        <input type={"text"} id={"address"} ref={addressRef} />
      </div>
      <div>
        <label htmlFor="phone"> 전화번호 </label>
        <input type={"text"} id={"phone"} ref={phoneRef} />
      </div>
      <div>
        <button onClick={(e) => sumbitHandler(e)}> 결제하기</button>
        <button onClick={(e) => cancelHandler(e)}> 취소</button>
      </div>
    </form>
  );
}

export default CartUseInput;

// 버튼 누르면, 제출
// DB는 파이어베이스
// 제출이 이상하게 된다? => 내비두고 안꺼짐
// 제출이 잘 되었다? => 오케이 꺼짐
