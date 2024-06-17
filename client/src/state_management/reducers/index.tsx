import {
  applyMiddleware,
  combineReducers,
  createStore,
  CombinedState,
} from "redux";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import logger from "redux-logger";
import AuthReducer from "./authReducer";
import { Reducer } from "react";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import CartReducer from "./cartReducer";

const appReducer: Reducer<
  CombinedState<{ AuthReducer: never; CartReducer: never }>,
  never
> = combineReducers({
  AuthReducer,
  CartReducer,
});

const transforms = [
  encryptTransform({
    secretKey: "ADHKHKDHKDKHKSHKHDSKHKSDKJ",
    onError: (error) => {
      console.error("transforms Error", error);
    },
  }),
];

const persistConfig = {
  key: "root",
  storage,
  transforms,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(
  persistConfig,
  appReducer as Reducer<unknown, never>
);

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));

export default store;
persistStore(store);
