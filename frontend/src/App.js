import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import CartScreen from './screens/cartScreen';

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen';

function App() {
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
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
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route path="/product/:id" element={<ProductScreen />} ></Route>
            <Route path="/cart/" element={<CartScreen />} ></Route>
            <Route path="/cart/:id" element={<CartScreen />} ></Route>

          </Routes>


        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;