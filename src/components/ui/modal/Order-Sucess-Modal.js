import styles from "./Order-Sucess-Modal.module.css";

// 켜지는것 => Cart-userInput 에서 오는, toggle [ State 변경에 의한]
// 꺼지는것 => Modal 에 달려있는 button
// 렌더 위치 => 메인화면

// 즉, context 를 사용해야만, Modal 관리가 쉬워진다.
// userInput 이 완료되면 Cart 모달은 제거되고,
// userInput.js 안에서 context 를 조작해, SuceessModal 을 띄우고
// SuccessModal 은 자신의 버튼을 조작하여, context 를 조작해 스스로를 종료한다.

function OrderSucessModal(props) {
  const { toggleSuccessModal } = props;
  return (
    <div className={styles.maindiv}>
      <div className={styles.modal_background}></div>
      <div className={styles.modal_content}>
        <h2>주문이 완료되었습니다!</h2>
        <button onClick={toggleSuccessModal}> 종료</button>
      </div>
    </div>
  );
}

export default OrderSucessModal;
