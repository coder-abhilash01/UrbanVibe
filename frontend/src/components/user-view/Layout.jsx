import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from './Header'
import Footer from './Footer'

const UserLayout = () => {
  return (
    <div className='w-full overflow-hidden flex flex-col '>
        <UserHeader/>
  
        <Outlet/>

        <Footer/>
    </div>
  )
}

export default UserLayout
