import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate , Outlet } from 'react-router-dom';


export default function PrivateRoute({ component: Component, ...rest }) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    return (
      userInfo.isAdmin?<Outlet/> : <Navigate to='/'></Navigate>
    );
}