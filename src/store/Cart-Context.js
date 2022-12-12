import { createContext, useReducer } from "react";

const CartContext = createContext({
  itemInfo: [],
  totalPrice: 0,
  addItem: () => {},
  removeItem: () => {},
});

function cartReducerFn(state, action) {
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
      updatedItems = state.itemInfo.concat(action.item);
    }

    const updatedPrice =
      state.totalPrice + action.item.price * action.item.amount; // 새 값은 item 객체로 넣어준다.

    return {
      itemInfo: updatedItems,
      totalPrice: updatedPrice,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const selectedIndex = state.itemInfo.findIndex(
      (item) => item.id === action.id
    ); // id에 맞는 index 를 찾는다.
    const selectedItem = state.itemInfo[selectedIndex]; // 해당 index의 값을 저장

    let decreseItemAmount = selectedItem.amount - 1; // - 를 누르면 하나씩 줄인다.
    let updatedItem = selectedItem; // 기존 상태를 받고
    updatedItem.amount = decreseItemAmount; // amount 를 오버라이드

    let updatedItems;

    if (updatedItem.amount <= 0) {
      // 만약 업데이트된 amount가 0보다 작아진다면
      updatedItems = [...state.itemInfo]; // 기존 전체 배열 받고
      updatedItems.splice(selectedIndex, 1); // 기존 전체배열중, 해당 INDEX 를 삭제
    } else {
      // 만약 업데이트된 amount 가 0 이상이라면
      updatedItems = [...state.itemInfo]; // 기존 전체 배열을 받고
      updatedItems[selectedIndex] = updatedItem; // 해당 updatedItem 을 오버라이드
    }

    const updatedPrice = state.totalPrice - selectedItem.price; // totalPrice 는 price에 해당하는 값을 빼준다.

    return {
      itemInfo: updatedItems,
      totalPrice: updatedPrice,
    };
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
