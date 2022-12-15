import { useRef, useReducer } from "react";
import { userOrder } from "../../helper/user-input-http";
import { useContext } from "react";
import CartContext from "../../store/Cart-Context";

//  버튼 누름, porcessing ...
// 전송이 완료 혹은 실패 => processing message 를 완료 혹은 실패
// 2초후에 꺼짐

function notiReducerFn(state, action) {
  if (
    action.type === "PROCESSING" ||
    action.type === "ERROR" ||
    action.type === "SUCCESS"
  ) {
    const updatedNoti = true;
    const updatedMessage = action.message;
    return {
      show: updatedNoti,
      message: updatedMessage,
    };
  }
  if (action.type === "END") {
    const updatedNoti = false;
    const updatedMessage = null;
    return {
      show: updatedNoti,
      message: updatedMessage,
    };
  }
}

function CartUseInput(props) {
  const { toggleModal, toggleSuccessModal } = props;
  const cartCtx = useContext(CartContext);
  const [notification, notificationDispatch] = useReducer(notiReducerFn, {
    show: false,
    message: "",
  });

  // input value 들
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();

  // 제출 핸들러
  async function sumbitHandler(e) {
    e.preventDefault();
    notificationDispatch({ type: "PROCESSING", message: "processing..." }); // useReducer, message

    const userOrderInput = {
      name: nameRef.current.value,
      address: addressRef.current.value,
      phone: phoneRef.current.value,
      orderedFoods: cartCtx.itemInfo,
    };

    const orderResult = await userOrder(userOrderInput);

    if (orderResult.nameError) {
      notificationDispatch({
        // useReducer, message
        type: "ERROR",
        message: orderResult.nameError,
      });
      return;
    }
    if (orderResult.addressError) {
      notificationDispatch({
        // useReducer, message
        type: "ERROR",
        message: orderResult.addressError,
      });
      return;
    }
    if (orderResult.phoneError) {
      // useReducer, 전송중
      notificationDispatch({
        type: "ERROR",
        message: orderResult.phoneError,
      });
      return;
    }
    if (
      orderResult.nameError === undefined &&
      orderResult.addressError === undefined &&
      orderResult.phoneError === undefined
    ) {
      toggleModal(false);
      toggleSuccessModal();
      notificationDispatch({ type: "END" }); // useReducer, message
    }
  }

  function cancelHandler(e) {
    e.preventDefault();
    toggleModal();
  }
  return (
    <form>
      {notification.show && <p> {notification.message}</p>}
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
