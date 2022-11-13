import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { register } from '../actions/userActions'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
const RegisterScreen = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate();

    const userRegister = useSelector((state) => state.userRegister);
    console.log(userRegister)
    const { userInfo, loading, error } = userRegister;

    let location = useLocation()
    const redirect = location.search ? location.search.split('?')[1] : '/'

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword)
            alert('Passwords do not match')
        else
            dispatch(register(name , email, password));
    }

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [redirect, userInfo]);
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Register</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter name"
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">confirm password</label>
                    <input
                        type="password"
                        id="confirm password"
                        placeholder="Enter password again"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Register
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        Have account? <Link to="/signin">Login</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen