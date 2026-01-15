import axiosInstance from "@/lib/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";





const initialState = {
    isLoading: false,
    trending: [],
    newArrivals: [],
    featured: [],

}

export const fetchHomeProducts = createAsyncThunk("homeProducts/fetchHomeProducts",
    async (tag) => {
    
        const res = await axiosInstance.get(`/api/shopping/home/home-products/${tag}`)
    
        return res.data
    })

const homeProducts = createSlice({
    name: "homeProducts",
    initialState,
    reducers: {},
    extraReducers: (builders) => {
        builders.addCase(fetchHomeProducts.pending, (state) => {
            state.isLoading = true
        })
            .addCase(fetchHomeProducts.fulfilled, (state, action) => {
                state.isLoading = false
                const { tag, products } = action.payload
                if (tag === "trending") {
                    state.trending = products
                }

                if (tag === 'newarrival') {
                    state.newArrivals = products
                
                }
                if (tag === "featured") {
                    state.featured = products
                }
            })
            .addCase(fetchHomeProducts.rejected, (state, action) => {
                state.isLoading = false
                state.trending = []
                state.newArrivals = []
                state.featured = []
            })
    }
})

export default homeProducts.reducer