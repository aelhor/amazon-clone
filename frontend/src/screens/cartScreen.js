import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart  } from '../actions/cartActions';
import MessageBox from '../components/MessageBox'

const CartScreen = (props) => {
    let params = useParams();
    let location = useLocation()
    let qty = location.search ? parseInt(location.search.split('=')[1]) : 1
    let { id } = params
    console.log(params, qty)
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch()
    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty]);

    const removeFromCartHandler = (id) => {
        console.log(id)
        // dispatch a remove fron=m cart action
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        // Navigate to shipping screen 
        navigate('/shipping')
        
    }
    
    return (

        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ?(
                    <MessageBox>
                        Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>) : (
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.product}>
                                    <div className="row">
                                        <div>
                                            <img src={item.image} alt={item.name} className="small" ></img>
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select value={item.qty} onChange={(e) =>
                                                dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}> {x + 1} </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>${item.price}</div>
                                        <div>
                                            <button type="button" onClick={() => removeFromCartHandler(item.product)}>Delete</button>
                                        </div>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={checkoutHandler}
                                className="primary block"
                                disabled={cartItems.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CartScreen