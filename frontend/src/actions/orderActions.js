
import axios from 'axios'
import { CART_EMPTY } from '../constants/cartConstants'
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {

    const store = getState()
    const { userInfo } = store.userSignin
    console.log('order: ', order)

    dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
    try {
        const { data } = await axios({
            method: 'post',
            url: 'http://localhost:5000/api/orders',
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