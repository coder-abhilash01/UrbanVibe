import { addNewAddress, fetchAddress, updateAddress } from '@/store/shop/Address.slice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { initialAddress } from './Address';
import { Button } from '../ui/button';

const AddressFormLables = [{
  label: "Address",
  type: "text",
  name: "address",
  placeholder: "Enter your address",
  componentType: "input"
},
{
  label: "City",
  type: "text",
  name: "city",
  placeholder: "Enter your city",
  componentType: "input"
},
{
  label: "State",
  type: "text",
  name: "state",
  placeholder: "Enter your state",
  componentType: "input"
},
{
  label: "Country",
  type: "text",
  name: "country",
  placeholder: "Enter your country",
  componentType: "input"
},
{
  label: "Pincode",
  type: "text",
  name: "pincode",
  placeholder: "Enter your pincode",
  componentType: "input"
},
{
  label: "Phone",
  type: "text",
  name: "phone",
  placeholder: "Enter your phone number",
  componentType: "input"
},
{
  label: "Notes",
  type: "text",
  name: "notes",
  placeholder: "Enter any additional notes",
  componentType: "textarea"
}]

const requiredFields = ["address", "city", "state", "country", "pincode", "phone"];

const AddressForm = ({ addressFormData, setAddressFormData, setEditedAddressId,editedAddressId }) => {

    const { isLoading } = useSelector(state => state.shoppingAddress)
    const { user } = useSelector(state => state.auth)
    const { addressList} = useSelector(state => state.shoppingAddress)
    const dispatch = useDispatch()



    const handleFormChange = (e) => {
        setAddressFormData(
            {
                ...addressFormData,
                [e.target.name]: e.target.value
            }
        )
    }


    const handleAddressFormSubmit = (e) => {
        e.preventDefault();

        if (addressList.length == 3 && editedAddressId == null) {
            toast.error("You can add maximum 3 addresses only.")
            return;
        }

        if (editedAddressId) {
            dispatch(updateAddress({ userId: user?.id, addressId: editedAddressId, formData: addressFormData }))
                .then((data) => {
                    if (data.payload?.success) {
                        dispatch(fetchAddress({ userId: user?.id }))
                        toast.success(data.payload?.message)
                        setAddressFormData(initialAddress)
                        setEditedAddressId(null)
                    }
                })
        } else {
            dispatch(addNewAddress({ ...addressFormData, userId: user?.id }))
                .then((data) => {
                    if (data.payload?.success) {
                        dispatch(fetchAddress({ userId: user?.id }))
                        toast.success(data.payload?.message)
                        setAddressFormData(initialAddress)
                        setEditedAddressId(null)
                    }
                })
        }



    }

    const isFormValid = () => {
        return requiredFields.every(value => addressFormData[value].trim() != "")
    }
    return (

        <form className='px-6 md:px-12 py-4 w-full sm:w-2/3 lg:w-2/5 border rounded-lg shadow shadow-black/30 bg-gray-100 border-black/20 mt-10 mx-auto pb-8' onSubmit={handleAddressFormSubmit}>
            <h1 className='text-2xl font-semibold mb-4 text-blue-500'>{editedAddressId ? "Edit Your Address" : "Add New Address"}</h1>

            {AddressFormLables.map((field, index) => (
                <div className="mb-1" key={index}>
                    <label className="block text-gray-700 text-sm font-bold mb-1"
                        htmlFor={field.name}>
                        {field.label} </label>
                    {field.componentType === "input" ?
                        (<input type={field.type}
                            placeholder={field.placeholder}
                            name={field.name}
                            value={addressFormData[field.name]}
                            className='w-full p-2 rounded-sm border border-black/20 shadow-inner shadow-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onChange={handleFormChange} />) :
                        (<textarea placeholder={field.placeholder}
                            name={field.name}
                            rows="2"
                            value={addressFormData[field.name]}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner shadow-black/20" onChange={handleFormChange} >
                        </textarea>)}
                </div>
            ))}
            <Button className="w-full" disabled={!isFormValid()}>{isLoading ? (editedAddressId ? "Saving Changes..." : "Adding your address...") : (editedAddressId ? "Save Changes" : "Add")}</Button>
        </form>
    )
}

export default AddressForm
