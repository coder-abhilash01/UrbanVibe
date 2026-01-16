import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, fetchCartItems, updateCartQuantity } from '@/store/shop/cart.Slice'
import { toast } from 'sonner'

const UserCartItemsContent = ({ item }) => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleCartItemDelete = (item) => {

    dispatch(deleteCartItem({ userId: user.id, productId: item.productId })).then(res => {
      
      if (res.payload?.success) {
        const userId = user.id
        
        dispatch(fetchCartItems(userId))
        toast.success("Item is deleted successfully")
      }
    })


  }


  const handleUpdateCartQty = (item, typeOfAction)=>{
    dispatch(updateCartQuantity({ userId: user.id, productId : item.productId, quantity: typeOfAction =="plus" ? (item.quantity +1) :(item.quantity - 1) }))
    .then(res => {if(res.payload?.success){toast.success("Cart Quantity updated")}})

  }
  return (
    <div className='flex  mt-4 p-2 items-center space-x-3 shadow bg-white rounded-lg border'>
      <div className=' relative w-14 h-16  sm:w-20 sm:h-20 aspect-square  overflow-hidden'> 
        <img src={item?.image} className='w-full h-full object-center rounded object-contain' /></div>
      <div className='flex flex-col gap-2'>
        <h3 className='font-bold  line-clamp-1'>{ item?.title}</h3>
         <span>Qty :</span> 
        <div className='flex gap-2 items-center font-medium text-sm '>
         
          <Button variant="outline"
           size='icon'
           className="w-6 h-6 sm:w-7 sm:h-7"
           disabled={item?.quantity === 1}
           onClick={() => handleUpdateCartQty(item, "minus")}><Minus /></Button>
          <span className='font-semibold sm:text-lg'>{item?.quantity}</span>
          <Button variant="outline" className="w-6 h-6 sm:w-7 sm:h-7" size="icon" onClick={() => handleUpdateCartQty(item, "plus")}><Plus /></Button>
        </div>
      </div>
      <div className='flex flex-col flex-1 items-end gap-2'>
        <Trash2 size={16} className='hover:text-red-600 cursor-pointer' onClick={() => handleCartItemDelete(item)} />
        <p className='font-semibold text-sm'> ₹{((item?.price > 0 ? item?.salePrice : item?.price) * item?.quantity).toLocaleString("en-IN",{ minimumFractionDigits: 2 })}</p>
      </div>
    </div>
  )
}

export default UserCartItemsContent
