import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ page, size, totalItems, setPage }) {
  const totalPages = Math.ceil(totalItems / size);

  // Hide pagination if there is only 1 page or no items
  if (totalPages <= 1) return null;

  const pageNumbers = [];

  // Always show the first page
  pageNumbers.push(1);

  if (page > 3) {
    pageNumbers.push("...");
  }

  // Generate sibling pages (1 page before and after current page)
  for (let i = page - 1; i <= page + 1; i++) {
    if (i > 1 && i < totalPages) {
      pageNumbers.push(i);
    }
  }

  if (page < totalPages - 2) {
    pageNumbers.push("...");
  }

  // Always show the last page
  pageNumbers.push(totalPages);

  return (
    <div className="flex justify-center items-center gap-1.5 md:gap-2 mt-12 text-xs md:text-sm font-medium flex-wrap">
      {/* Previous Button */}
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-1 py-1 md:px-2 md:py-2 bg-orange-600 rounded-full transition-all duration-300 ease-in-out hover:bg-orange-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-600"
      >
        <ChevronLeft size={16} className="text-white" />
      </button>

      {/* Page Numbers & Ellipsis */}
      {pageNumbers.map((number, index) => {
        if (number === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="px-1.5 py-1 md:px-3 md:py-2 text-gray-500"
            >
              {number}
            </span>
          );
        } else {
          return (
            <button
              key={`${number}-${index}`}
              onClick={() => setPage(number)}
              className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-orange-600 text-orange-600 cursor-pointer transition-all duration-300 ease-in-out ${
                page === number
                  ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {number}
            </button>
          );
        }
      })}

      {/* Next Button */}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="px-1 py-1 md:px-2 md:py-2 bg-orange-600 rounded-full transition-all duration-300 ease-in-out hover:bg-orange-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} className="text-white" />
      </button>
    </div>
  );
}

export default Pagination;
