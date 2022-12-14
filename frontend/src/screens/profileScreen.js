import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { detailsUser, updateUser } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


const ProfileScreen = () => {
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    console.log('userInfo', userInfo)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    const userUpdate = useSelector((state) => state.userUpdate);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate, } = userUpdate;
    const navigate = useNavigate()
    useEffect(() => {
        if (!userInfo) {
            navigate('/signup')
        } else {
            if (!user) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });

                dispatch(detailsUser())
            }
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }

    }, [dispatch, user])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password === confirmedPassword) {
            dispatch(updateUser({ userId: user._id, name, email, password }))
        }
        else {
            alert('Passwords do not match')
        }
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        {loadingUpdate && <LoadingBox></LoadingBox>}
                        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                        {successUpdate && <MessageBox variant="success">User updated successfully</MessageBox>}
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}

                            ></input>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Enter confirm password"
                                onChange={(e) => setConfirmedPassword(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label />
                            <button className="primary" type="submit">
                                Update
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}

export default ProfileScreen