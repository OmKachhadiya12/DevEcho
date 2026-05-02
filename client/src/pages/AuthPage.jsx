import React from 'react'
import { useRecoilValue } from 'recoil'
import authScreenAtom from '../atoms/authAtom.js'
import LoginCart from '../components/LoginCart.jsx';
import SignUpCart from '../components/SignUpCart.jsx';

const AuthPage = () => {

    const authScreenState = useRecoilValue(authScreenAtom); 

  return (
    <>
        {authScreenState === "login" ? <LoginCart/> : <SignUpCart/>}
    </>
  )
}

export default AuthPage
