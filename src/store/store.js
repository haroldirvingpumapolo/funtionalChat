import { createStore, combineReducers } from "redux";
import chatReducer from "./reducers/reducerAllUserData"

const reducers = combineReducers({ chatReducer });

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
