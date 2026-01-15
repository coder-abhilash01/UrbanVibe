import React from "react";
import {
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import {
    MapPin,
    NotebookPen,
    ShoppingCart,
    User2,
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
import OrderStatusTimeLine from "../common/Orders/OrderStatusTimeLine";
import InfoCard from "../common/Orders/OrderInfoCard";

const OrderDetails = ({ selectedOrder }) => {
      const statusColor ={
    pending :"bg-yellow-100",
    confirmed : "bg-green-400",
    delivered : "bg-green-400",
    rejected :"bg-red-500"
  }

    return (
        <DialogContent className="sm:max-w-[820px] max-h-[90vh] overflow-y-auto border rounded-xl ">
            <DialogDescription />
            <DialogTitle className="text-2xl font-bold mb-3">
                Order Details
            </DialogTitle>


            <div className="flex flex-col gap-2 ">
                <div className="flex flex-wrap items-center gap-4 text-sm ">
                    <span className="text-muted-foreground">Order ID</span>
                    <span className="font-medium">
                        #{selectedOrder?._id?.slice(0, 8)}
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Order Date</span>
                    <span className="font-medium">
                        {new Date(selectedOrder?.createdAt).toLocaleDateString()}
                    </span>
                </div>


            </div>

            <OrderStatusTimeLine selectedOrderStatus={selectedOrder?.orderStatus.toUpperCase()} />
            <Separator className="my-4" />

         
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
                            <p>Payment Status: <span className="ml-2 font-medium text-gray-900">{selectedOrder?.paymentStatus}</span> </p>
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

            {/* Items */}
            <div className="mt-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Qty</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {selectedOrder?.cartItems?.map((item) => (
                            <TableRow key={item?._id}>
                                <TableCell className="flex items-center gap-3">
                                    <img
                                        src={item?.image}
                                        className="w-16 h-12 rounded-md object-cover border"
                                        alt={item?.title}
                                    />
                                    <span className="font-medium">{item?.title}</span>
                                </TableCell>
                                <TableCell>₹{item?.price.toLocaleString()}</TableCell>
                                <TableCell>{item?.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2} className="text-right text-sm text-muted-foreground">
                                Total Amount
                            </TableCell>
                            <TableCell className="text-xl font-bold text-green-600">
                                ₹{selectedOrder?.totalAmount?.toLocaleString()}
                            </TableCell>
                        </TableRow>
                    </TableFooter>

                </Table>
            </div>
        </DialogContent>
    );
};

export default OrderDetails;


