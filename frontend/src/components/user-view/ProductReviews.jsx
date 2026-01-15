import { Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useParams } from "react-router-dom";
import {
  deleteProductReview,
  getAllProductReview,
} from "@/store/shop/reviews.slice";
import { useDispatch, useSelector } from "react-redux";
import ProductReviewDialog, { ratinglables } from "./ProductReviewDialog";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

const ProductReviews = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { reviews } = useSelector(state => state.shoppingProductReview)
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    if (id) dispatch(getAllProductReview({ productId: id }))
  }, [dispatch, id])

  const handleDeleteReview = async (reviewId) => {
    const res = await dispatch(deleteProductReview({ reviewId }))
    if (res?.payload?.success) {
      dispatch(getAllProductReview({ productId: id }))
    }
  }

  return (
    <div className="mt-8 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Customer Reviews</h2>
          <p className="text-sm text-gray-500">
            {reviews.length} verified customer feedbacks
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full px-6">
              Write Review
            </Button>
          </DialogTrigger>
          <ProductReviewDialog setDialogOpen={setDialogOpen} />
        </Dialog>
      </div>

      {/* REVIEW LIST */}
      <div className="mt-6 max-h-[320px] overflow-y-auto space-y-4 pr-2">

        {reviews.length ? reviews.map(review => (
          <div
            key={review._id}
            className="group rounded-lg border border-gray-200 p-4 hover:shadow-md transition"
          >
            {/* USER + DATE */}
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarFallback className="font-semibold bg-gray-100">
                    {review.userId.userName[0]}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="capitalize font-medium">
                    {review.userId.userName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* DELETE */}
              {review?.userId?._id === user?.id && (
                <Trash2
                  size={16}
                  onClick={() => handleDeleteReview(review._id)}
                  className="opacity-0 group-hover:opacity-100 cursor-pointer text-gray-400 hover:text-red-600 transition"
                />
              )}
            </div>

            {/* STARS */}
            <div className="flex items-center gap-2 mt-3">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="fill-yellow-400 text-yellow-400"
                  size={18}
                />
              ))}
              <span className="text-sm text-gray-600">
                {review.rating}/5 · {ratinglables[review.rating - 1]}
              </span>
            </div>

            {/* COMMENT */}
            <p className="mt-2 text-gray-700 leading-relaxed">
              {review.comment[0].toUpperCase() + review.comment.slice(1)}
            </p>

            <span className="mt-2 inline-block text-xs font-medium text-green-600">
              ✔ Verified Buyer
            </span>
          </div>
        )) : (
          <p className="text-center text-gray-500 font-medium">
            No reviews yet. Be the first to share your experience!
          </p>
        )}

      </div>
    </div>
  )
}
;

export default ProductReviews;
