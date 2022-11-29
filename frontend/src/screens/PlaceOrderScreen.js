import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/Checkoutsteos'
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { savePrices } from '../actions/cartActions';

const PlaceOrderScreen = () => {

    const cart = useSelector((state) => state.cart);
    const { cartItems, shippingAddress } = cart
    const dispatch = useDispatch()
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    let prices = {}
    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    prices.itemsPrice = cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    prices.shippingPrice = prices.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    prices.taxPrice = toPrice(0.15 * prices.itemsPrice);
    prices.totalPrice = prices.itemsPrice + prices.shippingPrice + prices.taxPrice;


    const navigate = useNavigate()
    useEffect(() => {
        // dispatch actions for calcuating pricesand save them in cart 
        dispatch(savePrices(prices))

        if (!cart.paymentMethod) {
            navigate('/payment')
        }
        if (success) {
            navigate(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [cart.paymentMethod, success, order, dispatch, navigate])



    const placeOrderHandler = (e) => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems, 
            itemsPrice: prices.itemsPrice,      
            shippingPrice: prices.shippingPrice,
            taxPrice: prices.taxPrice,
            totalPrice: prices.totalPrice }))
    };
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className='row top '>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong>{shippingAddress.fullName}
                                    <strong>Address: </strong>{shippingAddress.address},{shippingAddress.city},{shippingAddress.country}, {shippingAddress.postalCode}

                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>payment method: </strong>{cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Cart Items</h2>
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
                                                <div> {item.qty} x ${item.price} = ${item.qty * item.price}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>

                    </ul>
                </div>

                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${prices.itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${prices.shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${prices.taxPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong> Order Total</strong>
                                    </div>
                                    <div>
                                        <strong>${prices.totalPrice}</strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={placeOrderHandler}
                                    className="primary block"
                                    disabled={cart.cartItems.length === 0}
                                >
                                    Place Order
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen