
import { configureStore } from '@reduxjs/toolkit'
import { productDetailsReducer, productListReducer } from "./reducer/productReducer";
import { combineReducers } from 'redux'
import { cartReducer } from './reducer/cartReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateReducer } from './reducer/userReducers'
import { orderCreateReducer, orderPayReducer, oredrDetailsReducer, oredrsMineListReducer } from './reducer/orderreducer';
const preloadedState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shipping-address')
            ? JSON.parse(localStorage.getItem('shipping-address'))
            : {},
        paymentMethod: 'paypal'
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
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: oredrDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: oredrsMineListReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer

});

// store is the container of initState and reducer 
const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    preloadedState,
})



export default store