import ActionTypes from "../../resources/enums";
import { UserAuthData, UserUserData } from "../../interfaces/commonInterface";

export interface IRootState {
  isLoggedIn: boolean;
  authData?: UserAuthData;
}

const initialState: IRootState = {
  isLoggedIn: false,
  authData: {} as UserAuthData,
};

interface LoginAction {
  type: ActionTypes.LOGIN;
  payload: UserAuthData;
}

interface UpdateAction {
  type: ActionTypes.LOGOUT;
}

interface UpdateProfileAction {
  type:ActionTypes.UPDATE_PROFILE,
  payload:UserUserData
}

export type Action = LoginAction | UpdateAction | UpdateProfileAction;

const AuthReducer = (state = initialState, action?: Action) => {
  switch (action?.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        authData: { ...state.authData, ...action?.payload },
      };

    case ActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        authData: { ...state.authData, ...action?.payload },
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        authData: {},
      };

    default:
      return state;
  }
};

export default AuthReducer;
