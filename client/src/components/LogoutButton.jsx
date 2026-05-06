import React from 'react'
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {

    const setUser = useRecoilState(userAtom);
    const showToast = useShowToast();

    const handleLogout = async() => {
        try {

            const res = await fetch("/api/user/logout",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();

            if(data.error) {
                showToast("Error",data.error,"error");
                return;
            }

            localStorage.removeItem("users-threads");
            setUser(null);
            
        } catch (error) {

            showToast("Error",error.message,"error");

        }
    }

  return (
    <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
        <FiLogOut size={20} />
	</Button>
  )
}

export default LogoutButton
