import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { loginUserAction } from "@/store/authSlice"
import { toast } from "sonner"

const Login = () => {
  const dispatch = useDispatch()
  const {isLoading} = useSelector(state=> state.auth)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })


  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    
     

    dispatch(loginUserAction(formData))
      .then(data => {
        if (data?.payload?.success) {
          toast.success(data.payload.message)
      
        } else {
          toast.error(data?.payload?.message || "Login failed")
        }
      })
      
  }

  return (
    <div className="flex-1 flex justify-center items-center px-6 py-10">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md flex flex-col gap-6"
      >
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Sign in</h1>
          <p className="text-gray-500 mt-1">
            Continue shopping with UrbanVibe
          </p>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="xyz@gmail.com"
            name="email"
            onChange={handleChange}
            required
            className="py-6 rounded-full text-base"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="••••••"
            name="password"
            onChange={handleChange}
            required
            className="py-6 rounded-full text-base"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="py-6 rounded-full text-lg"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        {/* Footer */}
        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link
            to="/auth/register"
            className="font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
