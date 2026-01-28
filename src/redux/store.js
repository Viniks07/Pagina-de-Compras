import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_CART_ITEM":
      return {
        ...state,
        [action.payload.productId]:(state[action.payload.productId] || 0) + action.payload.quantity,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cart: cartReducer,
  form: formReducer,
});

const store = createStore(rootReducer);

export default store;
