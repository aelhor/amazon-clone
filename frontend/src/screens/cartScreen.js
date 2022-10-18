import React, { useEffect } from "react";
import { useParams,useLocation } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const CartScreen = (props)=> { 
    let  params  = useParams();
    let location = useLocation()
    let qty =location.search? parseInt(location.search.split('=')[1]):1
    let {id} = params
    console.log(params, qty)

    const dispatch = useDispatch()
    useEffect(() => {
        if(id){
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty]);

    return(
        <div>productId: {id}, quantity: {qty}</div>
    )
}

export default CartScreen