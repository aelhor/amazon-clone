import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/Checkoutsteos'
import {saveShippingAddress} from '../actions/cartActions'
import {  useNavigate } from 'react-router-dom';

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart
    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [city, setCity] = useState(shippingAddress.city)
    const [country, setCountry] = useState(shippingAddress.country)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [address, setAddress] = useState(shippingAddress.address)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin   
    
    
    useEffect(() => {
       if(!userInfo){
        navigate('/signin')
       }
    }, [userInfo]);


    const handleSubmit = (e)=> { 
        e.preventDefault()
        dispatch(saveShippingAddress({fullName, city, country, address, postalCode}))
        navigate('/payment')

    }


    return (
        <div>
            <CheckoutSteps step1 step2 />
            <form className='form' onSubmit={handleSubmit}>
                <div>
                    <h1>Shipping adress</h1>
                </div>
                <div>
                    <label htmlFor='fullName'>Full Name</label>
                    <input type='text' required id='fullName' placeholder='Enter Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='address'>Address</label>
                    <input type='text' required id='address' placeholder='Enter Full Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='city'>City</label>
                    <input type='text' required id='city' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <input type='text' required id='country' placeholder='Enter country' value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>

                <div>
                    <label htmlFor='postalCode'>Postal Code</label>
                    <input type='text' required id='postalCode' placeholder='Enter postal Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>
            </form>

        </div>
    )
}

export default ShippingScreen