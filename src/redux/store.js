import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

// Rota de update do carrinho

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_CART_ITEM":
      return {
        ...state,
        [action.payload.productId]:
          (state[action.payload.productId] || 0) + action.payload.quantity,
      };

    case "CLEAR_CART":
      return {};
    default:
      return state;
  }
};

// Rota de envio de informações pra pagina de finalização

const checkoutReducer = (state = { lastOrder: null }, action) => {
  switch (action.type) {
    case "SET_FINAL_ORDER":
      return {
        ...state,
        lastOrder: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cart: cartReducer,
  checkout: checkoutReducer,
  form: formReducer,
});

const store = createStore(rootReducer);

export default store;
