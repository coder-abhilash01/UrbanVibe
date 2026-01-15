import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import OrderDetails from './OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getAllUserOrders } from '@/store/shop/Order.Slice'
import Pagination from './Pagination'

function Orders() {
  const [openDetailsDialog,setOpenDetailsDialog] = useState(false)
  const [selectedOrder,setSelectedOrder] = useState(null)
  const [page,setPage] = useState(1)
  const {user} = useSelector(state=> state.auth)
  const {paginationInfo,orders } = useSelector(state=> state.shoppingOrders)
  const dispatch = useDispatch()
  
  const {totalPages, currentPage , totalOrders } = paginationInfo
 
  useEffect(()=>{
    dispatch(getAllUserOrders({page}))
  
  },[user?.id, dispatch,page])
  

  const handlePreviousPage = ()=>{
     setPage(prev => Math.max(prev - 1, 1));
  }

  const handleNextPage = ()=>{
      setPage(prev => Math.min(prev - 1, totalPages));
  }

  const handlePageClick = (pageNumber)=>{
    setPage(pageNumber)
  }

  const handleViewOrders=(order)=>{
setSelectedOrder(order)
    setOpenDetailsDialog(true)
  }

  const statusColor = {
  pending: "bg-yellow-500",
  confirmed: "bg-green-500",
  delivered: "bg-green-500",
  rejected: "bg-red-500",
};
  return (
    <>
<Table>
  <TableCaption>Order History</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Order Id</TableHead>
      <TableHead>Order Date</TableHead>
      <TableHead>Order Status</TableHead>
      <TableHead className="text-right">Order Price</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {orders?.map(order => {return <TableRow  key={order._id}>
      <TableCell className="font-medium">#{order._id.slice(0,8)}</TableCell>
      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
      <TableCell ><span className={`${ statusColor[order?.orderStatus]} text-white py-1 px-3 rounded-full max-w-[90px] flex  justify-center`}><span>{order.orderStatus}</span></span></TableCell>
      <TableCell className="text-right">{order?.totalAmount?.toLocaleString("en-IN")}</TableCell>
      <TableCell className="text-right">
        
       <Button  onClick={()=>handleViewOrders(order)}> <span className="hover:border-b border-white transition-all duration-500 ">View Details </span></Button>
       
      </TableCell>
    </TableRow>

  }) }


  </TableBody>
</Table>

{totalPages > 1 && (<Pagination
       currentPage={currentPage}
       totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
       />
)}
 <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}> 
       <OrderDetails selectedOrder={selectedOrder}/>
       </Dialog> 
</>
  )
}

export default Orders
