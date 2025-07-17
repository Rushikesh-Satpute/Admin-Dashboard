import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const getPageNumbers = () => {
    const delta = 2; // Show 2 pages before and after the current page
    const range: number[] = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift(-1); // Add ellipsis indicator (-1) at the beginning
    }

    if (currentPage + delta < totalPages - 1) {
      range.push(-1); // Add ellipsis indicator (-1) at the end
    }

    // Always include the first and last pages (if they aren't already in the range)
    return Array.from(new Set([1, ...range, totalPages])); // Remove duplicates using Set
  };


  return (
    <div className="flex justify-center items-center space-x-2 py-4">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-2xl rounded-md ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"}`}
      >
        <FaAngleLeft />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) =>
        page === -1 ? (
          <span key={index} className="px-3 py-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-md ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 text-2xl rounded-md ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white"}`}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;
