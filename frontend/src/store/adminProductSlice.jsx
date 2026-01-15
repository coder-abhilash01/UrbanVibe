import axiosInstance from "@/lib/axios";
import reducer from "./authSlice";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";



const initialState = {
  isLoading : false,
  productList: []
}

export const addNewProduct = createAsyncThunk('/products/addnewproduct',
  async(formData)=>{
    
     const result = await axiosInstance.post("/api/admin/products/create-product", formData, {headers: { "Content-Type": "multipart/form-data"}})
     return result?.data


})

export const getAllProducts = createAsyncThunk('/products/getproduct',
  async()=>{
    
     const result = await axiosInstance.get("/api/admin/products/get")
     console.log(result)
     return result?.data


})


export const editProduct = createAsyncThunk('/products/editproduct',
  async({id,formData})=>{
    
     const result = await axiosInstance.put(`/api/admin/products/edit/${id}`, formData)
     return result?.data


})

export const deleteProduct = createAsyncThunk('/products/deleteproduct',
  async(id)=>{
    
     const result = await axiosInstance.delete(`/api/admin/products/delete/${id}`)
     return result?.data


})



const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers : {},
  extraReducers : (builder)=>{
    builder
    .addCase(getAllProducts.pending, (state)=>{
      state.isLoading = true
    })

    .addCase(getAllProducts.fulfilled, (state, action)=>{
      console.log(action.payload)
      state.isLoading = false;
      state.productList = action.payload.data
    })
    .addCase(getAllProducts.rejected, (state,action)=>{
        console.log("❌ API failed:", action.error)

      state.isLoading = false;
       state.productList = []
    })
  }
  
})


export default adminProductsSlice.reducer