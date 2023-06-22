import ContentLink from "@/pages/contentlink";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai'
import Pagination from "@/pages/komponen/pagination";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { doRequestGetClient } from "../../redux/jobhire-schema/action/actionReducer";
import { Button } from "@material-tailwind/react";

const Jobs = () => {
  const columns = [
    {name:'NAME'},
    {name:'INDUSTRY NAME'},
    {name:'EMPLOYEE RANGE'},
    {name:''},
  ]

  const dispatch = useDispatch()

  let { client ,refresh } = useSelector(
    (state: any) => state.ClientReducers
  );

  useEffect(() => {
    dispatch(doRequestGetClient());
  }, [refresh]);


  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData]: any = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleSearchChange = () => {
    setCurrentPage(1)
    setIsSearching(true);
  
    const filtered = client.filter((item: any) => {
      const clitName = item.clit_name?.toLowerCase() ?? '';
      const induName = item.indu_name?.toLowerCase() ?? '';
  
      return (
        clitName.includes(searchValue.toLowerCase()) ||
        induName.includes(searchValue.toLowerCase())
      );
    });
  
    setFilteredData(filtered);
  };

  const displayData = isSearching ? filteredData : client;

  {
    /* UNTUK PAGING START */
  }
  const totalPages = Math.ceil(displayData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = displayData?.slice(startIndex, endIndex);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  {
    /* UNTUK PAGING END*/
  }

  type FormValues = {
    search:string,

  };

  const {
    register,
    handleSubmit,
  } = useForm<FormValues>();

  const handleRegistration = async (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <ContentLink title="CLIENT" isilink="client/new" button="Add">
        <div>
          <form onSubmit={handleSubmit(handleRegistration)}>
            <div className="w-full lg:pb-6">
              <div className="pt-6 lg:flex lg:flex-wrap items-center lg:justify-center">
                <div className="pb-2 lg:pb-0">
                  <h1>Search client</h1>
                </div>

                <div className="pb-2 lg:pb-0 lg:pl-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <AiOutlineSearch className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className=" text-sm rounded-lg block w-full pl-8 p-2.5 ring-1 lg:w-[17rem] "
                      placeholder="Client"
                      value={searchValue}
                      {...register('search')}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pb-2 lg:pb-0 lg:pl-4">
                  <button
                    className="w-full text-center text-white order-0  px-4 py-2  border rounded-md bg-blue-400 text-sm font-medium focus:ring-blue-500  uppercase hover:bg-blue-500"
                    onClick={handleSearchChange}
                  >
                    SEARCH
                  </button>
                </div>
              </div>
            </div>


            <div>


            </div>

            {/* TABEL */}
            <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-center text-gray-900">
                <thead>
                  <tr className='border-t border-gray-200'>
                      {(columns || []).map((col) =>
                      <th scope="col" className='px-6 py-3 text-center border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          <span className='lg:pl-2'>{col.name}</span>
                      </th>
                      )}
                  </tr>
                </thead>

                <tbody>
                  {(currentItems || []).map((dt: any, index: any) => (
                    <tr className="bg-white border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {dt.clit_name}
                      </th>
                      <td className="px-6 py-4">{dt.indu_name}</td>
                      <td className="px-6 py-4">
                        {dt.emra_range_min} - {dt.emra_range_max}
                      </td>

                      <td className="px-6 py-4">
                        <div className="w-full text-right">
                          <Button variant="outlined">
                            <Link
                              href={{
                                pathname: `client/edit/`,
                                query :{
                                    clit_id : dt.clit_id
                                },
                              }}
                            >
                              Edit
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            ></Pagination>
          </form>
        </div>
      </ContentLink>
    </div>
  );
};

export default Jobs;
