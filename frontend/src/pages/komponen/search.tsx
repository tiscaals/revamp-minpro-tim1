import { Input, Select, Option, Button } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai'
import { doRequestGetJobrole } from "../redux/master-schema/action/actionReducer";
import { useDispatch, useSelector } from "react-redux";


const SearchBar = (props:any) => {
  const dispatch = useDispatch();

  const { job_role, refresh } = useSelector((state: any) => state.JobroleReducers);

  useEffect(() => {
    dispatch(doRequestGetJobrole())
  }, [refresh]);

  const {
    searchValue,
    setSearchValue,
    buttonClick,
    searchLocation,
    setSearchLocation,
    selectedValue,
    handleChange
  } = props;

  // console.log("selectedValue", selectedValue);

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
            value={searchValue}
            onChange={setSearchValue}/>
          </div>
        </div>

        <div className="pb-2 lg:pb-0 lg:pl-4">
          <div className="lg:w-72 md:w-auto bg-white rounded-md">
            <Input
            label="Lokasi"
            type="text"
            id="simple-search"
            icon={<AiOutlineSearch className="h-4 w-4" />}
            value={searchLocation}
            onChange={setSearchLocation}/>
          </div>
        </div>


        <div className="pb-4 lg:pb-0 lg:pl-4">
          <div className="w-auto">
          <select className="bg-white p-2.5 border-gray-400 border-[1px] rounded-lg" value={selectedValue} onChange={handleChange}>
            <option value=''>All</option>
              {job_role.map((option:any) =>
                <option key={option.joro_id} value={option.joro_name}>{option.joro_name}</option>
              )}
            </select>
          </div>
        </div>

        <div className="pb-2 lg:pb-0 lg:pl-4">
          <Button className="lg:w-52 w-full" 
          onClick={buttonClick}
          >
            SEARCH
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
