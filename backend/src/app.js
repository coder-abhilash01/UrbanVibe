const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const adminProductRoutes = require("./routes/product.routes")
const adminOrderRoutes = require("./routes/admin.order.routes")
const shoppingProductRoutes = require("./routes/shopping/products.routes")
const shoppingCartRoutes = require("./routes/shopping/cart.routes")
const shoppingAddressRoutes = require("./routes/shopping/address.routes")
const cors = require("cors");
const paymentRoutes = require("./routes/shopping/order.routes");
const homeProductRoutes = require("./routes/shopping/home.products.routes");
const shoppingReviewRoutes = require("./routes/shopping/review.products.routes");

const app = express();

// middlewares
app.use(cors({
    origin: ["http://localhost:5173", process.env.CLIENT_URL],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoutes)
app.use("/api/admin/products", adminProductRoutes)
app.use("/api/admin/orders", adminOrderRoutes)

app.use("/api/shopping/home",homeProductRoutes)
app.use("/api/shopping/products",shoppingProductRoutes )
app.use("/api/shopping/cart",shoppingCartRoutes )
app.use("/api/shopping/address", shoppingAddressRoutes )
app.use("/api/shopping/payment", paymentRoutes)
app.use("/api/shopping/review", shoppingReviewRoutes )

module.exports = app;