import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./fetaures/user/userSlice";
import cartReducer from "./fetaures/cart/cartSlice";

const store = configureStore({
  reducer: { user: userReducer, cart: cartReducer },
});

export default store;
