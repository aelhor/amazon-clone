
import { configureStore } from '@reduxjs/toolkit'
import { productDetailsReducer, productListReducer } from "./reducer/productReducer";
import {combineReducers} from 'redux'
// const initState = {}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,

  });
  
// store is the container of initState and reducer 
const store = configureStore( { reducer , middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        thunk: {
            // extraArgument: myCustomApiService
        }
    }) })


export default store