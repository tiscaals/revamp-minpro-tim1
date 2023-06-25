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
import { HiPlus } from 'react-icons/hi';
import { useDispatch } from 'react-redux';

export default function SkillAccordion({ skills, additionalInfo }: any) {
  const [scoress, setScoress] = useState<any>();
  const [open, setOpen] = useState<number[]>([1, 2, 3]);
  const [size, setSize] = useState(null);
  const [newObj, setNewObj] = useState<any>();
  const dispatch = useDispatch();
  const router = useRouter();

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
    let transformedObj: any = [];

    const note = data.note;
    delete data.note;
    let scores = Object.values(data);
    let totalScore: any = scores.reduce((a, b) => Number(a) + Number(b));
    // setScoress(totalScore / 4 * 10)

    skills.map((skill: any) => {
      skill.skills.map((skl: any) => {
        if (data[skl.tags]) {
          skl.score = data[skl.tags];
          const transformed: any = {
            btev_section: skill.section,
            btev_skill: skl.name,
            btev_skor: parseInt(skl.score),
            btev_week: skl.week,
            btev_type: skill.type,
            btev_header: additionalInfo.header,
            btev_trainee_entity_id: additionalInfo.trainee_id,
            btev_batch_id: additionalInfo.batch_id,
            btev_note: note,
          };
          transformedObj.push(transformed);
        }
        return skl;
      });
      return skill;
    });
    // setScoress(totalScore / 4 * 10)
    setNewObj({
      batr_total_score: (totalScore / 4) * 10,
      data: transformedObj,
    });
    handleDialog('xs');
  };

  useEffect(() => {}, [open]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(submitScore)}>
        {skills.map((item: any, index: number) => (
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
            <AccordionBody>
              {item.skills.map((it: any) => (
                <div className="flex flex-col lg:flex-row justify-between p-1 space-y-1 md:flex-row md:space-y-0 md:space-x-4 ">
                  <li className="text-md">{it.name}</li>
                  <div className="flex">
                    <input
                      type="number"
                      min={0}
                      max={4}
                      className="ml-5 w-11 border text-center border-gray-400 rounded-sm"
                      placeholder="0"
                      {...register(it.tags, { required: true })}
                    />
                    {errors[it.tags] && (
                      <span className="text-sm text-red-500">
                        This field is required
                      </span>
                    )}
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
            <DialogHeader>Konfirmasi Selesai</DialogHeader>
            <DialogBody divider>Apakah kamu yakin ingin submit?</DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                onClick={() => handleDialog(null)}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                onClick={() => {
                  dispatch(addEvalsReq(newObj));
                  router.push('/app/batch');
                }}
              >
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      </form>
    </Fragment>
  );
}
