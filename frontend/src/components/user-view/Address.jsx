import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, fetchAddress, updateAddress } from '@/store/shop/Address.slice'
import AddressCard from './AddressCard'
import AddressForm from './AddressForm'
import { toast } from 'sonner'




export const initialAddress = {
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  phone: "",
  notes: ""
}


const Address = () => {

  const [addressFormData, setAddressFormData] = useState(initialAddress)
  const [editedAddressId, setEditedAddressId] = useState(null)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { addressList} = useSelector(state => state.shoppingAddress)
  



  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAddress({ userId: user.id }));
    }
  }, [dispatch, user?.id]);


 

  return (

    <div className=' flex flex-col w-full items-center '>

      <div className=' w-full  p-4 flex flex-col gap-10 mb-10'>
        <h2 className='text-2xl font-semibold'>Address List</h2>
        <div className='gap-4 flex overflow-auto no-scrollbar'>

          {addressList && addressList.length > 0 ? addressList.map((addressInfo) =>
           <AddressCard addressInfo={addressInfo}
           setAddressFormData={setAddressFormData}
           setEditedAddressId={setEditedAddressId}
            key={addressInfo._id} />) :  <div className='flex flex-col w-full items-center'>
              <img src="/shop/addressLocation.png" className='w-24'/>
              <h2 className='text-black font-medium text-xl'> No Addresses found in your account!</h2>
             <p className='text-black/50 font-medium '> Add a delivery address.
</p>  </div> }
        </div>
      </div>
<AddressForm 
addressFormData={addressFormData}
setAddressFormData={setAddressFormData}
 editedAddressId ={editedAddressId}
 setEditedAddressId= {setEditedAddressId}/>
    </div>

  )
}

export default Address
