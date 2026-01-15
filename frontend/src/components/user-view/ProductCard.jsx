import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { fetchProductDetails } from '@/store/shop/Products.slice'
import { addToCart, fetchCartItems } from '@/store/shop/cart.Slice'
import { toast } from 'sonner'
import { Badge } from "@/components/ui/badge"
import { useLocation, useNavigate } from 'react-router-dom'

const ProductCard = () => {
  const { productList } = useSelector(state => state.shoppingProducts)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const handleProductDetails = (id) => {
    dispatch(fetchProductDetails(id)).then(data => {
      if (data?.payload?.success) { console.log(data.payload.message) }
    }).catch((err) => { console.log(err) })
  }

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    if (product.totalStock === 0) return
    if (!user) {
      toast.info("login to add product in cart")
      navigate("/auth/login", { state: { from: location.pathname + location.search } })
      return
    }
    dispatch(addToCart({ userId: user.id, productId: product._id, quantity: 1 })).then(res => {

      if (res.payload.success) {
        dispatch(fetchCartItems(user.id))
        toast.success("Product is added to Cart ")
      }
    })
  }

  return (
    <div className=' grid grid-cols-2
  md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 flex-wrap '>
      {productList.map((product) => (<div key={product._id} className='flex flex-col sm:gap-2 bg-white shadow-lg p-2 rounded-lg w-full'
        onClick={() => {

          navigate(`product/${product?._id}`)

        }}>
        <div className='relative w-full aspect-[4/4] overflow-hidden rounded-md'> <img src={product?.image} loading='lazy' className='w-full h-full object-cover' />
          {product.totalStock === 0 ? (
            <Badge className="absolute top-1 left-1 bg-red-600">
              Out of Stock!
            </Badge>
          ) : product.totalStock < 10 ? (
            <Badge className="absolute top-1 left-1 bg-yellow-500">
              Only {product.totalStock} items left!
            </Badge>
          ) : null}


        </div>
        <h3 className='text-lg font-semibold line-clamp-1'>{product.title.length > 18 ? (product.title.slice(0, 16) + "...") : (product.title)}</h3>
        <p className='text-sm line-clamp-1'>{product.description}</p>
        <div className='flex justify-between mt-1'>
          <span className={`font-semibold text-sm ${product.price && "line-through"}`}>Rs {product.price}</span>
          <span className='font-semibold text-sm'>Rs {product.salePrice}</span>
        </div>
        <Button disabled={product?.totalStock === 0} className="w-full mt-2 rounded-full" onClick={(e) => handleAddToCart(e, product)}>{product.totalStock === 0 ? "Out of stock" : "Add to cart"}</Button>
      </div>))}
    </div>
  )
}

export default ProductCard
