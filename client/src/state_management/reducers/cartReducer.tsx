import ActionTypes from "../../resources/enums";
import { UserAuthData } from "../../interfaces/commonInterface";
import { Reducer } from "react";

// interface CartAction {
//   type: ActionTypes.ADD_ITEM_CART;
//   payload: UserCartData;
// }

interface UpdateAction {
  type: ActionTypes.LOGOUT;
}

interface Item {
  id: number;
  productname: string;
  description: string;
  image:string;
  price: number;
  enum: string;
  category_id: string;
  quantity: number;
}

// export type Action = CartAction | UpdateAction;

interface CartState {
  items: Item[];
}

const initialState: CartState = {
  items: [],
};

const CartReducer: Reducer<CartState, any> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ITEM_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};

export default CartReducer;
