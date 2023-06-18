import { useEffect, useState } from "react";
import CardJob from "../komponen/cardjob";
import FilterComp from "../komponen/filterKomponen";
import ImgSlide from "../komponen/imgSlide";
import Pagination from "../komponen/pagination";
import SearchBar from "../komponen/search";
import Header from "../shared/header";
import { useDispatch, useSelector } from "react-redux";
import { doRequestGetJobPost } from "../redux/jobhire-schema/action/actionReducer";

export default function Home() {
  const { job_post, refresh } = useSelector((state:any) => state.JobPostReducers,);
  // const dispatch = useDispatch();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(job_post?.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentItems = job_post?.slice(startIndex, endIndex);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    // console.log("CURRENT", currentPage, itemsPerPage);
  };

  // useEffect(()=>{
  //   setTimeout(()=>{dispatch(doRequestGetJobPost())},1000)
  //   setTimeout(()=>{console.log('post',job_post);},2000)
  //   // setTimeout(()=>{console.log('post',job_post);},2000)
  //   console.log("CURRENT, EFFECT", currentItems);
  // },[refresh])

  return (
    <div className="mx-auto w-[100%]">
        <Header/>
      <div>
        <div className="w-full bg-light-blue-50">
          <div className="lg:w-3/4 mx-auto py-2 w-11/12">
            <ImgSlide />
          </div>
        </div>
        <div className="shadow-sm shadow-gray-500">
          <div className="mx-auto lg:w-3/4 w-11/12">
            <SearchBar />
          </div>
        </div>

        <div className="max-w-screen-2xl xl:w-3/4 w-11/12 mx-auto p-2">
          <h2 className="py-5 text-sm">100 Lowongan Pekerjaan di Indonesia</h2>
            <div className="lg:flex justify-center md:block mx-auto">
              <FilterComp />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
                <CardJob currentPage={currentPage} itemsPerPage={itemsPerPage}/>
              </div>
            </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}
