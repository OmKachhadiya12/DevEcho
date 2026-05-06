import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import useShowToast from '../hooks/useShowToast'
import { Flex, Spinner } from "@chakra-ui/react";

const UserPage = () => {

  const [user,setuser] = useState(null);
  const {username} = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);

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
      } finally {
				setLoading(false);
			}
    };

    getUser();
  },[username]);

  if (!user && loading) {
		return (
			<Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		);
	}
	if (!user && !loading) return <h1>User not found</h1>;

  return (
    <>
      <UserHeader user={user}/>
      <UserPost postImg={"/post1.png"} postTitle={"My first Thread."} likes={123} replies={10}/>
      <UserPost postImg={"/post2.png"} postTitle={"Awesome concentration."} likes={13} replies={110}/>
    </>
  )
}

export default UserPage
