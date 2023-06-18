import { Accordion, AccordionBody, AccordionHeader,Input, Slider } from '@material-tailwind/react';
import React,{Fragment, useState} from 'react'
import { useForm } from 'react-hook-form';

export default function SkillAccordion({skills}:any) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();

    function Icon({ id, open }: any) {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              id === open ? 'rotate-180' : ''
            } h-5 w-5 transition-transform`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        );
      }
    
      const [open, setOpen] = useState(1);
    
      const handleOpen = (value: any) => {
        setOpen(open === value ? 0 : value);
      };
    
  return (
    <Fragment>
    {
      skills.map((item:any,index:number)=>(
        <Accordion open={open === index+1} icon={<Icon id={index+1} open={open}/>}>
        <AccordionHeader onClick={() => handleOpen(index+1)}>
          {item.section} (Scale 1 - 4)
        </AccordionHeader>
        <AccordionBody>
          {
            item.skills.map((it:any)=>(
              <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
              <li className="text-lg">{it.name}</li>
              <div className="flex justify-end flex-col w-max">
                  <Input
                    label="Score"
                    type="number"
                    min={0}
                    max={4}
                    {...register(it.tags)}
                  />
              </div>
            </div>
            ))
          }
        </AccordionBody>
      </Accordion>
      ))
    }
  </Fragment>
  )
}
