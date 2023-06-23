// import { Dialog } from '@headlessui/react';
import { addEvalsReq } from '@/pages/redux/bootcamp-schema/action/actionReducer';
import {
  Accordion,
  AccordionBody,
  Dialog,
  AccordionHeader,
  Button,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Slider,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiPlus, HiPlusCircle } from 'react-icons/hi';
import { useDispatch } from 'react-redux';

export default function SkillAccordion3() {
  const [isi, setIsi] = useState<any>([
    {
      section: 'Fundamental',
      skills: [],
    },
    {
      section: 'OOP',
      skills: [],
    },
  ]);
  //   const [scoress,setScoress] = useState<any>()
  const [open, setOpen] = useState<number[]>([1, 2, 3]);
  const [size, setSize] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOpen = (value: any) => {
    open.includes(value)
      ? setOpen(open.filter(id => id !== value))
      : setOpen([...open, value]);
  };

  const handleDialog = (value: any) => {
    setSize(value);
  };

  const submitScore = (data: any) => {
    // let transformedObj:any = []
    // const note = data.note
    // delete data.note
    // let scores = Object.values(data)
    // let totalScore:any = scores.reduce((a,b)=>Number(a)+Number(b))
    // // setScoress(totalScore / 4 * 10)
    // skills.map((skill:any)=> {
    //   skill.skills.map((skl:any)=>{
    //     if(data[skl.tags]){
    //       skl.score = data[skl.tags]
    //       const transformed:any = {
    //         btev_section: skill.section,
    //         btev_skill: skl.name,
    //         btev_skor: parseInt(skl.score),
    //         btev_week: skl.week,
    //         btev_type: skill.type,
    //         btev_header:additionalInfo.header,
    //         btev_trainee_entity_id: additionalInfo.trainee_id,
    //         btev_batch_id: additionalInfo.batch_id,
    //         btev_note: note
    //       }
    //       transformedObj.push(transformed)
    //     }
    //     return skl
    //   })
    //   return skill
    // })
    // setScoress(totalScore / 4 * 10)
    // setNewObj({
    //   batr_total_score: totalScore / 4 * 10,
    //   data: transformedObj
    // })
  };

  const submitsection = (data: any) => {
    setIsi([...isi, { section: data.section }]);
  };

  const submitsubsection = (name: string) => {
    setIsi((prevState: any) => {
      const newState = prevState.map((item: any) => {
        if (item.section === name) {
          return {
            ...item,
            skills: [...item.skills, { name: name, desc: 'coba' }],
          };
        }
        return item;
      });

      return newState;
    });
    // setIsi([...isi,
    //     {
    //         section:'Fundamental',
    //         skills: [
    //             {name:name}
    //         ],
    //     }
    // ])
  };

  useEffect(() => {
    console.log(isi);
  }, [open, isi]);

  if (!isi && isi?.length === 0) {
    <div>Loading...</div>;
  }
  return (
    <Fragment>
      <form onSubmit={handleSubmit(submitScore)}>
        <Button onClick={() => handleDialog('xs')}>Add section</Button>
        {isi &&
          isi?.map((item: any, index: number) => (
            <Accordion
              open={open.includes(index + 1)}
              icon={
                <HiPlus
                  className={`${
                    open.includes(index + 1)
                      ? 'text-red-500 rotate-45 transition-transform'
                      : ''
                  }`}
                />
              }
            >
              <AccordionHeader
                onClick={() => handleOpen(index + 1)}
                className="text-md"
              >
                {item.section} (Scale 1 - 4)
              </AccordionHeader>
              <HiPlusCircle onClick={() => submitsubsection(item.section)} />
              <AccordionBody>
                {item?.skills?.map((it: any) => (
                  <div className="flex flex-col lg:flex-row justify-between p-1 space-y-1 md:flex-row md:space-y-0 md:space-x-4 ">
                    <li className="text-md">{it.name}</li>
                    <div className="flex">
                      {/* <input type='number' min={0} max={4} className="ml-5 w-11 border text-center border-gray-400 rounded-sm" placeholder='0' {...register(it.tags)}/>
                  {errors[it.tags] && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )} */}
                    </div>
                  </div>
                ))}
              </AccordionBody>
            </Accordion>
          ))}
        <Textarea label="Note" {...register('note')} />
        <div className="flex gap-3 justify-end mt-3">
          <Button className="mt-3 lg:w-1/5" variant="gradient" type="submit">
            Submit
          </Button>
          <Dialog
            open={size === 'xs'}
            // onClose={()=>handleDialog('xs')}
            size={size || 'xs'}
            handler={handleDialog}
          >
            <form onSubmit={handleSubmit(submitsection)}>
              <DialogHeader>Konfirmasi Selesai</DialogHeader>
              <DialogBody divider>
                <Input label="section name" {...register('section')} />
              </DialogBody>
              <DialogFooter>
                <Button type="submit">Confirm</Button>
              </DialogFooter>
            </form>
          </Dialog>
        </div>
      </form>
    </Fragment>
  );
}
