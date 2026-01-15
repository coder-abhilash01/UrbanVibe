
import { Star } from 'lucide-react'
import React, { useState } from 'react'
import { DialogContent, DialogTitle } from '../ui/dialog'

import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { addProductReview, getAllProductReview } from '@/store/shop/reviews.slice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'


export const ratinglables = ["Very Poor", "Poor", "Average", "Good", "Excellent"]





const ProductReviewDialog = ({ setDialogOpen }) => {
    const [comment, setComment] = useState("")
    const [hoverIndex, setHoverIndex] = useState(-1)
    const [rating, setRating] = useState()
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { id } = useParams()
    const activeIndex = hoverIndex >= 0 ? hoverIndex : rating - 1
    const displayLable = hoverIndex >= 0 ? ratinglables[hoverIndex] : rating ? ratinglables[rating - 1] : ""

    const handleSubmitReview = async () => {

        try {
            if (!id) return
            if (!user) {
                toast.info("login to review this product")
                navigate("/auth/login", {
                    state: {
                        from: location.pathname + location.search
                    }
                })
                return
            }

            const res = await dispatch(addProductReview({ productId: id, rating, comment })).unwrap()

            if (res?.success) {
                dispatch(getAllProductReview({ productId: id }))

                toast.success(res?.message)
                setComment("")
                setRating(null)
                setDialogOpen(false)
            }

        } catch (err) {
            console.log(err)
            toast.error(err?.message)
            setComment("")
            setRating(null)
        }

    }
    return (
        <DialogContent className="flex flex-col gap-5 px-6 ">
            <DialogTitle className='text-2xl text-center font-bold'>Rate your experience!</DialogTitle>
            <div className='flex flex-col  relative items-center'>


                <div className='flex gap-3  mb-10'>    {ratinglables.map((lable, i) =>
                    <Star size={40}
                        key={i}
                        onMouseEnter={() => {
                            setHoverIndex(i)
                        }}
                        onMouseLeave={() => {
                            setHoverIndex(-1)
                        }}
                        onClick={() => {
                            setRating(i + 1)
                        }}


                        className={`${activeIndex >= i ? "fill-yellow-400 text-yellow-400" : ""} cursor-pointer `}
                    />


                )}</div>

                <span className='absolute -bottom-1 text-center text-xl font-semibold '>{displayLable} </span>
            </div>

            <p className='opacity-80 font-semibold px-6 py-3 bg-gray-100 rounded-lg '>Your feedback helps us improve. Tell us what you think about your recent purchase!</p>

            <Textarea placeholder="Write your review here ..."
                className="shadow-inner shadow-black/50 border-blue-400"
                value={comment}
                onChange={(e) => { setComment(e.target.value) }} />
            <Button onClick={handleSubmitReview} disabled={!rating}>Submit</Button>

        </DialogContent>
    )
}

export default ProductReviewDialog
