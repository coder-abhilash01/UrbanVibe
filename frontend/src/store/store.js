import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import adminProductSlice  from "./adminProductSlice";
import adminOrderSlice  from "./adminOrderSlice";
import shoppingProductsSlice from "./shop/Products.slice";
import shoppingCartSlice from "./shop/cart.Slice";
import shoppingAddressSlice from "./shop/Address.slice";
import shoppingOrderSlice from "./shop/Order.Slice"
import homeProductsSlice from "./shop/HomeProductsSlice";
import shoppingProductReviewSlice from "./shop/reviews.slice";

const store = configureStore({

    reducer: {
        auth: authReducer,
        adminProducts: adminProductSlice,
        adminOrders : adminOrderSlice,
 
        homeProducts:homeProductsSlice,
        shoppingProducts : shoppingProductsSlice,
        shoppingCart : shoppingCartSlice,
        shoppingAddress : shoppingAddressSlice,
        shoppingOrders : shoppingOrderSlice,
        shoppingProductReview : shoppingProductReviewSlice
    }
})

export default store