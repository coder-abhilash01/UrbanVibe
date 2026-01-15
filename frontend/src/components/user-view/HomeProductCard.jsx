import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeProductCard = ({product}) => {

  const navigate = useNavigate()
  return (
<div  className=' flex flex-col gap-2 ]' 
     onClick={()=> {
         
        navigate(`/shop/listing/product/${product?._id}`)
      
      }} > 
   <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
  <img
    src={product.image}
    alt={product.title}
    loading='lazy'
    className="absolute inset-0 w-full h-full object-cover object-center"
    draggable="false"
  />
</div>


        <h3 className='text-lg font-semibold'>{product.title.length >18 ? (product.title.slice(0,16) + "..."): (product.title)}</h3>
        <p className='text-sm '>{product.description.length >30 ? (product.description.slice(0,35) + "..."):(product.description)}</p>
        <div className='flex justify-between'> 
          <span className={`font-semibold text-sm ${product.price && "line-through"}`}>Rs {product.price}</span>
           <span className='font-semibold text-sm'>Rs {product.salePrice}</span>
        </div>
       
      </div>
    
  )
}

export default HomeProductCard
