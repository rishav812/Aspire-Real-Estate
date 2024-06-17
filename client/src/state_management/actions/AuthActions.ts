import { Action, Dispatch } from "redux";
import { ILogin, UserAuthData } from "../../interfaces/commonInterface";
import ActionTypes from "../../resources/enums";

export const signInAction =
  (data: UserAuthData) => async (dispatch: Dispatch<Action>) => {
    console.log(data);
    dispatch({
      type: ActionTypes.LOGIN,
      payload: data,
    });
  };

export const logout = () => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionTypes.LOGOUT,
  });
};
