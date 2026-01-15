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



if(isLoading){return <Skeleton className="h-[600px] w-[600px] rounded" />}
  return (
    <div className=''>
      <ScrollToTop/>
      <MainRoutes/>
    </div>
  )
}

export default App
