import { useState } from "react"
import 'remixicon/fonts/remixicon.css'
import AdminSidebar from "./Sidebar"
import AdminHeader from "./Header"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {

    return (
        <div className="flex h-screen w-full">
            <AdminSidebar />
            <section className={` flex-1 flex flex-col text-white`} >
                <AdminHeader />
                <main className="flex-1  bg-muted p-8">
                   <Outlet/>
                </main>
               
            </section>
        </div>
    )
}


export default AdminLayout






