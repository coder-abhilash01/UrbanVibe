import { checkAuth, logoutUserAction } from '@/store/authSlice'
import React from 'react'
import { useDispatch } from 'react-redux'

const AdminHeader = () => {
  const dispatch = useDispatch()
  return (
    <div className=' p-10 flex justify-end text-black'>
      <button className=' text-2xl font-semibold ' onClick={()=> {dispatch(logoutUserAction())}}> <i className="ri-logout-circle-r-line "></i> Logout</button>
    </div>
  )
}

export default AdminHeader
