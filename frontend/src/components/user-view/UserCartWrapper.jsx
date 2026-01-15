import React from "react";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./UserCartItemsContent";
import { useNavigate } from "react-router-dom";

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();

  const totalAmount = cartItems?.items?.reduce(
    (acc, item) => acc + item.salePrice * item.quantity,
    0
  );

  return (
    <SheetContent className="sm:max-w-lg w-full flex flex-col">
      {/* Header */}
      <SheetHeader>
        <SheetDescription></SheetDescription>
        <SheetTitle className="text-yellow-400 text-2xl">
          Cart
        </SheetTitle>
      </SheetHeader>

      {/* Cart Content */}
      <div className="flex-1 max-h-[80vh] overflow-auto p-3 bg-gray-100 rounded-xl mt-3">
        {cartItems?.items?.length ? (
          cartItems.items.map((item, i) => (
            <UserCartItemsContent key={i} item={item} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <img
              src="/shop/empty-cart.png"
              alt="Empty Cart"
              className="w-56 mb-5 opacity-90"
            />

            <h2 className="text-lg font-semibold text-gray-800">
              Your cart is waiting
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Add items you love and they’ll appear here.
            </p>

            <button
              onClick={() => {
                navigate("/shop/home");
                setOpenCartSheet(false);
              }}
              className="mt-6 px-6 py-2 rounded-full bg-yellow-400 text-black text-sm font-medium hover:opacity-90 transition"
            >
              Browse products
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      {cartItems?.items?.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center text-lg font-semibold mb-3 px-6">
            <span>Total</span>
            <span className="text-yellow-600 text-xl">
              ₹ {totalAmount}
            </span>
          </div>

          <Button
            className="w-full bg-yellow-500 p-6 rounded-full text-lg hover:bg-yellow-600 transition"
            onClick={() => {
              navigate("/shop/checkout");
              setOpenCartSheet(false);
            }}
          >
            Checkout
          </Button>
        </div>
      )}
    </SheetContent>
  );
};

export default UserCartWrapper;
