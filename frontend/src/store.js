
import { configureStore } from '@reduxjs/toolkit'
import { productDetailsReducer, productListReducer } from "./reducer/productReducer";
import { combineReducers } from 'redux'
import { cartReducer } from './reducer/cartReducers';
import { userRegisterReducer, userSigninReducer } from './reducer/userReducers'
const preloadedState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    },
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister : userRegisterReducer
});

// store is the container of initState and reducer 
const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    preloadedState,
})



export default store