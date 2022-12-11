import { createContext, useReducer } from "react";

const CartContext = createContext({
  itemInfo: [],
  totalPrice: 0,
  addItem: () => {},
  removeItem: () => {},
});

function cartReducerFn(state, action) {
  // "state 는 현재상태", "action" 은 "dispatch 안에 들어있는 객체"들에 접근한다.
  if (action.type === "ADD_ITEM") {
    const sameIdIndex = state.itemInfo.findIndex(
      (item) => item.id == action.item.id
    ); // 만약 같은 id가 있다면 그 id가 있는 index를 찾는다.

    const sameIdItem = state.itemInfo[sameIdIndex]; // 만약 INDEX 가 없다면, NULL 이 반환

    let updatedItem; // 업데이트된 하나
    let updatedItems; // 업데이트된 전체

    if (sameIdItem) {
      // 만약 존재한다면, [amount 는, 기존 상태+추가상태] 로 오버라이드
      updatedItem = {
        ...sameIdItem,
        amount: +sameIdItem.amount + +action.item.amount,
      };
      updatedItems = [...state.itemInfo]; // 기존 최종 itemInfo 를 가져 온 후
      updatedItems[sameIdIndex] = updatedItem; // 새로운 상태를 받은 index 만 오버라이드
    } else {
      // 만약 없다면, 기존처럼, updatedItem 은 그냥 받아온 그대로, 추가상태는 추가상태 그대로
      updatedItem = { ...action.item };
      updatedItems = state.itemInfo.concat(updatedItem);
    }

    const updatedPrice =
      state.totalPrice + action.item.price * action.item.amount; // 새 값은 item 객체로 넣어준다.

    return {
      itemInfo: updatedItems,
      totalPrice: updatedPrice,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    return;
  }
}

export function CartContextProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(cartReducerFn, {
    itemInfo: [],
    totalPrice: 0,
  });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item: item }); // 페이로드로, 새 값을 넣어준다. item 객체는, id,name,amount,price를 가지고있다.
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id }); // 페이로드로, 변경할 데이터에 접근한다.
  }

  const context = {
    itemInfo: cartState.itemInfo,
    totalPrice: cartState.totalPrice,
    addItem: addItem,
    removeItem: removeItem,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
}
export default CartContext;
