import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import useShowToast from '../hooks/useShowToast'

const UserPage = () => {

  const [user,setuser] = useState(null);
  const {username} = useParams();
  const showToast = useShowToast();

  useEffect(()=> {
    const getUser = () => {
      try {
        const res = await fetch(`api/user/profile/&{username}`);
        const data = await res.json();
        if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				setUser(data);
        
      } catch (error) {
        showToast("Error", error, "error");
      }
    };

    getUser();
  },[username]);

  if(!user) {
    return null;
  }

  return (
    <>
      <UserHeader user={user}/>
      <UserPost postImg={"/post1.png"} postTitle={"My first Thread."} likes={123} replies={10}/>
      <UserPost postImg={"/post2.png"} postTitle={"Awesome concentration."} likes={13} replies={110}/>
    </>
  )
}

export default UserPage
