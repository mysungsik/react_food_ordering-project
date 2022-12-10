import styles from "./Foods-Summry.module.css"

function SummuryFood() {
  return (
    <div className={styles.maindiv}>
      <h1> 배달할 음식을 선택해주세요!</h1>
      <p> 집에서 클릭 한번으로 편하게 당신이 먹고 싶은 음식을 주문하세요</p>
      <p>
        주문즉시, 음식은 조리되고, 한시간 안에 이 모든 것들을 누리 실 수
        있습니다!
      </p>
    </div>
  );
}
export default SummuryFood;
