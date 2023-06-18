import { Input, Select, Option, Button } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai'

const handleFormSubmit = (event: any) => {
  event.preventDefault();
  // Tambahkan logika untuk menghandle submit form di sini
};

const SearchBar = () => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(false)
  }, [Event]);

  return (
    <div className="p-4">
      <div className="relative lg:flex lg:flex-wrap justify-between items-center lg:justify-center mx-auto">
        
        <div className="pb-2 lg:pb-0 lg:pl-4">
          {/* <div className="relative"> */}
            {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiOutlineSearch className="h-4 w-4" />
            </div> */}
            <div className="lg:w-72 md:w-auto bg-white rounded-md">
              <Input
              label="Jabatan, Kata Kunci, Perusahaan"
              type="text"
              id="simple-search"
              icon={<AiOutlineSearch className="h-4 w-4" />}
              onClick={()=>setIsClicked(true)}/>
            </div>
            {/* <input
              type="text"
              id="simple-search"
              className=" text-sm rounded-lg block w-full pl-10 p-2.5 ring-1 lg:w-[30rem] "
              placeholder="Jabatan, Kata Kunci, Perusahaan"
              // value={searchValue}
              // onChange={(e) => setSearchValue(e.target.value)}
            /> */}
          {/* </div> */}
        </div>

        <div className="pb-2 lg:pb-0 lg:pl-4">
          {/* <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiOutlineSearch className="h-4 w-4" />
            </div> */}
            <div className="lg:w-72 md:w-auto bg-white rounded-md">
              <Input
              label="Lokasi"
              type="text"
              id="simple-search"
              icon={<AiOutlineSearch className="h-4 w-4" />}
              onClick={()=>setIsClicked(true)}/>
            </div>
            {/* <input
              type="text"
              id="simple-search"
              className=" text-sm rounded-lg block w-full pl-10 p-2.5 ring-1 lg:w-[25rem] "
              placeholder="Location"
              // value={searchValue}
              // onChange={(e) => setSearchValue(e.target.value)}
            />
          </div> */}
        </div>

        <div className="pb-4 lg:pb-0 lg:pl-4">
          <div className="w-auto">
            <Select label="Pilih Posisi" className="bg-white">
              {/* Pilihannya ngambil dari job role(joro) */}
              <Option value="IT">IT Programmer</Option>
              <Option value="UX">UX Design</Option>
              <Option value="NT">Networking</Option>
              <Option value="MD">Modelling</Option>
            </Select>
          </div>
        </div>

        <div className="pb-2 lg:pb-0 lg:pl-4">
          <Button className="lg:w-52 w-full">
            SEARCH
          </Button>
          {/* <button
            className="w-full text-center text-white order-0  px-4 py-2  border rounded-md bg-blue-400 text-sm font-medium focus:ring-blue-500  uppercase hover:bg-blue-500 lg:w-[10rem]"
            // onClick={handleSearchChange}
          >
            SEARCH
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
