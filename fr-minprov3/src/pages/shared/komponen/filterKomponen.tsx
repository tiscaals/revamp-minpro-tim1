import CheckBox from "./checkBox";
import AccordionTemplate from "./accordion";
import ToggleSwitch from "./switch";
import Button from "./button";
import RadioButton from "./radioButton";

const FilterComp = () => {
  return (
    <div className="flex pr-5 pb-5">
      <div className="overflow-y-auto h-[32rem] w-[22rem] block items-center border p-5 py-1 ">
        <AccordionTemplate desc="Filter Pencarianmu" />
        <AccordionTemplate
          desc="Tampilan berdasarkan"
          Content={
            <div className="relative flex flex-wrap justify-center py-3">
              <Button text="Match"></Button>
              <Button text="Newest"></Button>
            </div>
          }
        />
        <AccordionTemplate
          desc="Tipe Pekerjaan"
          Content={
            <div className="grid grid-rows-1 gap-3 pl-1 py-3">
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
            <div className="grid grid-rows-1 gap-3 pl-1 py-3">
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
            <div className="pl-1 py-3 text-center">
              <ToggleSwitch />
            </div>
          }
        />

        <AccordionTemplate
          desc="Terupdate"
          Content={
            <div className="pl-1 py-3 text-center ">
              <RadioButton text="24 Jam Terakhir"></RadioButton>
              <RadioButton text="Seminggu Terakhir"></RadioButton>
              <RadioButton text="Sebuan Terakhir"></RadioButton>
              <RadioButton text="Kapan pun"></RadioButton>
            </div>
          }
        />
      </div>
      </div>
  );
};
export default FilterComp;
