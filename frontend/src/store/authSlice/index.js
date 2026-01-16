import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    username:null
}

export const registerUserAction = createAsyncThunk("auth/register",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,
                formData, { withCredentials: true })

            return response.data
        } catch (err) {
            return rejectWithValue(err?.response?.data)
        }
    }
)

export const loginUserAction = createAsyncThunk("auth/login",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,
                formData, { withCredentials: true })

            return response.data
        } catch (err) {
            return rejectWithValue(err?.response?.data)
        }
    }
)

export const logoutUserAction = createAsyncThunk("auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`,{}, { withCredentials: true })

            return response.data
        } catch (err) {
            return rejectWithValue(err?.response?.data)
        }
    }
)

export const checkAuth = createAsyncThunk("auth/checkAuth",
    async (_,{rejectWithValue}) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
                {
                    withCredentials: true,
                    headers: {
                        'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    }
                })
            return response.data
        } catch (err) {
            return rejectWithValue(err.response?.data)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => { }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUserAction.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(registerUserAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isAuthenticated = false;
            })
            .addCase(registerUserAction.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            .addCase(loginUserAction.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(loginUserAction.fulfilled, (state, action) => {
                 
                state.isLoading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.username = action.payload.user.username
               
            })
            .addCase(loginUserAction.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.username = null
            })

            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                
                state.isLoading = false;
                state.user = action.payload.user;
                state.isAuthenticated = action.payload.success;
                state.username = action.payload.user.username
            
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUserAction.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
    }

})

export const { setUser } = authSlice.actions;
export default authSlice.reducer