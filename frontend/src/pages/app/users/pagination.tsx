import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

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
          href="#"
          aria-current="page"
          onClick={() => handlePageChange(i)}
          className={`relative z-10 inline-flex items-center ${
            currentPage === i
              ? 'bg-blue-600 text-white focus-visible:outline-blue-600'
              : 'bg-white text-black'
          } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border border-solid border-gray-300`}
        >
          {i}
        </a>
      );
    }

    return buttons;
  };

  return (
    <div className="py-4 text-center">
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <a
          onClick={() =>
            handlePageChange(currentPage - 1 <= 1 ? 1 : currentPage - 1)
          }
          href="#"
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
        </a>
        {renderPaginationButtons()}
        <a
          onClick={() =>
            handlePageChange(
              currentPage + 1 <= totalPages ? currentPage + 1 : currentPage
            )
          }
          href="#"
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
        </a>
      </nav>
    </div>
  );
};

export default Pagination;
