import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button'
import { ChartNoAxesCombined } from 'lucide-react'

const AdminSidebar = () => {
  const [open,setOpen] = useState(false)
  return (
    <>
      <aside
        className=" hidden w-[280px]  h-full border md:flex flex-col text-black p-3 px-4 ">
        <h1 className='text-2xl font-bold mt-5'> <i className="ri-dashboard-fill"></i> Admin Pannel</h1>

        <div className="flex flex-col space-y-2 text-xl mt-10">
          <Link to="/admin/dashboard" className='hover:bg-muted px-3 py-3 rounded cursor-pointer'> <i className="ri-home-4-fill text-2xl"></i> Dashboard</Link>
          <Link to="/admin/orders" className='hover:bg-muted px-3 py-3 rounded cursor-pointer'> <i className="ri-shopping-basket-2-fill text-2xl"></i> Orders</Link>
          <Link to="/admin/products" className='hover:bg-muted px-3 py-3 rounded cursor-pointer'> <i className="ri-product-hunt-fill text-2xl"></i> Products</Link>
        </div>
      </aside>


<div className="md:hidden ">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger > <i className="ri-menu-2-line absolute border p-1 px-2 mt-6 ml-5 bg-black hover:bg-muted-foreground rounded text-white"></i></SheetTrigger>
        <SheetContent side="left">
   <SheetHeader>
  <SheetTitle className="text-2xl flex mt-5 gap-2">
    <ChartNoAxesCombined size={30}/>
     Admin Panel </SheetTitle>
  <SheetDescription />
</SheetHeader>


        <div className="flex flex-col space-y-2 text-xl mt-4 ">
          <Link to="/admin/dashboard" className='hover:bg-muted px-3 py-3 rounded cursor-pointer' onClick={()=>setOpen(!open)}> <i className="ri-home-4-fill text-2xl"></i> Dashboard</Link>
          <Link to="/admin/orders" className='hover:bg-muted px-3 py-3 rounded cursor-pointer' onClick={()=>setOpen(!open)}> <i className="ri-shopping-basket-2-fill text-2xl"></i> Orders</Link>
          <Link to="/admin/products" className='hover:bg-muted px-3 py-3 rounded  cursor-pointer'onClick={()=>setOpen(!open)}> <i className="ri-product-hunt-fill text-2xl"></i> Products</Link>
        </div>
        </SheetContent>
      </Sheet></div>
    </>
  )
}

export default AdminSidebar
