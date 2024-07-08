const axios = require("axios");
const redux = require("redux");
var thunkMiddleware = require("redux-thunk").thunk; // Add .default here
const { createStore, applyMiddleware } = redux;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
// Initial State
const initialState = {
  users: [],
  loading: false,
  error: "",
};

// Action Types
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

// Action Creators
const fetchUserRequested = () => ({
  type: FETCH_USERS_REQUESTED,
});

const fetchUserSucceeded = (users) => ({
  type: FETCH_USERS_SUCCEEDED,
  payload: users,
});

const fetchUserFailed = (error) => ({
  type: FETCH_USERS_FAILED,
  payload: error,
});

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case FETCH_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Async Action Creator
const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchUserRequested());
    axios
      .get("https://jsonplaceholder.typicode.com/usersgasdg") // Sample API URL
      .then((res) => {
        const users = res.data.map((user) => user.id);
        dispatch(fetchUserSucceeded(users));
      })
      .catch((err) => {
        dispatch(fetchUserFailed(err.message));
      });
  };
};

// Create Store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUser());
