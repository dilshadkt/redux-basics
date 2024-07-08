const redux = require("redux");
const { createStore } = redux;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const applayLogger = redux.applyMiddleware;
const CAKE_ORDERED = "CAKE_ORDERED";
const RESTORE_CAKE = "RESTORE_CAKE";
const ICE_ORDERED = "ICE_ORDERED";
const ICE_RESTORED = "ICE_RESTORED";

function orderedCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 10,
  };
}
function restoreCake(qty = 1) {
  return {
    type: RESTORE_CAKE,
    payload: qty,
  };
}
function orderIce() {
  return {
    type: ICE_ORDERED,
    payload: 10,
  };
}
function restoreIce(qty = 1) {
  return {
    type: ICE_ORDERED,
    quantity: qty,
  };
}
// const initialState = {
//   numOfCake: 10,
//   numOfIceCream: 10,
// };

const initialCakeState = {
  numOfCake: 10,
};
const initialIceState = {
  numOfIceCream: 10,
};
// (previousState,action) => newState
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCake: state.numOfCake - 1,
      };
    case RESTORE_CAKE:
      return {
        ...state,
        numOfCake: state.numOfCake + action.payload,
      };
    default:
      return state;
  }
};
const iceReducer = (state = initialIceState, action) => {
  switch (action.type) {
    case ICE_ORDERED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      };
    case ICE_RESTORED:
      return {
        ...state,
        numOfCake: state.numOfIceCream + action.payload,
      };
    default:
      return state;
  }
};
const rootReducer = redux.combineReducers({
  cake: cakeReducer,
  ice: iceReducer,
});
const store = createStore(rootReducer, redux.applyMiddleware(logger));
console.log("intailState", store.getState());
const unsubscribe = store.subscribe(
  () => {}
  //   console.log("updatedState", store.getState())
);
store.dispatch(orderedCake());
store.dispatch(orderedCake());
store.dispatch(orderedCake());
store.dispatch(orderIce());
store.dispatch(restoreCake(10));
unsubscribe();
