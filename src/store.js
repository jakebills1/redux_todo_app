import { createStore, compose, applyMiddleware } from "redux";
import { loadState, saveState } from "./localStorage";
import rootReducer from "./reducers/index";
import throttle from "lodash/throttle";

const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

const persistedState = loadState();

// second argument to createStore is the default state, or state from previous session. it is an object that will be passed to the rootReducer according to the keys in persistedState. those keys will be the 1st argument for the specified reducer
const store = createStore(rootReducer, persistedState, enhancers);

// when store is updated via a dispatched action, the callback will run and persist the stores getState to the localStorage
// throttle will call the 1st arg at most every <2nd arg> milliseconds
store.subscribe(
  throttle(() => {
    saveState({
      todos: store.getState().todos
    });
  }, 1000)
);

if (module.hot) {
  module.hot.accept("./reducers/", () => {
    const nextRootReducer = require("./reducers/index").default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
