import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProducts } from '@/store/adminProductSlice'
import AdminProductForm from '@/components/admin-view/AdminProductForm'



const AdminProducts = () => {
  const [openDialog, setOpenDialog] = useState(false)
const [currentEditedId, setCurrentEditedId] = useState(null)
const [currentDeletedId, setCurrentDeletedId] = useState(null)

const initialProductData = {
    title: "",
    description: "",
    category: "",
    price: "",
    salePrice: "0",
    totalStock : "",
    tags: []

  }           
  const [productData, setProductData] = useState(initialProductData)
  const dispatch = useDispatch()

  const { productList } = useSelector(state => state.adminProducts)

  useEffect(() => {
    dispatch(getAllProducts())

  }, [dispatch])

  return (
    <div className='text-white'>
      <Dialog className="w-full " open={openDialog} onOpenChange={(isOpen)=>{ setOpenDialog(isOpen)
       if(!isOpen){ 

        setCurrentEditedId(null)
        setProductData(initialProductData)
      }}}>
        <DialogTrigger className='bg-black px-3 py-2 rounded-lg'>Add Product</DialogTrigger>
        <DialogContent className=" max-h-full sm:max-h-[700px] overflow-auto">
          <DialogDescription></DialogDescription>
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl">{currentEditedId ? "Edit Product": "Add new Product"}</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>

          <AdminProductForm setOpenDialog={setOpenDialog} productData={productData} setProductData={setProductData} currentEditedId={currentEditedId} currentDeletedId={currentDeletedId} initialProductData={initialProductData}/>
        </DialogContent>
      </Dialog>

      <div className='w-full flex flex-wrap gap-5 mt-4'>
        {productList && productList.map((product, index) => (<div key={index} className='text-black w-60 '>
          <div className='w-full'><img src={product.image} /></div>
          <div className='w-full flex flex-col gap-3'>
            <h2>{product.title}</h2>
            <div className='flex justify-between'>
              <span className={product.price >0 ? "line-through" : ""}>₹ {product.price}</span>
              <span>₹ {product.salePrice}</span>
            </div>
            <div className=' w-full flex justify-between'>
              <button className='bg-gray-400 py-1 px-4 rounded' onClick={
               
                ()=>{ setOpenDialog(true)
                setCurrentEditedId(product._id)
                setProductData(product)
                }}>Edit </button>
              <button className='bg-red-500 py-1 px-4 rounded text-white' onClick={
                ()=>{dispatch(deleteProduct(product._id))
                  dispatch(getAllProducts())

              }}>Delete </button></div>

          </div>
        </div>))}
      </div>
    </div>
  )
}

export default AdminProducts
