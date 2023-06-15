import { useState } from "react";
import CardJob from "../shared/komponen/cardjob";
import FilterComp from "../shared/komponen/filterKomponen";
import ImgSlide from "../shared/komponen/imgSlide";
import Pagination from "../shared/komponen/pagination";
import { company } from "../shared/komponen/data";
import SearchBar from "../shared/komponen/search";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const totalPages = Math.ceil(company?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = company?.slice(startIndex, endIndex);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="mx-5 pt-24">
        <h1 className=" text-lg">Our Network</h1>
        <ImgSlide />
        <SearchBar />
        <h2 className="py-5 text-lg">100 Lowongan Pekerjaan di Indonesia</h2>
        <div className="flex flex-wrap lg:flex-none">
          <FilterComp />
          <CardJob dataArray={currentItems} />
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        ></Pagination>
      </div>
    </div>
  );
}
