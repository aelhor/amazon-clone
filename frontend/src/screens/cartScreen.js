import React from "react";
import { useParams,useLocation } from "react-router-dom";


const CartScreen = (props)=> { 
    let  params  = useParams();
    let location = useLocation()
    let qty =location.search? parseInt(location.search.split('=')[1]):1
    let {id} = params
    console.log(params, qty)

    return(
        <div>productId: {id}, quantity: {qty}</div>
    )
}

export default CartScreen