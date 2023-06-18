import CheckBox from "./checkBox";
import AccordionTemplate from "./accordion";
import ToggleSwitch from "./switch";
// import Button from "./button";
import { BsFilterLeft, BsXLg } from 'react-icons/bs'
import RadioButton from "./radioButton";
import { Switch, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const FilterComp = () => {
  const [openNav, setOpenNav] = useState(false);
  const [newest, setIsNewest] = useState(false)
  
  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  return (
    <>
    <Button fullWidth size="sm" variant="outlined" className="lg:hidden mb-5 flex items-center gap-3 justify-center" onClick={()=>{setOpenNav(!openNav)}}>
      {openNav?
        <BsXLg className="w-6 h-6"/>
      :
      <div className="flex items-center gap-3 justify-center">
        <BsFilterLeft className="w-6 h-6"/> Filter
      </div>
      }
    </Button>

    <div className={`lg:flex lg:pr-5 lg:pb-5 ${openNav ? 'flex m-5' : 'hidden'}`}>
      <div className={`overflow-y-auto h-[32rem] block items-center border lg:p-5 lg:py-1 ${openNav ? 'w-full justify-center' : 'w-[22rem]'}`}>
        <p className="font-semibold p-2">Filter Pencarianmu</p>
        <AccordionTemplate
          desc="Tampilkan berdasarkan"
          Content={
            <div className="flex justify-center">
              <Button variant="outlined" className="m-1" onClick={()=>{setIsNewest(false)}}>Match</Button>
              <Button variant="outlined" className="m-1" onClick={()=>{setIsNewest(true)}}>Newest</Button>
            </div>
          }
        />
        <AccordionTemplate
          desc="Tipe Pekerjaan"
          Content={
            <div className="grid grid-rows-1 gap-3">
              <CheckBox namaCheck="Magang" />
              <CheckBox namaCheck="Full-time" />
              <CheckBox namaCheck="Part-time" />
              <CheckBox namaCheck="Freelance" />
            </div>
          }
        />
        <AccordionTemplate
          desc="Pengalaman"
          Content={
            <div className="grid grid-rows-1 gap-3">
              <CheckBox namaCheck="< 1 Tahun" />
              <CheckBox namaCheck="1 - 3 Tahun" />
              <CheckBox namaCheck="5 - 10 Tahun" />
              <CheckBox namaCheck="> 10 Tahun" />
            </div>
          }
        />
        <AccordionTemplate
          desc="Remote"
          Content={
            <div className="flex justify-center">
              <Switch />
            </div>
          }
        />

        <AccordionTemplate
          desc="Terupdate"
          Content={
            <div className="text-center">
              <RadioButton text="24 Jam Terakhir"></RadioButton>
              <RadioButton text="Seminggu Terakhir"></RadioButton>
              <RadioButton text="Sebuan Terakhir"></RadioButton>
              <RadioButton text="Kapan pun"></RadioButton>
            </div>
          }
        />
      </div>
    </div>
    </>
  );
};
export default FilterComp;
