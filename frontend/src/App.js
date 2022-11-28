import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import CartScreen from './screens/cartScreen';

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen';
import SinginScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';

import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/orderScreen';
function App() {
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              amazon clone
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route path="/product/:id" element={<ProductScreen />} ></Route>
            <Route path="/cart/" element={<CartScreen />} ></Route>
            <Route path="/cart/:id" element={<CartScreen />} ></Route>
            <Route path="/signin/" element={<SinginScreen />} ></Route>
            <Route path="/register/" element={<RegisterScreen />} ></Route>
            <Route path="/shipping/" element={<ShippingScreen />} ></Route>
            <Route path="/payment/" element={<PaymentScreen />} ></Route>
            <Route path="/placeorder/" element={<PlaceOrderScreen />} ></Route>
            <Route path="/order/:orderId" element={<OrderScreen />} ></Route>

          </Routes>


        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;