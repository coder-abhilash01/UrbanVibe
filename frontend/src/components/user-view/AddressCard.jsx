import React, { use } from 'react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAddress, fetchAddress } from '@/store/shop/Address.slice'
import { toast } from 'sonner'
import { Check, DeleteIcon, Edit2Icon, Trash2 } from 'lucide-react'

const AddressCard = ({ addressInfo, setAddressFormData, setEditedAddressId, setSelectedAddress, selectedAddress}) => {
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const handleAddressEdit = (addressInfo) => {
    setEditedAddressId(addressInfo._id)
    setAddressFormData(addressInfo)
  }

  const handleAddressDelete = () => {
    dispatch(deleteAddress({ userId: user.id, addressId: addressInfo._id }))
      .then((data) => {
        if (data.payload?.success) {
          dispatch(fetchAddress({ userId: user.id }))
          toast.success(data.payload?.message)

        }
      })
  }

  return (

    <div className={`min-w-[380px] sm:min-w-[320px] sm:w-[300px] flex flex-col gap-1 border relative
       ${selectedAddress?._id == addressInfo?._id  ? "border-green-500 shadow-green-500":"border-black/10"}
        py-3 px-6 rounded-lg shadow-md hover:scale-102 cursor-pointer bg-white `}
     onClick={()=> { setSelectedAddress(addressInfo)}}>

      {selectedAddress?._id == addressInfo?._id  ? <Check size={24}  
      className='bg-green-500 border text-white border-green-500 shadow-lg  rounded-full p-1 absolute top-1 right-1'/> :
       <Button size='icon' variant="outline" className='w-5 h-5 border border-black/30 shadow-sm  rounded-full absolute  top-1 right-1'></Button> }
      <label ><span className='font-semibold' > Address: </span> {addressInfo.address.length < 25 ? (addressInfo?.address) : ((addressInfo?.address).slice(0, 22) + "...")}</label>
      <label > <span className='font-semibold'>City:</span>  {addressInfo?.city}</label>
      <label > <span className='font-semibold'>State:</span>  {addressInfo?.state}</label>
      <label > <span className='font-semibold'>Country:</span>  {addressInfo?.country}</label>
      <label > <span className='font-semibold'>Pincode:</span>  {addressInfo?.pincode}</label>
      <label > <span className='font-semibold'>Phone:  </span>{addressInfo?.phone}</label>
      <label > <span className='font-semibold'> Notes:  </span>{addressInfo?.notes}</label>

      <div className='flex justify-end  gap-2'>

                <Button variant="outline" size="sm" onClick={() => handleAddressDelete(addressInfo)}>  <Trash2  size={32} className=''/></Button>
        <Button variant="outline" className='' size="sm" onClick={() => handleAddressEdit(addressInfo)}> <Edit2Icon size={32} className=''/></Button>

      </div>
    </div>


  )
}

export default AddressCard
