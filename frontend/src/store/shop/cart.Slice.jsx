import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logoutUserAction } from "../authSlice";
import axiosInstance from "@/lib/axios";


const initialState = {
    cartItems: {items:[]},
    isLoading: false
}

export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity },{rejectWithValue}) => {
    
   try{const res = await  axiosInstance.post("/api/shopping/cart/add",
        {
       
            productId,
            quantity
        })
       return res.data}catch(err){
              
              return rejectWithValue(err)
       }

})



export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async () => {
     
   const response = await  axiosInstance.get('/api/shopping/cart/get')
       return response.data

})


export const deleteCartItem = createAsyncThunk("cart/deleteCartItem", async ({productId}) => {

   const response = await  axiosInstance.delete(`/api/shopping/cart/${productId}`)
       return response.data

})



export const updateCartQuantity = createAsyncThunk("cart/updateCartQuantity", async ({ productId, quantity }) => {
   const response =  await axiosInstance.put("/api/shopping/cart/update-cart",
        {
            productId,
            quantity
        })
       return response.data

})



const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
       clearCart(state){state.cartItems.items = []}
    },
    extraReducers: (builder) => {
        builder
        .addCase(addToCart.pending, (state)=>{
 state.isLoading = true
        })
        .addCase(addToCart.fulfilled, (state,action)=>{
              console.log("added", action.payload)
 state.isLoading = false;
 state.cartItems.items = action.payload.data.items

        })
    .addCase(addToCart.rejected, (state,action)=>{
 state.isLoading = false;
 state.cartItems = {items : []}

        })



         .addCase(fetchCartItems.pending, (state)=>{
 state.isLoading = true
        })
        .addCase(fetchCartItems.fulfilled, (state,action)=>{
 state.isLoading = false;
 state.cartItems.items = action.payload.data.items
 

        })
    .addCase(fetchCartItems.rejected, (state,action)=>{
 state.isLoading = false;
state.cartItems = {items : []}

        })



         .addCase(updateCartQuantity.pending, (state)=>{
 state.isLoading = true
        })
        .addCase(updateCartQuantity.fulfilled, (state,action)=>{
 state.isLoading = false;
state.cartItems.items = action.payload.data.items

        })
    .addCase(updateCartQuantity.rejected, (state,action)=>{
 state.isLoading = false;
 state.cartItems = {items : []}

        })


         .addCase(deleteCartItem.pending, (state)=>{
 state.isLoading = true
        })
        .addCase(deleteCartItem.fulfilled, (state,action)=>{
 state.isLoading = false;
 state.cartItems.items = action.payload.data.items

        })
    .addCase(deleteCartItem.rejected, (state,action)=>{
 state.isLoading = false;
state.cartItems = {items : []}

        })

            .addCase(logoutUserAction.fulfilled, (state) => {
        state.cartItems = {items : []}
        state.isLoading = false;
      });

    }
})




export const {clearCart} = shoppingCartSlice.actions
export default shoppingCartSlice.reducer