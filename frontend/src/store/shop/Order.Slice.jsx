
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";

const initialState = {
    isLoading: false,
    orderInfo: null,
    orders: [],
    paginationInfo: {
        currentPage: 1,
        totalPages: 1,
        totalOrders: 0
    }

}

export const createNewOrder = createAsyncThunk("/order/createNewOrder", async ({ selectedAddress }) => {
    const res = await axiosInstance.post("/api/shopping/payment/create-order", { selectedAddress })
    return res.data
})

export const getAllUserOrders = createAsyncThunk("/order/getAllUserOrders", async ({page}) => {
    try {

        const res = await axiosInstance.get(`/api/shopping/payment/get?page=${page}&limit=10`)

        return res?.data
    } catch (err) {
        console.log("Error fetching user orders:", err);
    }
})



const ShoppingOrderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewOrder.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(createNewOrder.fulfilled, (state, action) => {

                state.isLoading = false;
                state.orderInfo = {
                    orderId: action.payload.orderId,
                    razorpayOrderId: action.payload.razorpayOrderId,
                    amount: action.payload.amount,
                };

            })
            .addCase(createNewOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.orderInfo = null;
                state.orderId = null;

            })

            .addCase(getAllUserOrders.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getAllUserOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action?.payload?.data;
                state.paginationInfo = {
                    currentPage: action.payload?.paginatedInfo?.currentPage,
                    totalPages: action.payload?.paginatedInfo?.totalPages,
                    totalOrders: action.payload?.paginatedInfo?.totalOrders
                }

            })

            .addCase(getAllUserOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.orders = []



            })
    }
})



export default ShoppingOrderSlice.reducer