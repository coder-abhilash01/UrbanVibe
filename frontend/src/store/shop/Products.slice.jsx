
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";



const initialState = {
    productList: [],
    relatedProducts: [],
    productDetails: null,
    isLoading: false,
      pagination: {
    currentPage: 1,
    limit: 12,
    totalPages: 1,
    totalProducts: 0,
  }


}



export const getAllfilterdProducts = createAsyncThunk("shop/products/getFilteredProducts",
    async ({ category = [], sortOption = "" , keyword ,page}) => {

        try {
            const query = new URLSearchParams()
            if (category.length) { category?.forEach(cat => query.append("category", cat)) }
            if (sortOption) query.append("sortBy", sortOption);
            if(keyword) query.append("keyword", keyword);
            query.append("page",page)
        
            const result = await axiosInstance.get(`/api/shopping/products/get-products?${query.toString()}`)
        
            return result?.data

        }
        catch (err) {

            console.error("❌ Fetch failed:", err);
            throw err
        }
    }

)



export const fetchProductDetails = createAsyncThunk("shop/products/getProductDetails",
    async (id) => {

        try {
            
            const result = await axiosInstance.get(`/api/shopping/products/product-details/${id}`)

            return result?.data
        }
        catch (err) {
            console.log(err)
            throw err
        }
    })




    export const fetchRelatedProducts = createAsyncThunk("shop/products/fetchRelatedProducts",
    async (id) => {

        try {
            
            const result = await axiosInstance.get(`/api/shopping/products/related-products/${id}`)

            return result?.data
        }
        catch (err) {
            console.log(err)
            throw err
        }
    })


const shoppingProductsSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllfilterdProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllfilterdProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
                state.pagination = {
                    currentPage: action.payload.pagination.page,
                    limit : action.payload.pagination.limit,
                    totalPages: action.payload.pagination.totalPages,
                    totalProducts: action.payload.pagination.totalProductCount
                   
                }
                
            })
            .addCase(getAllfilterdProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.productList = []
            })
            .addCase(fetchProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                
                state.isLoading = false;
                state.productDetails = action.payload.data
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.productDetails = null
            })



             .addCase(fetchRelatedProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
                
                state.isLoading = false;
                state.relatedProducts = action.payload.data
            })
            .addCase(fetchRelatedProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.relatedProducts = []
            })
    }
})


export default shoppingProductsSlice.reducer;