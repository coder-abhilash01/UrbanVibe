import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, isLoading, children }) => {
  const location = useLocation();

  // 1️⃣ Wait until auth check is fully done
  if (isLoading) return null;

  const pathname = location.pathname;

  // Route types
  const isAuthRoute = pathname.startsWith("/auth");
  const isAdminRoute = pathname.startsWith("/admin");
  const isShopRoute = pathname.startsWith("/shop")
  const isUserProtectedRoute = pathname.startsWith("/shop/checkout") || pathname.startsWith("/shop/account");

  /* ======================================================
  ====================================================== */

  if (!isAuthenticated) {
    
    if (isAdminRoute || isUserProtectedRoute) {
      return <Navigate to="/auth/login" replace />;
    }

    // Allow auth pages
    return children;
  }

  /* ======================================================
     3️⃣ AUTHENTICATED USER (role must exist now)
  ====================================================== */

  const role = user?.role;

  // Safety fallback (should never happen if backend is correct)
  if (!role) {
    return <Navigate to="/auth/login" replace />;
  }

  /* ======================================================
     4️⃣ AUTH ROUTES (login/register)
  ====================================================== */

  if (isAuthRoute) {
    return (
      <Navigate
        to={role === "admin" ? "/admin/dashboard" : "/shop/home"}
        replace
      />
    );
  }

  /* ======================================================
  ====================================================== */

  //  User trying admin
  if (role !== "admin" && isAdminRoute) {
    return <Navigate to="/unauth-page" replace />;
  }

  // Admin trying shop
  if (role === "admin" && isShopRoute) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  /* ======================================================
     6️⃣ ALLOW ACCESS
  ====================================================== */

  return children;
};

export default CheckAuth;
