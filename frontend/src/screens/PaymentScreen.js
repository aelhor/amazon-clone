import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/Checkoutsteos'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = (props) => {
    const style = {
        'display': 'flex', 'flexDirection': 'row'
    }
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('paypal')
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    console.log(shippingAddress)


    useEffect(() => {
        if (!shippingAddress.data) {
            console.log('shippingAddress: ',shippingAddress)
            console.log(shippingAddress)
            navigate('/shipping')
        }
    }, [shippingAddress]);

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>payment method</h1>
                </div>
                <div style={style} >
                    <input type='radio' id='paypal' value='paypal' name='paymentMethod' required checked onChange={e => setPaymentMethod(e.target.value)}></input>
                    <label htmlFor='paypal'>Paypal</label>
                </div>

                <div style={style} >
                    <input type='radio' id='visa' value='visa' name='paymentMethod' required onChange={e => setPaymentMethod(e.target.value)}></input>
                    <label htmlFor='visa'>Visa</label>
                </div>

                <div>
                    <button type='submit'>Continue</button>
                </div>

            </form>
        </div>
    )
}

export default PaymentScreen