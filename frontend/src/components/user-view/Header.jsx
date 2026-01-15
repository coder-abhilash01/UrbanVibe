import React, { useEffect, useState } from "react";
import {
  NavLink,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "@/store/authSlice";
import UserCartWrapper from "./UserCartWrapper";
import { fetchCartItems } from "@/store/shop/cart.Slice";
import { User2 } from "lucide-react";

const activeClass =
  "text-green-800 font-medium border-b-2 border-green-800 pb-1";
const normalClass =
  "text-gray-700 hover:text-black transition";

const UserHeader = () => {
  const { user, username } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [openSidebarSheet, setOpenSidebarSheet] = useState(false);
  const [searchText, setSearchText] = useState("")
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get("category");

  useEffect(() => {
    if (user?.id) dispatch(fetchCartItems(user.id));
    
  }, [dispatch, user?.id]);

  useEffect(()=>{
const timer = setTimeout(()=>{
  const params = new URLSearchParams(searchParams)

if (searchText.trim()){
params.set("keyword",searchText)
}else{params.delete("keyword")}

setSearchParams(params)
},1000)

 return () => clearTimeout(timer);
  },[searchText])

  const handleLogout = () => dispatch(logoutUserAction());

  const navLinks = [
    { label: "Home", to: "/shop/home" },
    { label: "Products", to: "/shop/listing" },
    { label: "Men", to: "/shop/listing?category=men" },
    { label: "Women", to: "/shop/listing?category=ladies" },
    { label: "Kids", to: "/shop/listing?category=kids" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 relative overflow-hidden">

        {/* LOGO */}
        
<NavLink to="/shop/home" className="flex items-center ">
  <img
    src="/shop/logo.png"
    alt="UrbanVibe Logo"
    className="aspect-[7/3] h-10 w-auto object-cover"
  />
</NavLink>
       

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center md:gap-4 lg:gap-6">
          {navLinks.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={() => {
                if (item.label === "Products") {
                  return location.pathname === "/shop/listing" && !activeCategory
                    ? activeClass
                    : normalClass;
                }
                if (item.to.includes("category")) {
                  return activeCategory === item.to.split("=").pop()
                    ? activeClass
                    : normalClass;
                }
                return location.pathname === item.to
                  ? activeClass
                  : normalClass;
              }}
            >
              {item.label}
            </NavLink>
          ))}

          <Input
            placeholder="Search products..."
            className="w-56 border-black/30"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                navigate(`/shop/listing?keyword=${e.target.value}`);
              }
            }}
          />
        </nav>

      
        <div className="flex items-center gap-5">

          {/* CART */}
          <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
            <button className="relative"
            onClick={() => setOpenCartSheet(true)}>
              <i className="ri-shopping-cart-2-line text-xl" />
              {cartItems?.items?.length > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-600 text-white text-xs flex items-center justify-center rounded-full">
                  {cartItems.items.length || ""}
                </span>
              )}
            </button>

            <UserCartWrapper
              cartItems={cartItems}
              setOpenCartSheet={setOpenCartSheet}
            />
          </Sheet>

          {/* ACCOUNT */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                {user ? <AvatarFallback className="font-bold">
                  {username?.[0]?.toUpperCase()} 
                </AvatarFallback> : <AvatarFallback className="font-bold">
                  <User2 size={18}/>
                </AvatarFallback> }
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {user ? <DropdownMenuLabel>
                Logged in as {username}
              </DropdownMenuLabel> : <DropdownMenuLabel>
                Guest Mode
              </DropdownMenuLabel>}

              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/shop/account")}>
                Account
              </DropdownMenuItem>
              {user ?<DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                Logout
              </DropdownMenuItem> : <DropdownMenuItem className="cursor-pointer" onClick={()=>{navigate("/auth/login")}}>
                Login
              </DropdownMenuItem> }
            </DropdownMenuContent>
          </DropdownMenu>

          {/* MOBILE MENU */}
          <Sheet open ={openSidebarSheet} onOpenChange={setOpenSidebarSheet}  >
            <SheetTrigger className="md:hidden">
              <i className="ri-menu-2-line text-xl" />
            </SheetTrigger>

            <SheetContent className="w-full">
              <SheetHeader>
                <SheetTitle className="text-center text-lg">Menu</SheetTitle>
              </SheetHeader>

              <nav className="mt-10 flex flex-col gap-4 text-lg">
                {navLinks.map((item) => (
                  <li
                    key={item.label}
                      onClick={() => 
                       {  
                          navigate(item.to)
                          setOpenSidebarSheet(false)
                            }} 
                    className="py-2 border-b text-gray-800 list-none cursor-pointer"
                  >
                    {item.label}
                  </li>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
