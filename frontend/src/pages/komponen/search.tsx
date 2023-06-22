import { Input, Select, Option, Button } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai'
import { doRequestGetJobrole } from "../redux/master-schema/action/actionReducer";
import { useDispatch, useSelector } from "react-redux";

const handleFormSubmit = (event: any) => {
  event.preventDefault();
  // Tambahkan logika untuk menghandle submit form di sini
};

const SearchBar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();

  const { job_role } = useSelector((state: any) => state.JobroleReducers);

  useEffect(() => {
    setIsClicked(false)
    dispatch(doRequestGetJobrole())
    // setTimeout(()=>console.log("JOB ROLE CLG",job_role), 3000)
  }, [Event]);

  return (
    <div className="p-4">
      <div className="relative lg:flex lg:flex-wrap justify-between items-center lg:justify-center mx-auto">
        
        <div className="pb-2 lg:pb-0 lg:pl-4">
          <div className="lg:w-72 md:w-auto bg-white rounded-md">
            <Input
            label="Jabatan, Kata Kunci, Perusahaan"
            type="text"
            id="simple-search"
            icon={<AiOutlineSearch className="h-4 w-4" />}
            onClick={()=>setIsClicked(true)}/>
          </div>
        </div>

        <div className="pb-2 lg:pb-0 lg:pl-4">
          <div className="lg:w-72 md:w-auto bg-white rounded-md">
            <Input
            label="Lokasi"
            type="text"
            id="simple-search"
            icon={<AiOutlineSearch className="h-4 w-4" />}
            onClick={()=>setIsClicked(true)}/>
          </div>
        </div>


        <div className="pb-4 lg:pb-0 lg:pl-4">
          <div className="w-auto">
            <Select label="Pilih Posisi" className="bg-white">
              {job_role.map((option:any) =>
                <Option key={option.joro_id} value={option.joro_id}>{option.joro_name}</Option>
              )}
            </Select>
          </div>
        </div>

        <div className="pb-2 lg:pb-0 lg:pl-4">
          <Button className="lg:w-52 w-full" 
          // onClick={handleSearchChange}
          >
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
