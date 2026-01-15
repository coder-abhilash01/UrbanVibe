import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "@/components/user-view/ProductCard";
import { getAllfilterdProducts } from "@/store/shop/Products.slice";
import Pagination from "@/components/user-view/Pagination";
import { Button } from "@/components/ui/button";

const Listing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList, pagination } = useSelector(
    (state) => state.shoppingProducts
  );
  const {currentPage, totalPages,totalProducts} = pagination

  const [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    const categories = searchParams.getAll("category");
    const sortBy = searchParams.get("sortBy") || "";
    const keyword = searchParams.get("keyword") || "";
const page = Number(searchParams.get("page")) || 1;
    dispatch(
      getAllfilterdProducts({
        category: categories,
        sortOption: sortBy,
        keyword,
        page
      })
    );
  }, [searchParams, dispatch]);

  const handlePreviousPage = () => 
     {
        const params = new URLSearchParams(searchParams);
        params.set("page", currentPage - 1);
        setSearchParams(params);
      }

      const handleNextPage = () =>{
        const params = new URLSearchParams(searchParams);
        params.set("page", currentPage+1)
        setSearchParams(params);


      }

      const handlePageClick = (pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber);
        
        setSearchParams(params);
      }

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    const currentCategories = params.getAll("category");

    if (e.target.checked) {
      params.append("category", value);
    } else {
      params.delete("category");
      currentCategories
        .filter((c) => c !== value)
        .forEach((c) => params.append("category", c));
    }
params.set("page",1)
    setSearchParams(params);
  };


  const handleSortChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("sortBy", value);
    } else {
      params.delete("sortBy");

    }
    params.set("page",1)

    setSearchParams(params);
  };

  const selectedCategories = searchParams.getAll("category");
  const selectedSort = searchParams.get("sortBy") || "";

  return (
    <>
   { totalProducts>0 ? (<div className="w-full grid grid-cols-1 md:grid-cols-[200px_1fr]  mt-20 md:bg-gray-100 md:gap-2">
      {/* ---------------- FILTERS ---------------- */}
      <div className="flex flex-col i gap-4 pb-2 px-5 bg-white  shadow border-r">
        <h2 className="text-xl font-bold text-center">Filters</h2>
        <Separator className="mt-2" />

        <div>
          <h3 className="font-semibold text-lg">Category</h3>
          {["Men", "ladies", "Kids", "Watch"].map((label) => {
            const value = label.toLowerCase();
            return (
              <div className="flex items-center gap-2" key={value}>
                <input
                  type="checkbox"
                  value={value}
                  checked={selectedCategories.includes(value)}
                  onChange={handleCategoryChange}
                />
                <label className="text-sm font-semibold">
                  {label}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------- PRODUCTS ---------------- */}
      <div className="w-full mt-8 md:mt-0 px-3 bg-white">
        <div className="w-full flex justify-between flex-wrap gap-4">
          <h2 className="text-xl font-bold">Products</h2>

          <div className="flex gap-4 flex-wrap items-center">
            <span className="bg-muted/70 px-2 rounded">
              <span className="bg-muted/70 px-2 rounded">
   Showing <strong>{productList.length}</strong> of <strong>{totalProducts}</strong> products
</span>

            </span>

            <div>
              <span className="font-semibold">Sort By : </span>
              <select
                className="border p-1 text-sm rounded"
                value={selectedSort}
                onChange={handleSortChange}
              >
                <option value="">Select</option>
                <option value="price_low_to_high">
                  Price: Low → High
                </option>
                <option value="price_high_to_low">
                  Price: High → Low
                </option>
                <option value="name_a_to_z">
                  Name: A → Z
                </option>
                <option value="name_z_to_a">
                  Name: Z → A
                </option>
              </select>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

      
       <ProductCard /> 


       {totalPages > 1 && (<Pagination 
       currentPage={currentPage}
       totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
       />
  
)}

     
      </div>

     
    </div>) : (  <div className="flex flex-col mt-24 items-center p-4">
        <img src="/shop/not-found-products.png" alt="products-not-found"  className="w-[400px] "/> 
       <h1 className="text-center text-2xl font-bold ">
We couldn't find any matches! </h1>
<p className="text- font-semibold text-black/60 mt-2">
Please check the spelling or try searching something else

        </p>
        <Button onClick={()=> navigate(-1) } >Back</Button> </div>)}
  </>);
};

export default Listing;
