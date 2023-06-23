// import CheckBox from "./checkBox";
import AccordionTemplate from "./accordion";
import ToggleSwitch from "./switch";
// import Button from "./button";
import { BsFilterLeft, BsXLg } from 'react-icons/bs'
import RadioButton from "./radioButton";
import { Switch, Button, Checkbox, Radio } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doRequestGetWorktype } from "../redux/master-schema/action/actionReducer";

const FilterComp = (props:any) => {
  const {
    handleToggle,
    valueCheck,
    handleCheckboxChange,
    handleCheckboxChangeExpe,
    handleOptionChange,
    handleNewestButton,
    handleMatchButton
  } = props;

  const dispatch = useDispatch();
  let { work_type, refresh } = useSelector((state: any) => state.WorktypeReducers);

  const [openNav, setOpenNav] = useState(false);
  
  const rangeExpe = [
    { value: "0-0", label: "< 1 Tahun" },
    { value: "1-3", label: "1 - 3 Tahun" },
    { value: "5-10", label: "5 - 10 Tahun" },
    { value: "11-100", label: "> 10 Tahun" },
  ];

  const terUpdate = [
    { value: "24 Jam Terakhir", label: "24 Jam Terakhir" },
    { value: "Seminggu Terakhir", label: "Seminggu Terakhir" },
    { value: "Sebulan Terakhir", label: "Sebulan Terakhir" },
    { value: "Kapan pun", label: "Kapan pun" },
  ];

  useEffect(() => {
    dispatch(doRequestGetWorktype());
  }, [refresh]);
  
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
              <Button variant="outlined" className="m-1" onClick={handleMatchButton}>Match</Button>
              <Button variant="outlined" className="m-1" onClick={handleNewestButton}>Newest</Button>
            </div>
          }
        />
        <AccordionTemplate
          desc="Tipe Pekerjaan"
          Content={
            <div className="grid grid-rows-1">
              {work_type.map((option: any) => (
                <Checkbox
                  label={option.woty_name}
                  value={option.woty_code}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
          }
        />
        <AccordionTemplate
          desc="Pengalaman"
          Content={
            <div className="grid grid-rows-1">
              {rangeExpe.map((option: any) => (
                <Checkbox
                  label={option.label}
                  value={option.value}
                  onChange={handleCheckboxChangeExpe}
                />
              ))}
            </div>
          }
        />
        <AccordionTemplate
          desc="Remote"
          Content={
            <div className="flex justify-center">
              <Switch defaultChecked={valueCheck} onChange={handleToggle}/>
            </div>
          }
        />

        <AccordionTemplate
          desc="Terupdate"
          Content={
            <div className="grid grid-rows-1">
              {terUpdate.map((option: any, index: any) => (
                <div className="flex items-center mb-3">
                  <input
                    id={`radio-${index}`}
                    type="radio"
                    value={option.value}
                    name="default-radio"
                    onChange={handleOptionChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-gray-700">{option.label}</label>
                </div>
              ))}
            </div>
          }
        />
      </div>
    </div>
    </>
  );
};
export default FilterComp;
