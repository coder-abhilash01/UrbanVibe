import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Address, { initialAddress } from '@/components/user-view/Address'
import AddressCard from '@/components/user-view/AddressCard'
import AddressForm from '@/components/user-view/AddressForm'
import UserCartItemsContent from '@/components/user-view/UserCartItemsContent'
import axiosInstance from '@/lib/axios'
import { fetchAddress } from '@/store/shop/Address.slice'
import { clearCart } from '@/store/shop/cart.Slice'
import { createNewOrder } from '@/store/shop/Order.Slice'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Checkout = () => {
  const [addressFormData, setAddressFormData] = useState(initialAddress)
  const [editedAddressId, setEditedAddressId] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddress, setIsAddress] = useState(false)

  const { cartItems } = useSelector(state => state.shoppingCart)
  const { user } = useSelector(state => state.auth)
  const { addressList } = useSelector(state => state.shoppingAddress)
  const { isLoading } = useSelector(state => state.shoppingOrders);
const formRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAddress({ userId: user.id }))
    }
  }, [dispatch, user?.id])

  const totalAmount =
    cartItems?.items?.reduce(
      (acc, item) => acc + item.salePrice * item.quantity,
      0
    ) || 0;

const handleAddAddress = () => {
    setIsAddress(!isAddress)
    setAddressFormData(initialAddress)
    setEditedAddressId(null)
    setTimeout(()=>{   formRef.current?.scrollIntoView({ behavior: "smooth" }) },100)

  }


  const handlePayment = async () => {
    if (!selectedAddress) { return toast.info("Please select an Address!") }
    if (!cartItems.items.length) { return toast.info("Your cart is empty!") }

    const res = await dispatch(createNewOrder({ selectedAddress }))

    if (!res.payload?.success) {
      return toast.error("Failed to create order");
    }

    const { orderId, amount, razorpayOrderId, razorpayKey } = res.payload
    

    const options = {
      key: razorpayKey,
      amount: amount,
      currency: "INR",
      name: "UrbanVibe",
      order_id: razorpayOrderId,
      handler: async function (response) {

        try {
          const verifyRes = await axiosInstance.post(
            "/api/shopping/payment/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: orderId
          }, { withCredentials: true }
          )
 dispatch(clearCart())
          toast.success("payment successfull")
          navigate(`/shop/order/order-success/${orderId}`);

        } catch (err) {
          console.log(err)
          toast.error(err.response.data.message || "payment verification failed")
        }

      },
      theme: {
        color: "#000"
      }


    }

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", async function (response) {
      toast.error("Payment Failed!");
      console.log("payment failed")

      // ⭐ Update order to failed
      await axiosInstance.post(
        "/api/shopping/payment/order-failed",
        {
          orderId: orderId,
          reason: response.error.reason,
          description: response.error.description
        },
        { withCredentials: true }
      );

      navigate(`/shop/order/failed/${orderId}`);
    });
    rzp.open();
  }

  return (
    <div className='mt-20 flex flex-col items-center gap-10 md:gap-5 w-full bg-gray-50'>
      <div className=' flex flex-col sm:flex-row sm:gap-4 md:gap-8 p-4 pb-8 w-full md:min-h-[80vh]  rounded-lg '>

        <div className=' w-full sm:w-1/2 mb-6 md:mb-10 flex flex-col gap-1 md:px-4'>

          <h3 className='font-semibold text-xl md:text-2xl '>Delivery Address</h3>
          <div className='flex w-full gap-4 overflow-auto sm:flex-wrap no-scrollbar mt-2 mb-4'>
            {addressList && addressList.length > 0 ? addressList.map((addressInfo) =>
              <AddressCard addressInfo={addressInfo}
                setAddressFormData={setAddressFormData}
                setSelectedAddress={setSelectedAddress}
                selectedAddress={selectedAddress}
                setEditedAddressId={setEditedAddressId}
                key={addressInfo._id} />) :
              <div className='flex flex-col w-fit p-8 items-center  mt-6 bg-white mx-auto rounded-lg'>
                <img src="/shop/addressLocation.png" className='w-24' />
                <h2 className='text-black font-medium text-xl text-center'> No Addresses found in your account!</h2>
                <p className='text-black/50 font-medium '> Add a delivery address.
                </p>  </div>}</div>
                           <span className='text- text-muted-foreground font-medium  text-center sm:text-start'>( ⓘ Please select or add a delivery address to continue )</span>

                <Button onClick={handleAddAddress} className="mt-4  w-2/3 ">Add Delivery Address</Button>
                </div>


        <div className='flex flex-col w-full sm:w-1/2 md:px-3 gap-3'>
          <h1 className='text-xl md:text-2xl font-semibold'> Order Summery</h1>
          <div className='w-full flex flex-col border shadow rounded-lg px-2 pb-3 bg-white  '>
            {cartItems?.items?.length ? cartItems.items?.map((item, i) =>
              <UserCartItemsContent item={item} key={i} />) :
              <div className=' grid justify-center p-2'>
                <img
                  src="/shop/empty-cart.png" alt="Empty Cart"
                  className="w-24  opacity-90 mx-auto"
                />

                <h2 className="text-lg font-semibold text-gray-800 text-center">
                  Your cart is Empty!</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Add items you love and they’ll appear here.
                </p>

                <button
                  onClick={() => {
                    navigate("/shop/home");
                    setOpenCartSheet(false);
                  }}
                  className="mt-2 px-6 py-2 rounded-full bg-yellow-400 text-black text-sm font-medium hover:opacity-90 transition"
                >
                  Browse products
                </button>
              </div>}

            <div className='flex flex-1 flex-col mt-8 border-t pt-2  '>
              <div className='flex justify-between items-center px-4'>
                <span className='font-semibold text-lg'>Total</span>
                <span className='font-semibold text-3xl text-yellow-500'>
                  ₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
              <Button disabled={!cartItems?.items?.length || isLoading} className="w-full mt-5 p-6 rounded-full bg-yellow-500 text-lg" onClick={handlePayment} >Pay</Button>
           
           <span className='text- text-muted-foreground font-medium  text-center'>ⓘ Test Mode — No real payment will be deducted</span>
            </div></div>
        </div>
      </div>

    { isAddress && (<div className='w-full px-5 bg-white ' ref={formRef}>
        <Separator />
        <AddressForm addressFormData={addressFormData}
          setAddressFormData={setAddressFormData}
          editedAddressId={editedAddressId}
          setEditedAddressId={setEditedAddressId}

        /> </div>)}
    </div>
  )
}

export default Checkout