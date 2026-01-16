import React, { useEffect } from 'react'
import MainRoutes from './routes/MainRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/authSlice'
import { Skeleton } from "@/components/ui/skeleton"
import { useLocation } from 'react-router-dom'
import ScrollToTop from './components/common/ScrollToTop'



const App = () => {
  const {isLoading} = useSelector(state=> state.auth)
  const Location = useLocation()
 const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(checkAuth())
},[dispatch])



if (isLoading) {
  return (
    <div className="min-h-screen p-6 space-y-4">
      <Skeleton className="h-12 w-full" />   {/* navbar */}
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  )
}

  return (
    <div className=''>
      <ScrollToTop/>
      <MainRoutes/>
    </div>
  )
}

export default App
