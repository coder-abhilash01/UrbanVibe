import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 mt-20">
      
      {/* TOP FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
        
        {/* BRAND */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">UrbanVibe</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Premium fashion & lifestyle store delivering quality products
            across India with fast delivery and secure payments.
          </p>

          <div className="flex gap-4 text-xl">
            <i className="ri-facebook-fill hover:text-white cursor-pointer" />
            <i className="ri-instagram-line hover:text-white cursor-pointer" />
            <i className="ri-twitter-x-line hover:text-white cursor-pointer" />
            <i className="ri-youtube-line hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="text-white font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">
                <Link to="/shop/listing?category=men">Men</Link> </li>
            <li className="hover:text-white cursor-pointer">
                <Link to="/shop/listing?category=ladies">Women</Link></li>
            <li className="hover:text-white cursor-pointer">
                 <Link to="/shop/listing?category=kids">Kids</Link></li>
            <li className="hover:text-white cursor-pointer">
                 <Link to="/shop/listing?category=watches">Watches</Link></li>
       
          </ul>
        </div>

        {/* CUSTOMER */}
        <div>
          <h3 className="text-white font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">
                 <Link to="/shop/account">My Account</Link></li>
            <li className="hover:text-white cursor-pointer">
                 <Link to="/shop/orders">Orders</Link></li>
            <li className="hover:text-white cursor-pointer">
                 <Link to="/shop/wishlist">Wishlist</Link></li>
            <li className="hover:text-white cursor-pointer">
                 <Link to="#">Track Order</Link></li>
            <li className="hover:text-white cursor-pointer">
                 <Link to="/shop/help-center">Help Center</Link></li>
          </ul>
        </div>

        {/* POLICIES */}
        <div>
          <h3 className="text-white font-semibold mb-4">Policies</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">
              <Link to="policy/return">Return Policy</Link></li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer">Shipping Policy</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Subscribe Newsletter
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Get updates on offers & new arrivals
          </p>

          <div className="flex gap-2">
            <Input
              placeholder="Your email"
              className="bg-transparent border-gray-600 text-white"
            />
            <Button className="bg-white text-black hover:bg-gray-200">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} UrbanVibe. All rights reserved.</p>

          <div className="flex gap-4 text-xl">
            <i className="ri-visa-fill" />
            <i className="ri-mastercard-fill" />
            <i className="ri-paypal-fill" />
            <i className="ri-amazon-pay-fill" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
