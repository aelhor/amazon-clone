
import { configureStore } from '@reduxjs/toolkit'
import { productDetailsReducer, productListReducer } from "./reducer/productReducer";
import { combineReducers } from 'redux'
import { cartReducer } from './reducer/cartReducers';
const preloadedState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    },
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
});

// store is the container of initState and reducer 
const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    preloadedState, 


})



export default store