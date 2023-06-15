import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchIcon from "@mui/icons-material/Search";

const handleFormSubmit = (event: any) => {
  event.preventDefault();
  // Tambahkan logika untuk menghandle submit form di sini
};

const SearchBar = () => {
  return (
    <div className="container">
      <div className="w-full lg:pb-6">
        <div className="pt-6 lg:flex lg:flex-wrap items-center lg:justify-center">
          <div className="pb-2 lg:pb-0 lg:pl-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="h-4 w-4" />
              </div>
              <input
                type="text"
                id="simple-search"
                className=" text-sm rounded-lg block w-full pl-10 p-2.5 ring-1 lg:w-[30rem] "
                placeholder="Jabatan, Kata Kunci, Perusahaan"
                // value={searchValue}
                // onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>

          <div className="pb-2 lg:pb-0 lg:pl-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="h-4 w-4" />
              </div>
              <input
                type="text"
                id="simple-search"
                className=" text-sm rounded-lg block w-full pl-10 p-2.5 ring-1 lg:w-[25rem] "
                placeholder="Location"
                // value={searchValue}
                // onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>

          <div className="pb-4 lg:pb-0 lg:pl-4">
            <select className="text-sm rounded-lg ring-1 block w-full lg:w-[15rem] p-2.5">
              <option value="IT">IT Programmer</option>
              <option value="UX">UX Design</option>
              <option value="NT">Networking</option>
              <option value="MD">Modelling</option>
            </select>
          </div>

          <div className="pb-2 lg:pb-0 lg:pl-4">
            <button
              className="w-full text-center text-white order-0  px-4 py-2  border rounded-md bg-blue-400 text-sm font-medium focus:ring-blue-500  uppercase hover:bg-blue-500 lg:w-[10rem]"
              // onClick={handleSearchChange}
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>

      {/* <div className="pt-6 lg:flex lg:flex-wrap items-center lg:justify-center">
        <div className="w-full pb-3 lg:pl-4">
          <div className=" relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </div>
            <input
              type="text"
              id="simple-search"
              className=" text-sm rounded-lg block w-full pl-10 p-2.5 ring-1 "
              placeholder="Jabatan, Kata Kunci, Perusahaan"
            />
          </div>
        </div>

        <div className="w-full pb-3 lg:pl-4">
          <div className=" relative ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </div>
            <input
              type="text"
              id="simple-search"
              className=" text-sm rounded-lg  block w-full pl-10 p-2.5 ring-1 "
              placeholder="Location"
            />
          </div>
        </div>

        <div className="w-full pb-3 lg:pl-4">
          <select
            id="countries"
            className=" text-sm rounded-lg  ring-1  block w-full p-2.5"
          >
            <option value="US">IT Programmer</option>
            <option value="CA">UX Design</option>
            <option value="FR">Networking</option>
            <option value="DE">Modelling</option>
          </select>
        </div>

        <div className="w-full lg:pl-4">
          <button
            type="submit"
            className="p-2.5 w-full text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 "
          >
            Search
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default SearchBar;
