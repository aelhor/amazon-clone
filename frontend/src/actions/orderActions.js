
import axios from 'axios'
import { CART_EMPTY } from '../constants/cartConstants'
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from '../constants/orderConstants'

import {url} from '../prod'

export const createOrder = (order) => async (dispatch, getState) => {

    const store = getState()
    const { userInfo } = store.userSignin

    dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
    try {
        const { data } = await axios({
            method: 'post',
            url: url+'api/orders',
            // url: '/api/orders',
            data: { order },
            headers: {
                authorization: `bearer ${userInfo.token}`
            }
        })

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
        // we create the order now remove all items from cart 
        dispatch({ type: CART_EMPTY })
        localStorage.removeItem('cartItems')


    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const detailsOrder = (orderId) => async (dispatch, getState) => {

    const store = getState()
    const { userInfo } = store.userSignin

    dispatch({ type: ORDER_DETAILS_REQUEST })
    try {
        const { data } = await axios({
            method: 'get',
            url: url + `api/orders/${orderId}`,
            headers: {
                authorization: `bearer ${userInfo.token}`
            }
        })        
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } 
    catch (error) {
        const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
    }
} 


export const payOrder = (order, paymentResult) => async (dispatch, getState) => {

    const store = getState()
    const { userInfo } = store.userSignin

    dispatch({ type: ORDER_PAY_REQUEST, payload: {order, paymentResult} })
    try {
        const { data } = await axios({
            method: 'put',
            url: `${url}api/orders/${order._id}/pay`,
            // url: '/api/orders',
            data: {paymentResult},
            headers: {
                authorization: `bearer ${userInfo.token}`
            }
        })

        dispatch({ type: ORDER_PAY_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const listOrderMine= (orderId) => async (dispatch, getState) => {

    const store = getState()
    const { userInfo } = store.userSignin

    dispatch({ type: ORDER_MINE_LIST_REQUEST })
    try {
        const { data } = await axios({
            method: 'get',
            url: `${url}api/orders/all`,
            headers: {
                authorization: `bearer ${userInfo.token}`
            }
        })        
        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
    } 
    catch (error) {
        const message = error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
    }
} 
