import React from 'react'

const CheckoutSteps = (props)=>{
    return(
        <div className='row checkout-steps'>
            <div className={props.step1?'active' : ''} >Sign in</div>
            <div className={props.step2?'active' : ''} >Shepping</div>
            <div className={props.step3?'active' : ''} >Payment</div>
            <div className={props.step4?'active' : ''} >place Order</div>
        </div>
    )
}

export default CheckoutSteps
