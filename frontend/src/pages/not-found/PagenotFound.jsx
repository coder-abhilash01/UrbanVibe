import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PagenotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-6 '>

<div className="w-[520px] bg-violet-200 rounded-xl px-10 shadow-sm">

        <img src="/shop/page-not-found.png" className=' '/> </div>
      <h2 className='text-3xl font-semibold'> Oops! Page Not Found</h2>
      <p className='text-center text-muted-foreground  '> The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. </p>
      <Button onClick={()=>navigate("/shop/home")}
        className=" rounded-full" >Continue Shopping</Button>
    </div>
  )
}

export default PagenotFound
