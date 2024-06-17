import { Action, Dispatch } from "redux";
import ActionTypes from "../../resources/enums";

export const AddToCartAction =
  (item: any) => async (dispatch: Dispatch<Action>) => {
    console.log("item==>>",item);
    dispatch({
      type: ActionTypes.ADD_ITEM_CART,
      payload: item,
    });
  };
