import React from "react"
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full md:flex">
 
      <div className="md:flex-1 flex items-center justify-center bg-gradient-to-br from-black to-gray-900 px-6 py-10">
        <div className="text-center text-white max-w-md">
          <h1 className=" text-2xl sm:text-4xl font-bold mb-3">Welcome to UrbanVibe</h1>
          <p className="text-gray-300 sm:text-lg">
            Shop smarter. Discover better deals. Experience premium fashion.
          </p>
        </div>
      </div>

     
      <Outlet />
    </div>
  )
}

export default AuthLayout
