import { Button } from '@/components/ui/button'
import HomeProductCard from '@/components/user-view/HomeProductCard'
import HomeProductsPreviewSection from '@/components/user-view/HomeProductsPreviewSection'
import { fetchHomeProducts } from '@/store/shop/HomeProductsSlice'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const bannerSlides = ["/shopBanners/banner1.jpg", "/shopBanners/banner6.png", "/shopBanners/banner4.png","/shopBanners/banner3.jpg", "/shopBanners/banner5.png"]

const categoryProducts = [{
  img: "/category/men.jpg",
  label: "Men's Wear",
  category: "men"
},
{
  img: "/category/girl.webp",
  label: "Women's Wear",
  category: "ladies"
},
{
  img: "/category/kid.avif",
  label: "Kids's Wear",
  category: "kids"
},
{
  img: "/category/watchWomen.avif",
  label: "Watches",
  category: "men"

}
]

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { trending, featured, newArrivals, isLoading } = useSelector(state => state.homeProducts)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!trending.length) dispatch(fetchHomeProducts("trending"))
    if (!newArrivals.length) dispatch(fetchHomeProducts("newarrival"))
    if (!featured.length) dispatch(fetchHomeProducts("featured"))
  }, [dispatch])

  return (
    <div className='w-full  min-h-screen flex-col mt-20 '>
      <div className='w-full  h-[200px] sm:h-[350px] md:h-[50vh] lg:h-[70vh] relative '>
        {bannerSlides.map((slide, i) =>
        (<img src={slide}
          className={`${i === currentSlide ? "opacity-100" : "opacity-0"} transition-opacity duration-700 ease-in-out absolute w-full h-full top-0 left-0 object-cover`}
          key={i} />))}
        <Button variant="outline"
          size='icon'
          onClick={() => { setCurrentSlide(prevSlide => (prevSlide - 1 + bannerSlides.length) % bannerSlides.length) }}
          className=" absolute top-1/2 left-4 transform -translate-y-1/2">
          <ChevronLeftIcon className='w-4 h-4' /></Button>

        <Button variant="outline"
          size='icon'
          onClick={() => { setCurrentSlide(prevSlide => (prevSlide + 1) % bannerSlides.length) }}
          className=" absolute top-1/2 right-4 transform -translate-y-1/2">
          <ChevronRightIcon className='w-4 h-4' />
        </Button>

      </div>
      <div className='flex gap-4  justify-center mt-2'> {bannerSlides.map((slide, i) =>
      (<span key={i} className={`w-3 h-3 rounded-full cursor-pointer transition
  ${currentSlide === i ? "bg-blue-500 scale-110" : "bg-gray-300"}
`}
        onClick={() => { setCurrentSlide(i) }}
      ></span>))}</div>


      <div className='w-full p-4 flex flex-col gap-6 mt-6 '>
        <h1 className='sm:text-4xl text-2xl font-bold text-center'>Shop By Category</h1>
        <div className='w-full flex mt-1 gap-3 lg:gap-6 2xl:justify-center overflow-auto no-scrollbar'>
          {categoryProducts.map((cat, i) => (
            <div className='w-full flex flex-col gap-2 p-2 rounded-lg mb-4   hover:shadow-black/20 hover:shadow-lg'
              key={i}
              onClick={() => { navigate(`/shop/listing?category=${cat.category}`) }}>
              <div className='w-full min-w-44 aspect-[4/4] rounded-lg overflow-hidden '><img src={cat?.img} className='  w-full h-full object-cover object-top ' /></div>
              <span className='md:text-xl line-clamp-1'>{cat.label}</span>
              <Button className='w-full rounded-sm'>Explore</Button>
            </div>))}</div>
      </div>

      <div className='w-full  sm:mt-8 px-6  rounded-xl'> <img src="/saleBanner/saleBanner8.png" className='w-full h-full  object-cover  rounded-xl ' /></div>


      <HomeProductsPreviewSection title="Trending Products" products={trending} isLoading={isLoading} />
      <HomeProductsPreviewSection title="Featured Products" products={featured} isLoading={isLoading} />
      <HomeProductsPreviewSection title="New Arrivals" products={newArrivals} isLoading={isLoading} />

    </div>
  )
}

export default Home
