import { Routes, Route, Navigate } from "react-router-dom"
import Admin from "../pages/admin-view/Dashboard"
import AuthLayout from "@/components/auth/authLayout"
import Login from "@/pages/auth/Login"
import Register from "@/pages/auth/Register"
import AdminLayout from "@/components/admin-view/Layout"
import AdminDashboard from "../pages/admin-view/Dashboard"
import AdminOrders from "@/pages/admin-view/Orders"
import AdminProducts from "@/pages/admin-view/Products"
import AdminFeatures from "@/pages/admin-view/Features"
import UserLayout from "@/components/user-view/Layout"
import PagenotFound from "@/pages/not-found/PagenotFound"
import Home from "@/pages/user-view/Home"
import Checkout from "@/pages/user-view/Checkout"
import Account from "@/pages/user-view/Account"
import CheckAuth from "@/components/common/CheckAuth"
import UnAuthPage from "@/pages/unauth-page"
import { useSelector } from "react-redux"
import { checkAuth } from "@/store/authSlice"
import Listing from "@/pages/user-view/Listing"
import OrderSuccess from "@/pages/user-view/OrderSuccess"
import PaymentFailed from "@/pages/user-view/PaymentFailed"
import ProductDetails from "@/pages/user-view/ProductDetails"
import ReturnPolicy from "@/pages/user-view/ReturnPolicy"

const MainRoutes = () => {


    const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);


    return (


        <Routes>
            <Route path="/" element={<Navigate to="/shop/home" replace />} />
            <Route path="/shop" element={<Navigate to="/shop/home" replace />} />
            <Route path="/home" element={<Navigate to="/shop/home" replace />} />
            <Route path="/login" element={<Navigate to="/auth/login" replace />} />
            <Route path="/register" element={<Navigate to="/auth/register" replace />} />

            <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}><AuthLayout /></CheckAuth>}>

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>

            <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}><AdminLayout /></CheckAuth>}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="features" element={<AdminFeatures />} />

            </Route>

            <Route path="/shop" element={
               <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}> <UserLayout /> </CheckAuth>}>

                <Route path="home" element={<Home />} />

                <Route
                    path="checkout"
                    element={  <Checkout />}
                />

                <Route
                    path="account"
                    element={  <Account />
                    }
                />

                <Route path="listing" element={<Listing />} />
                <Route path="listing/product/:id" element={<ProductDetails />} />
                <Route path="order/order-success/:orderId" element={<OrderSuccess />} />
                <Route path="order/failed/:orderId" element={<PaymentFailed />} />
                <Route path="policy/return" element={<ReturnPolicy />} />


            </Route>

            <Route path="/unauth-page" element={<UnAuthPage />} />
            <Route path="*" element={<PagenotFound />} />


        </Routes>)
}

export default MainRoutes

