import axiosInstance from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState={
    reviews : [],
    isLoading : false,
}


 export const addProductReview = createAsyncThunk("reviews/addProductReview", async ({productId,rating,comment}, {rejectWithValue})=>{

try{ const res = await axiosInstance.post("/api/shopping/review/add",{
    productId,
    rating,
    comment
 } )

 return res?.data}catch(err){return rejectWithValue(err?.response?.data)}
})




 export const getAllProductReview = createAsyncThunk("reviews/getAllProductReview", async ({productId}, {rejectWithValue})=>{

try{ const res = await axiosInstance.get(`/api/shopping/review/get/${productId}` )

 return res?.data}catch(err){
    console.log(err)
    return rejectWithValue(err?.response?.data)}
})

export const deleteProductReview = createAsyncThunk("reviews/deleteProductReview", async({reviewId})=>{
    
    try{
        const res = await axiosInstance.delete(`/api/shopping/review/delete/${reviewId}`)
    
        return res?.data

    }catch(err){
        console.log(err)
        return rejectWithValue(err.response.data)
    }
})

const reviewSlice =  createSlice({
    name : "reviews",
    initialState,
    reducers: {},
    extraReducers: (builders)=>{
builders
.addCase(addProductReview.pending, (state)=>{
    state.isLoading = true
})
.addCase(addProductReview.fulfilled, (state, action)=>{
    state.isLoading = false
})
.addCase(addProductReview.rejected, (state)=>{
    state.isLoading = false})
   


    .addCase(getAllProductReview.pending, (state)=>{
    state.isLoading = true
})
.addCase(getAllProductReview.fulfilled, (state, action)=>{
    state.isLoading = false
    state.reviews = action.payload.data

})
.addCase(getAllProductReview.rejected, (state)=>{
    state.isLoading = false
    state.reviews = []
    
})
}
})


export default reviewSlice.reducer