import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
// import OrderDetails from './OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getAllUserOrders } from '@/store/shop/Order.Slice'
import { getAllUserOrdersForAdmin } from '@/store/adminOrderSlice'
import AdminOrderDetails from './AdminOrderDetails'

function AdminViewOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

  const [selectedOrder, setSelectedOrder] = useState(null)
  const { orders } = useSelector(state => state.adminOrders)

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(getAllUserOrdersForAdmin()).then((res) => {
    })



  }, [])

  const handleViewOrders = (order) => {
    setSelectedOrder(order)
    setOpenDetailsDialog(true)
  }

const statusColor = {
  pending: "bg-yellow-500",
  confirmed: "bg-blue-500",
  delivered: "bg-green-600",
  cancelled: "bg-red-500",
  rejected: "bg-red-600",
};



  return (
    <>
      <Table className="text-black">
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
          {orders?.map(order => {
            return <TableRow key={order._id}>
              <TableCell className="font-medium">#{order._id.slice(0,8)}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
             <TableCell> <span
                className={`${statusColor[order.orderStatus] || "bg-gray-400"
                  } text-white text-xs px-3 py-1 rounded-full capitalize`}
              >
                {order.orderStatus}
              </span></TableCell>

              <TableCell className="text-right font-semibold">
                ₹{order?.totalAmount.toLocaleString("en-IN")}
              </TableCell>

              <TableCell className="text-right">

                <Button className="" onClick={() => handleViewOrders(order)}>View Details</Button>

              </TableCell>
            </TableRow>
          })}</TableBody>
      </Table>
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <AdminOrderDetails selectedOrder={selectedOrder} setOpenDetailsDialog={setOpenDetailsDialog} />
      </Dialog>
    </>
  )
}

export default AdminViewOrders
