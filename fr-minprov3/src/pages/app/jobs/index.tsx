import Content1 from "@/pages/shared/content1";
import React, { Fragment, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pagination from "@/pages/shared/komponen/pagination";

import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import Link from "next/link";

import { Menu, Transition } from "@headlessui/react";

const dummyDataTable = [
  {
    id: 1,
    title: "Full StackDeveloper",
    start_date: "March 18,2020",
    end_date: "June 18,2020",
    salary: "10000000",
    expe: "5",
    industry: "Retail",
    spec_role: "Software Engineer",
  },
  {
    id: 2,
    title: "Java Fundamental",
    start_date: "March 18,2020",
    end_date: "June 18,2020",
    salary: "10000000",
    expe: "5",
    industry: "Information Tech",
    spec_role: "Engineer",
  },
];

const Jobs = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData]: any = useState([]);

  const handleSearchChange = () => {
    setIsSearching(true);
    const filtered = dummyDataTable.filter(
      (item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.expe.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.industry.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const displayData = isSearching ? filteredData : dummyDataTable;

  {
    /* UNTUK PAGING START */
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(displayData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = displayData?.slice(startIndex, endIndex);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  {
    /* UNTUK PAGING START END*/
  }

  return (
    <div>
      <Content1 title="jobs posting" path="jobs/new" button="Posting Job">
        <div className="container">
          <div className="w-full lg:pb-6">
            <div className="pt-6 lg:flex lg:flex-wrap items-center lg:justify-center">
              <div className="pb-2 lg:pb-0">
                <h1>Search by Category</h1>
              </div>

              <div className="pb-2 lg:pb-0 lg:pl-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className=" text-sm rounded-lg block w-full pl-8 p-2.5 ring-1 lg:w-[17rem] "
                    placeholder="Title, Experience, Industry, Category"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>

              <div className="pb-4 lg:pb-0 lg:pl-4">
                <select className="text-sm rounded-lg ring-1 block w-full p-2.5">
                  <option value="US">Open</option>
                  <option value="CA">Closed</option>
                </select>
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

          {/* TABEL */}
          <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center text-gray-900">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    TITLE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    START END DATE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    UP TO SALARY
                  </th>
                  <th scope="col" className="px-6 py-3">
                    EXPERIENCE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    INDUSTRY
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PUBLISH
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {(currentItems || []).map((dt: any, index: any) => (
                  <tr className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {dt.title}
                    </th>
                    <td className="px-6 py-4">
                      {dt.start_date}
                      <br></br>
                      {dt.end_date}
                    </td>
                    <td className="px-6 py-4">IDR {dt.salary}</td>
                    <td className="px-6 py-4">{dt.expe} Tahun</td>
                    <td className="px-6 py-4">
                      {dt.industry}
                      <br></br>
                      {dt.spec_role}
                    </td>
                    <td className="px-6 py-4">
                      <label className="relative inline-flex items-center  cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          // checked={isPublishChecked}
                          // onChange={handlePublishToggle}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full text-right">
                        <Menu
                          as="div"
                          className="relative inline-block text-left"
                        >
                          <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                              <MoreVertIcon
                                className="ml-2 -mr-1 h-5 w-5 text-gray-700 hover:text-gray-400 sm:flex"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-7 -mt-[4rem] mr-2 w-24 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="px-1 py-1 ">
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      href={{
                                        pathname: "jobs/edit",
                                        query: {
                                          id: dt.id,
                                        },
                                      }}
                                      className={`${
                                        active
                                          ? "bg-blue-400 text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                      Edit
                                    </Link>
                                  )}
                                </Menu.Item>
                              </div>

                              <div className="px-1 py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => {
                                        // setProdCatById(data);
                                        // setIsDelete(true);
                                      }}
                                      className={`${
                                        active
                                          ? "bg-blue-400 text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                      Delete
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2">
            <Pagination 
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            ></Pagination>
          </footer>
      </Content1>

    </div>
  );
};

export default Jobs;
