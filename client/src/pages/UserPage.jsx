import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (
    <>
      <UserHeader/>
      <UserPost postImg={"/post1.png"} postTitle={"My first Thread."} likes={123} replies={10}/>
      <UserPost postImg={"/post2.png"} postTitle={"Awesome concentration."} likes={13} replies={110}/>
    </>
  )
}

export default UserPage
