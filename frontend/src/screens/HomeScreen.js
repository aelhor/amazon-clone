import React, { useEffect, useState } from "react";
import Product from '../components/Product';
// import data from '../data'
import axios from 'axios'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const HomeScreen = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        // fetch products from backend 
        const fetchDate = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/api/products')
                setProducts(data)
                setLoading(false)

            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        fetchDate()
    }, [])
    return (
        <div>
            {loading ? <LoadingBox></LoadingBox>
                : error ? <MessageBox variant="danger">{error}</MessageBox>
                    : <div className="row center">
                        {products.map((product) => (
                            <Product key={product._id} product={product}></Product>
                        ))}
                    </div>
            }


        </div>
    )
}

export default HomeScreen
