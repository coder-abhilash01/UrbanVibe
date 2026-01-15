import { XCircle, RefreshCcw, Home } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
        
   
        <div className="flex justify-center mb-4">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          Payment Failed
        </h1>

        
        <p className="text-gray-600 mt-2 text-sm">
          We couldn’t complete your payment.  
          Don’t worry — if any amount was deducted, it will be refunded automatically.
        </p>

       
        <div className="bg-gray-100 rounded-lg p-4 mt-4 text-left">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Order ID:</span> {orderId}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-red-500">Payment Failed</span>
          </p>
        </div>

      
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => navigate(`/shop/checkout`)}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
          >
            <RefreshCcw size={18} />
            Retry Payment
          </button>

          <button
            onClick={() => navigate("/shop/home")}
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Home size={18} />
            Go to Home
          </button>
        </div>

    
        <p className="text-xs text-gray-500 mt-4">
          Need help? Contact our support with your Order ID.
        </p>
      </div>
    </div>
  );
};

export default PaymentFailed;
