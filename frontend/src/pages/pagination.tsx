import { useState } from "react"
import {
  ChevronLeftIcon, ChevronRightIcon
} from '@heroicons/react/24/solid'

const Pagination = (props: any): any => {
  const { totalPages, currentPage, handlePageChange } = props;

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5; // Jumlah maksimum tombol yang ingin ditampilkan

    let startPage = currentPage - Math.floor(maxButtons / 2);
    startPage = Math.max(startPage, 1); // Pastikan startPage tidak kurang dari 1
    let endPage = startPage + maxButtons - 1;
    endPage = Math.min(endPage, totalPages); // Pastikan endPage tidak melebihi totalPages

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <a
          key={i}
          aria-current="page"
          onClick={() => handlePageChange(i)}
          className={`relative z-10 inline-flex items-center ${currentPage === i
              ? "bg-blue-500 text-white focus-visible:outline-indigo-600"
              : "bg-white text-black"
            } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}
        >
          {i}
        </a>
      );
    }

    return buttons;
  };


  return (
    <div className="py-2 text-center">
      <nav
        className="isolate inline-flex -space-x-px  shadow-sm rounded-lg border-2"
        aria-label="Pagination"
      >
        <a
          onClick={() =>
            handlePageChange(currentPage - 1 <= 1 ? 1 : currentPage - 1)
          }
          href="#"
          className=" relative inline-flex items-center rounded-l-md px-2 py-2  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </a>
        {renderPaginationButtons()}

        <a
          onClick={() =>
            handlePageChange(
              currentPage + 1 <= totalPages
                ? currentPage + 1
                : currentPage
            )
          }
          href="#"
          className=" relative inline-flex items-center rounded-r-md px-2 py-2 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </a>
      </nav>
    </div>
  )
}

export default Pagination