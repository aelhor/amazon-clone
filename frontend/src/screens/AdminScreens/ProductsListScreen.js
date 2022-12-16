import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { listProducts } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';


const ProductsListScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(listProducts())
    }, [])

    const showProductDetails = (id)=> {
        navigate(`/product/${id}`)
    }
    const HandleDeleteProduct = ()=> { 
        // HandleDeleteProduct
    }
    return (
        <div>
            <h1>Products</h1>{console.log(products)}
            {
                loading ? <LoadingBox /> :
                    error ? <MessageBox>{error}</MessageBox> :
                        <table className="table">
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th>In stock</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(product => {
                                        return (
                                            <tr key={product._id}>
                                                {/* <td>{product._id} </td> */}
                                                <td>{product.name} </td>
                                                <td>{product.price} </td>
                                                <td>{product.category} </td>
                                                <td>{product.brand} </td>
                                                <td>{product.countInStock} </td>
                                                <td>
                                                    <button className='small' onClick={(_id)=>showProductDetails(product._id)}>Details</button>
                                                    <button className='small red_btn' onClick={HandleDeleteProduct()}>
                                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
            }

        </div>
    )
}
export default ProductsListScreen