import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Package } from "lucide-react";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/shopping/payment/order-success/${orderId}`,
          { withCredentials: true }
        );
        setOrderDetails(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div className="mt-24 flex justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6 text-center">

           <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>

       
        <h1 className="text-2xl md:text-3xl font-bold">
          Order Successful!
        </h1>

        <p className="text-gray-600 mt-2">
          Thank you for shopping with <span className="font-medium">UrbanVibe</span>
        </p>

        <div className="mt-6 border rounded-lg p-4 text-left bg-gray-50">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-medium break-all">{orderId}</p>

          {orderDetails && (
            <>
              <div className="flex justify-between mt-4">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-semibold text-lg">
                  ₹{orderDetails.totalAmount}
                </span>
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Payment Status</span>
                <span className="font-medium text-green-600 capitalize">
                  {orderDetails.paymentStatus}
                </span>
              </div>
            </>
          )}
        </div>

      
        <div className="flex items-center justify-center gap-2 mt-5 text-sm text-gray-600">
          <Package className="w-4 h-4" />
          Your order will be shipped soon
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => navigate("/shop/account")}
            className="w-full py-3 rounded-full bg-black text-white font-medium hover:opacity-90 transition"
          >
            View My Orders
          </button>

          <button
            onClick={() => navigate("/shop/home")}
            className="text-sm text-gray-600 hover:underline"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
