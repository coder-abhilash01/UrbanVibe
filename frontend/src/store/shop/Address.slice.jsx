import axiosInstance from "@/lib/axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading : false,
    addressList : []
}


export const addNewAddress =createAsyncThunk("address/addNewAddress", async(formData)=>{

    const response = await axiosInstance.post("/api/shopping/address/add", formData)
    return response.data
    
})


export const fetchAddress =createAsyncThunk("address/fetchAddress", async({userId})=>{

    const response = await axiosInstance.get(`/api/shopping/address/get/${userId}`)
    return response.data
    
})


export const updateAddress =createAsyncThunk("address/updateAddress",
     async({userId, addressId, formData})=>{
    const response = await axiosInstance.put(`/api/shopping/address/update/${userId}/${addressId}`, formData)
    return response.data
    
})


export const deleteAddress =createAsyncThunk("address/deleteAddress", async({userId, addressId})=>{

    const response = await axiosInstance.delete(`/api/shopping/address/delete/${userId}/${addressId}`)
    return response.data
    
})


const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers : {},
    extraReducers: (builder)=>{
builder
.addCase(addNewAddress.pending, (state)=>{
    state.isLoading = true;
})
.addCase(addNewAddress.fulfilled, (state, action)=>{
    state.isLoading = false;
   
})
.addCase(addNewAddress.rejected, (state, action)=>{
    state.isLoading = false;
   
})



.addCase(fetchAddress.pending, (state)=>{
    state.isLoading = true;
})
.addCase(fetchAddress.fulfilled, (state, action)=>{
    state.isLoading = false;
    state.addressList = action.payload.data

})
.addCase(fetchAddress.rejected, (state, action)=>{
    state.isLoading = false;
    state.addressList = []
})
    }
})


export default addressSlice.reducer;
