import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import MessageBox from '../../components/MessageBox';
import LoadingBox from '../../components/LoadingBox';


const CreateProductScreen = () => {

    const [inputFields, setInputFields] = useState({
        name: '',
        brand: '',
        category: '',
        description: '',
        price: '',
        countInStock: '',
        image: '',
    })
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [sucess, setSucess] = useState(false)
    


    const inputhandler = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value })
    }
    const imageUpload = (e) => {
        console.log(e.target.files[0])
        setInputFields({ ...inputFields, image: e.target.files[0] })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log('inputFields: ', inputFields)
        const bodyFormData = new FormData()
        bodyFormData.append('name', inputFields.name)
        bodyFormData.append('brand', inputFields.brand)
        bodyFormData.append('category', inputFields.category)
        bodyFormData.append('description', inputFields.description)
        bodyFormData.append('price', inputFields.price)
        bodyFormData.append('countInStock', inputFields.countInStock)
        bodyFormData.append('image', inputFields.image)
        setLoading(true);
        try {
            const { data } = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/products',
                data: bodyFormData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `bearer ${userInfo.token}`
                }
            })
            setLoading(false);
            setSucess(true)
            // console.log(data)
        } catch (error) {
            setError(error.response.data.message)
            console.log(error)
            setLoading(false);

        }

    }

    return (
        <div>
            
            {error&& <MessageBox variant="danger">{error}</MessageBox> }
            {loading && <LoadingBox/>}
            {!error && sucess&& <MessageBox variant="alert-success">Product created sucessfully </MessageBox> }
            
            <form className='form' onSubmit={handleSubmit} autoComplete="on">
                <div>
                    <label htmlFor='name'>product Name</label>
                    <input type='text' id='name' name='name' required placeholder='Enter product name' value={inputFields.name} onChange={inputhandler} />
                </div>
                <div>
                    <label htmlFor='brand'>Barnd</label>
                    <input type='text' id='brand' name='brand' required placeholder='Enter brand' value={inputFields.brand} onChange={inputhandler} />
                </div>
                <div>
                    <label htmlFor='category'>Category</label>
                    <input type='text' id='category' name='category' required placeholder='Enter category' value={inputFields.category} onChange={inputhandler} />
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <input type='text' id='description' name='description' required placeholder='Enter description' value={inputFields.description} onChange={inputhandler} />
                </div>

                <div>
                    <label htmlFor='price'>price</label>
                    <input type='text' id='price' name='price' required placeholder='Enter price' value={inputFields.price} onChange={inputhandler} />
                </div>

                <div>
                    <label htmlFor='countInStock'>countInStock</label>
                    <input type='text' id='countInStock' name='countInStock' required placeholder='How many do you have ?' value={inputFields.countInStock} onChange={inputhandler} />
                </div>

                <div>
                    <label htmlFor='image'>image</label>
                    <input type='file' id='image' name='image' required onChange={imageUpload} />
                </div>

                <div>
                    <label />
                    <button className="primary" type="submit">
                        Craete
                    </button>
                </div>
            </form>
        </div>
    )
}
export default CreateProductScreen