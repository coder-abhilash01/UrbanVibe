import React, { useState } from "react";
import {
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import {
  MapPin,
  NotebookPen,
  ShoppingCart,
  User2,
  CheckCircle,
  Clock,
  Package,
  XCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import {
  getAllUserOrdersForAdmin,
  updateOrderStatus,
} from "@/store/adminOrderSlice";
import { toast } from "sonner";
import OrderStatusTimeLine from "../common/Orders/OrderStatusTimeLine";
import { DialogDescription } from "@radix-ui/react-dialog";
import InfoCard from "../common/Orders/OrderInfoCard";

const STATUS_FLOW = ["pending", "confirmed", "delivered"];


const AdminOrderDetails = ({ selectedOrder, setOpenDetailsDialog }) => {
  const [orderStatus, setOrderStatus] = useState("");
  const dispatch = useDispatch();

  if (!selectedOrder) return null;

  const statusColor ={
    pending :"bg-yellow-100",
    confirmed : "bg-green-400",
    delivered : "bg-green-400",
    rejected :"bg-red-500"
  }

  const handleUpdateOrderStatus = async () => {
    const res = await dispatch(
      updateOrderStatus({
        id: selectedOrder._id,
        orderStatus,
      })
    );

    if (res?.payload?.success) {
      toast.success("Order status updated");
      dispatch(getAllUserOrdersForAdmin());
      setOpenDetailsDialog(false);
    }
  };

  return (
    <DialogContent className="
      w-[95vw] 
      max-w-5xl 
      max-h-[90vh] 
      overflow-y-auto 
      rounded-xl
    ">
        <DialogDescription></DialogDescription>
      {/* HEADER */}
      <DialogTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
         <div className="w-full flex justify-between items-center">
            <div>
          <h2 className="text-2xl font-bold">Order Details</h2>
          <p className="text-sm text-muted-foreground">
            #{selectedOrder?._id.slice(0,8)}
          </p>
        </div>

        <div>
          <p className="font-semibold text-lg">
            ₹{selectedOrder?.totalAmount}
          </p>
          <p className="text-sm text-muted-foreground">
            Razorpay
          </p>
        </div></div>
      </DialogTitle>


      {/* TIMELINE */}
    <OrderStatusTimeLine selectedOrderStatus={selectedOrder?.orderStatus?.toUpperCase()}/>

      <Separator className="my-6" />

      {/* INFO CARDS */}
        <div className="grid sm:grid-cols-2 gap-6  ">
                {/* Shipping */}
                <InfoCard
                    icon={<MapPin size={18} />}
                    title="Shipping Info"
                    content={<p className="capitalize ml-2 font-medium text-gray-900">{selectedOrder?.selectedAddress?.address}</p>}
                />

                {/* Order Info */}
                <InfoCard
                    icon={<ShoppingCart size={18} />}
                    title="Order Info"
                    content={
                        <>
                            <p>Payment Method : <span className=" ml-2 font-medium text-gray-900"> RAZORPAY</span></p>
                            <p>Payment Status: <span className={` ml-2 font-medium text-gray-900`}>{selectedOrder?.paymentStatus}</span> </p>
                            <p className="mt-1"> Order Status: <span className={`${statusColor[selectedOrder?.orderStatus]} ml-2 font-medium px-2 py-0.5 rounded-full text-xs capitalize text-white`}>{selectedOrder?.orderStatus} </span></p>
                        </>
                    }
                />

                {/* Customer Info */}
                <InfoCard
                    icon={<User2 size={18} />}
                    title="Customer Info"
                    content={
                        <>
                            <p className="capitalize">Name: <span className="ml-2 font-medium text-gray-900">{selectedOrder?.customerInfo?.name || "N/A"}</span></p>
                            <p >Phone: <span className="ml-2 font-medium text-gray-900">{selectedOrder?.selectedAddress?.phone || "N/A"}</span></p>
                            <p>Email: <span className="ml-2 font-medium text-gray-900">{selectedOrder?.customerInfo?.mail || "N/A"}</span> </p>
                        </>
                    }
                />

                {/* Note */}
                <InfoCard
                    icon={<NotebookPen size={18} />}
                    title="Note"
                    content={
                        selectedOrder?.selectedAddress?.notes || "No notes provided"
                    }
                />
            </div>

      {/* ITEMS */}
      <Separator className="my-6" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Qty</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {selectedOrder?.cartItems?.length >0 && selectedOrder?.cartItems?.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="flex gap-3 items-center">
                <img
                  src={item.image}
                  className="w-12 h-12 rounded object-cover"
                />
                <span>{item.title}</span>
              </TableCell>
              <TableCell>₹{item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="text-right font-semibold">
              Total
            </TableCell>
            <TableCell className="font-bold">
              ₹{selectedOrder.totalAmount}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* UPDATE STATUS */}
      <div className="mt-6 bg-muted/50 p-4 rounded-lg">
        <p className="font-semibold mb-2">Update Order Status</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            className="border rounded-md px-3 py-2 w-full sm:w-52"
            onChange={(e) => setOrderStatus(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="delivered">Delivered</option>
            <option value="rejected">Rejected</option>
          </select>

          <Button
            disabled={!orderStatus}
            onClick={handleUpdateOrderStatus}
          >
            Update Status
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetails;




