import React, { useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import HomeProductCard from "./HomeProductCard"

const HomeProductsPreviewSection = ({ title, products, isLoading }) => {
  const sliderRef = useRef(null)

  const scroll = (direction) => {
    if (!sliderRef.current) return
    
  const amount = sliderRef.current.clientWidth*0.9
  

    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }




  return (
    <section className="mt-14 px-4  " >
      {/* Header */}
      <div className="flex items-center justify-between px-2 mb-4">
        <h2 className="sm:text-3xl text-2xl font-bold">{title}</h2>

        {products.length >5? <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border hover:bg-black hover:text-white transition"
          >
            <ChevronsLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border hover:bg-black hover:text-white transition"
          >
            <ChevronsRight />
          </button>
        </div> :""}
      </div>

      {/* Slider */}
      {products.length ? 
      <div
        ref={sliderRef}
        className="flex gap-5 overflow-x-auto px-4 scroll-smooth no-scrollbar rounded-lg  "
     
      >
        {isLoading && <p>Loading...</p>}

        {!isLoading 
         && products?.map((product) => (
            <div key={product._id} className="min-w-[250px]">
              <HomeProductCard product={product} />
            </div>
          ))
          
          }
      </div> : <p className="text-center font-semibold">No related product found!</p>}
    </section>
  )
}

export default HomeProductsPreviewSection
