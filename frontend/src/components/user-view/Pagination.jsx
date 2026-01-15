
const Pagination = ({ currentPage, totalPages, handleNextPage,handlePreviousPage, handlePageClick })=>{
    return (
        <div className="flex justify-center gap-2 my-8 flex-wrap">
    <button
      disabled={currentPage === 1}
      onClick={handlePreviousPage}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Prev
    </button>

    {Array.from({ length: totalPages }).map((_, i) => (
      <button
        key={i}
        onClick={()=>handlePageClick(i + 1)}
        className={`px-3 py-1 border rounded ${
          currentPage === i + 1 ? "bg-black text-white" : ""
        }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      disabled={currentPage === totalPages}
      onClick={handleNextPage}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
    )
}

export default Pagination