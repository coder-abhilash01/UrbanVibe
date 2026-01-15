import axiosInstance from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoading : false,
orders : [],
}


export const getAllUserOrdersForAdmin = createAsyncThunk("admin/orders/getAllUserOrdersForAdmin", async()=>{
   const res = await  axiosInstance.get("/api/admin/orders/get")
     return res.data

} )

export const updateOrderStatus = createAsyncThunk("admin/orders/updateOrderStatus", async({id,orderStatus})=>{
    console.log(id, orderStatus)
   const res = await  axiosInstance.put(`/api/admin/orders/update/${id}`, {orderStatus})
     return res.data

} )

const adminOrderSlice = createSlice({
    name : "adminorders",
    initialState,
    reducers : {},
    extraReducers : (builders)=>{
        builders.addCase(getAllUserOrdersForAdmin.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(getAllUserOrdersForAdmin.fulfilled , (state,action)=>{
            state.isLoading = false;
            state.orders = action.payload.data
        })
        .addCase(getAllUserOrdersForAdmin.rejected , (state,action)=>{
            state.isLoading = false;
             
        })

        .addCase(updateOrderStatus.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(updateOrderStatus.fulfilled , (state,action)=>{
            state.isLoading = false;
            
        })
        .addCase(updateOrderStatus.rejected , (state,action)=>{
            state.isLoading = false;
        })

    }
})

export default adminOrderSlice.reducer