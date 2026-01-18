import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from '@radix-ui/react-label'
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from 'react-redux'
import { registerUserAction } from '@/store/authSlice'
import { toast } from "sonner"
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const dispatch = useDispatch()
  const navigate =  useNavigate()
    const {isLoading} = useSelector(state=> state.auth)

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if( !formData.userName || !formData.email || !formData.password ){
      return toast.error("All fields are required")
    }
    dispatch(registerUserAction(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message)
        navigate("/auth/login")
      } else {
        toast.error(data?.payload?.message)
      }
    })
  }

  return (
    <div className="flex-1 flex justify-center items-center px-6 py-10">
      <form className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md flex flex-col gap-6" onSubmit={submitHandler}>

        <div className="text-center mb-2">
          <h1 className="text-3xl font-semibold">Create account</h1>
          <p className="text-gray-500 text-sm">
            Join V-Mart today
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <Label>Name</Label>
          <Input
            type="text"
            placeholder="Your name"
            name="userName"
            onChange={handleChange}
            className="py-6 rounded-full text-lg px-4"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="xyz@gmail.com"
            name="email"
            onChange={handleChange}
            className="py-6 rounded-full text-lg px-4"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            name="password"
            onChange={handleChange}
            className="py-6 rounded-full text-lg px-4"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="py-6 rounded-full text-lg">
          {isLoading ? "Signing up..." : "Sign up"}
        </Button>
  <p className="text-sm text-center">
          
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
