import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../components/ui/button"
import { Separator } from "../../components/ui/separator"
import {
    Minus,
    Plus,
    ShoppingCart,
    StarIcon,
    Zap,
    ShieldCheck,
    Truck,
    RotateCcw,
    BadgeCheck,
} from "lucide-react"
import { toast } from "sonner"
import { addToCart, fetchCartItems } from "@/store/shop/cart.Slice"
import { fetchProductDetails, fetchRelatedProducts } from "@/store/shop/Products.slice"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import HomeProductsPreviewSection from "@/components/user-view/HomeProductsPreviewSection"
import ProductReviews from "@/components/user-view/ProductReviews"

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1)

    const { productDetails, relatedProducts } = useSelector(
        state => state.shoppingProducts
    )
    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id))
            dispatch(fetchRelatedProducts(id))
        }
    }, [dispatch, id])

    const handleAddToCart = async() => {
        try {
            if (productDetails?.totalStock === 0) return
        
            const res = await dispatch(
                addToCart({
                    userId: user?.id,
                    productId: productDetails._id,
                    quantity,
                })
            ).unwrap()
            if (res?.success) {
                dispatch(fetchCartItems(user.id))
                toast.success("Added to cart")
            }
        } catch (err) { toast.error(err?.response?.data?.message) }
    }

    const handleBuyNow = async () => {
        if (productDetails?.totalStock === 0) return
      
        await dispatch(
            addToCart({
                userId: user?.id,
                productId: productDetails._id,
                quantity,
            })
        )
        navigate("/shop/checkout")
    }

    return (
        <div className="sm:bg-[#f9fafb] pb-6">
            <div className="max-w-8xl mx-auto px-4  xl:px-16  pt-20 pb-10">
                <div className="grid sm:grid-cols-2 gap-8 xl:gap-20 bg-white rounded-2xl sm:py-8 md:px-5 shadow-sm ">

                    {/* IMAGE SECTION */}
                    <div className=" w-full   flex flex-col items-center gap-6">
                        <div className=" lg:h-[620px] bg-gray-50 rounded-xl flex justify-center ">
                            <img
                                src={productDetails?.image}
                                className="object-cover w-full hover:scale-105 transition duration-300 rounded-lg"
                            />
                        </div>

                        <div className="w-full flex gap-4">
                            <Button
                                className="flex-1 h-12 text-base"
                                disabled={productDetails?.totalStock === 0}
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart />
                                {productDetails?.totalStock === 0
                                    ? "Out of stock"
                                    : "Add to cart"}
                            </Button>

                            <Button
                                variant="outline"
                                className="flex-1 h-12 text-base"
                                disabled={productDetails?.totalStock === 0}
                                onClick={handleBuyNow}
                            >
                                <Zap /> Buy Now
                            </Button>
                        </div>
                    </div>

                    {/* DETAILS SECTION */}
                    <div className="flex flex-col gap-5 ">

                        <h1 className="text-3xl font-semibold">
                            {productDetails?.title}
                        </h1>

                        <p className="text-gray-600 leading-relaxed">
                            {productDetails?.description}
                        </p>

                        {/* PRICE */}
                        <div className="flex items-end gap-4">
                            <span className="text-3xl font-bold">
                                ₹{productDetails?.salePrice}
                            </span>
                            <span className="line-through text-gray-400">
                                ₹{productDetails?.price}
                            </span>
                            <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-semibold">
                                {(
                                    100 -
                                    (productDetails?.salePrice / productDetails?.price) * 100
                                ).toFixed()}
                                % OFF
                            </span>
                        </div>

                        {/* RATING */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                                {productDetails?.averageRating}
                                <StarIcon size={14} className="fill-white" />
                            </div>
                            <span className="text-sm text-gray-500">
                                {productDetails?.reviewCount} verified ratings
                            </span>
                        </div>

                        {/* TRUST BADGES */}
                        <div className="grid grid-cols-3 gap-4 mt-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Truck size={16} /> Free Delivery
                            </div>
                            <div className="flex items-center gap-2">
                                <RotateCcw size={16} /> 7 Days Return
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={16} /> Secure Payment
                            </div>
                        </div>

                        <Separator />

                        {/* PRODUCT HIGHLIGHTS */}
                        <div>
                            <h3 className="font-semibold mb-2">Product Highlights</h3>
                            <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                                <li>Premium quality material</li>
                                <li>Comfortable for daily wear</li>

                                <li>Perfect for casual and semi-formal use</li>
                            </ul>
                        </div>

                        {/* STOCK + CATEGORY */}
                        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                            <span>
                                <strong>Stock:</strong>{" "}
                                {productDetails?.totalStock > 0
                                    ? `${productDetails?.totalStock} available`
                                    : "Out of stock"}
                            </span>
                            <span>
                                <strong>Category:</strong> {productDetails?.category}
                            </span>
                        </div>

                        {/* QUANTITY */}
                        <div className="flex items-center gap-4 mt-2">
                            <span className="font-semibold">Quantity</span>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    disabled={quantity === 1}
                                    onClick={() => setQuantity(q => q - 1)}
                                >
                                    <Minus />
                                </Button>

                                <span className="w-6 text-center font-semibold">
                                    {quantity}
                                </span>

                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => {
                                        if (quantity < productDetails?.totalStock)
                                            setQuantity(q => q + 1)
                                        else toast.error("No more stock available")
                                    }}
                                >
                                    <Plus />
                                </Button>
                            </div>
                        </div>

                        <Separator />

                        {/* REVIEWS */}
                        <div className=" bg-gray-50 rounded-xl lg:p-5">
                            <ProductReviews />
                        </div>
                    </div>
                </div>
            </div>

            {/* RELATED PRODUCTS */}
            <HomeProductsPreviewSection
                title="Related Products"
                products={relatedProducts}
                isLoading={false}
            />
        </div>
    )
}

export default ProductDetails
