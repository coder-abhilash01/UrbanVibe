import React, { useState } from 'react'

import { Input } from "@/components/ui/input"

import { Label } from '@radix-ui/react-label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, editProduct, getAllProducts } from '@/store/adminProductSlice'
import { toast } from 'sonner'



const AdminProductForm = ({setOpenDialog, productData, setProductData, currentEditedId, initialProductData}) => {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const { productList } = useSelector(state => state.adminProducts)
  const isEditMode = currentEditedId !== null



  const availableTags = [
  "trending",
  "latest",
  "bestseller",
  "newarrival",
  "featured",
  "popular",
];


  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
    e.target.value = "";

  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0];
    setImage(file)
  }
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleInputChange = (e) => {
    setProductData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    })
    )
  }

  const handleCategoryChange = (value) => {
    setProductData(
      prev => ({ ...prev, category: value })
    )
  }

  const handleTagChange = (e)=>{
const isChecked = e.target.checked
const tag = e.target.value
if(isChecked){setProductData(prev=> ({...prev, tags: [...prev.tags, tag]}))}else{
  setProductData(prev=> ({...prev, tags: prev?.tags?.filter(item=> item !== tag )}))
}
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("image", image)
      formData.append("title", productData.title)
      formData.append("category", productData.category)
      formData.append("description", productData.description)
      formData.append("price", productData.price)
      formData.append("salePrice", productData.salePrice)
      formData.append("totalStock", productData.totalStock)
      formData.append("tags", JSON.stringify(productData.tags))

      if(currentEditedId){dispatch(editProduct({ id: currentEditedId, formData:{
            title: productData.title,
            description: productData.description,
            category: productData.category,
            price: productData.price,
            salePrice: productData.salePrice,
             totalStock: productData.totalStock,
             tags : productData.tags
          } })).then(data => {
        if (data?.payload?.success) {

          dispatch(getAllProducts())
          setImage(null)
          setProductData(initialProductData)
          setOpenDialog(false)
          toast.success(data.payload.message)

        }
      })

      }
      else {dispatch(addNewProduct(formData)).then(data => {
        if (data.payload.success) {

          dispatch(getAllProducts())
          setImage(null)
          setProductData(initialProductData)
          setOpenDialog(false)
          toast.success(data.payload.message)

        }
      })

    }} catch (err) {
      console.log(err)
      toast.error(err.payload.message)

    } finally { setLoading(false) }


  }

  const isFormValid = Object.values(productData).every(value => String(value).trim() !== "");


  return (
    <div >

          <form className='w-full gap-3 flex flex-col' onSubmit={handleSubmit}>
            <div onDrop={handleDrop} onDragOver={handleDragOver}>
              <Label className=' font-semibold'>Upload Image</Label>
              <Input type="file" className=" hidden" id="upload-image" disabled={isEditMode} onChange={handleChange} />
              {image ? <div className='mt-2 text-lg border rounded p-2 w-fit flex gap-1 justify-center '>
                <i className="ri-folder-image-line" ></i>
                <span>{image.name}</span>
                <i className="ri-close-line cursor-pointer" onClick={() => setImage(null)}></i></div> : <Label htmlFor='upload-image' className={`${currentEditedId && "opacity-50 cursor-not-allowed disabled:true"} flex flex-col items-center border-2 border-dashed border-violet-300 p-1 md:p-4 md:text-lg mt-2 cursor-pointer rounded-lg`}>
                <i className="ri-upload-cloud-fill text-3xl md:text-4xl"></i>
                <span>Drag and drop or click to Upload image</span>
              </Label>}
            </div>

            <div className=''>
              <Label className='font-semibold'>Title</Label>
              <Input type="text" name="title" value={productData.title} placeholder="Product title..." onChange={handleInputChange} />
            </div>

            <div>
              <Label className=' font-semibold'>Description</Label>
              <Textarea type="text" name="description" value={productData.description} placeholder="Product Description..." onChange={handleInputChange} />
            </div>

            <div>
              <label className=' font-semibold'>Category</label>
              <Select onValueChange={handleCategoryChange} value={productData.category}>

                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="ladies">Ladies</SelectItem>
                  <SelectItem value="kids">Kids</SelectItem>
                </SelectContent>
              </Select></div>

            <div>
              <Label className='font-semibold'>Price</Label>
              <Input type="number" name="price" placeholder=" Enter product Price" value={productData.price} onChange={handleInputChange} />
            </div>

            <div>
              <Label className=' font-semibold'>Sale price</Label>
              <Input type="number" placeholder="Enter Sale price" name="salePrice" value={productData.salePrice} onChange={handleInputChange} />
            </div>

            <div>
              <Label className=' font-semibold'>Total Stock</Label>
              <Input type="number" placeholder="Enter Sale price" name="totalStock" value={productData.totalStock} onChange={handleInputChange} />
            </div>

            <div>
  <Label className="font-semibold">Tags</Label>
  <div className="flex flex-wrap gap-3 mt-2">
    {availableTags.map(tag => (
      <label key={tag} className="flex items-center gap-2">
        <input
          type="checkbox"
      value={tag}
          onChange={handleTagChange}
        />
        <span className="capitalize">{tag}</span>
      </label>
    ))}
  </div>
</div>



            <button disabled={!isFormValid}
             className={`${isFormValid ? "bg-black" : "bg-black/40 cursor-not-allowed"}  text-white rounded self-end w-full py-2`}
              >{loading ?  (isEditMode? "Saving..." : "Adding Stock..."):(isEditMode? "Save Changes" : "Add Stock")}</button>
          </form>
       
    </div>
  )
}

export default AdminProductForm
