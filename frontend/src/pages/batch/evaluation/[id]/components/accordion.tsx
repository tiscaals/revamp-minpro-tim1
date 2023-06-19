import { Accordion, AccordionBody, AccordionHeader,Button,Input, Slider, Typography } from '@material-tailwind/react';
import React,{Fragment, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
import { HiPlus } from 'react-icons/hi';

export default function SkillAccordion({skills}:any) {
  const [scores,setScores] = useState<any>([])
  const [open, setOpen] = useState([1,2,3]);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();
    
      const handleOpen = (value: any) => {
        console.log(value, 'value');
        console.log(open, 'open');
        open.includes(value)? setOpen(open.filter((id)=> id !== value)): setOpen([...open,value])
      };

      // console.log(scores);
    
    const submitScore = (data:any) => {
      console.log(data);
    }

    useEffect(()=>{},[open])
    
  return (
    <Fragment>
      <form onSubmit={handleSubmit(submitScore)}>
    {
      skills.map((item:any,index:number)=>(
        // <Accordion open={open === index+1} icon={<Icon id={index+1}/>}>
        <Accordion open={open.includes(index+1)} icon={<HiPlus className={`${open.includes(index+1)? 'text-red-500 rotate-45 transition-transform': ''}`}/>}>
        <AccordionHeader onClick={() => handleOpen(index+1)} className='text-md'>
          {item.section} (Scale 1 - 4)
        </AccordionHeader>
        <AccordionBody>
          {
            item.skills.map((it:any)=>(
              <div className="flex flex-col lg:flex-row justify-between p-1 space-y-1 md:flex-row md:space-y-0 md:space-x-4 ">
              <li className="text-md">{it.name}</li>
                <div className='flex'>
                  <input type='number' min={0} max={4} className="ml-5 w-11 border text-center border-gray-400 rounded-sm" placeholder='0' {...register(it.tags,{required: true})}/>
                  {errors[it.tags] && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
                </div>
            </div>
            ))
          }
        </AccordionBody>
      </Accordion>
      ))
    }
    <div className='flex gap-3 justify-end'>
      <Button className='mt-3 w-1/5' variant='outlined' type='submit'>Cancel</Button>
      <Button className='mt-3 w-1/5' type='submit'>Submit</Button>
    </div>
      </form>
  </Fragment>
  )
}
