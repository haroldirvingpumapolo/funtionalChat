import { createStore, combineReducers } from "redux";
import chatReducer from "./reducers/reducerAllUserData"
import reducerCategories from "./reducers/reducerCategories"
import reducerChannels from "./reducers/reducerChannels"
import reducerUsers from "./reducers/reducerUsers"
import reducerPrivateChats from "./reducers/reducerPrivateChats"

const reducers = combineReducers({ chatReducer, reducerCategories, reducerChannels, reducerUsers, reducerPrivateChats });

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
