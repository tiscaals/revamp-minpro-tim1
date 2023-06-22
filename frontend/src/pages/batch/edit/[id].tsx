import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import {
  Input,
  Button,
  Avatar,
  Select,
  Option,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import { HiPlusSm, HiMinusSm } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBatchReq,
  getAllProgramsReq,
  getAllRecStudentReq,
  getAllTrainersReq,
  getOneBatchesReq,
} from '../../redux/bootcamp-schema/action/actionReducer';
import { useRouter } from 'next/router';

export default function EditBatch() {
  const { batch, refresh } = useSelector((state: any) => state.batchReducers);
  const { programs } = useSelector((state: any) => state.programReducers);
  const { trainers } = useSelector((state: any) => state.trainerReducers);
  const { recstudents } = useSelector((state: any) => state.studentReducers);

  const [checked, setChecked] = useState<any>([]);
  // const [selectedTrainer, setSelectedTrainer] = useState<any>();
  // const [selectedCoTrainer, setSelectedCoTrainer] = useState<any>();
  const [selTechno, setSelTechno] = useState<any>();
  // const [batchType, setBatchType] = useState<string>('');

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // data.batch_status = 'open';

    // //PIC diambil dari user yang login (recruiter)
    // data.batch_pic_id = 1;
    // // console.log(data);

    // let newTrainer = {
    //   tpro_emp_entity_id: data.trainer.emp_entity_id,
    // };

    // let newCoTrainer = {
    //   tpro_emp_entity_id: data.cotrainer.emp_entity_id,
    // };

    // let newTrainee = [];

    // for (let i in checked) {
    //   newTrainee.push({
    //     batr_trainee_entity_id: checked[i].user_entity_id,
    //   });
    // }
    // const newObj = {
    //   batch: data,
    //   trainee: newTrainee,
    //   instructors: [newTrainer, newCoTrainer],
    // };
    console.log(data);
  };

  const activate = (item: any, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setChecked([...checked, item]);
    } else {
      setChecked(
        checked.filter(
          (it: any) =>
            it.batr_trainee_entity_id !== item.prap_user_entity_id &&
            it.prap_user_entity_id !== item.prap_user_entity_id
        )
      );
    }
  };

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(getOneBatchesReq(id));
    }
    dispatch(getAllTrainersReq());
    dispatch(getAllProgramsReq());
    dispatch(getAllRecStudentReq(selTechno));
  }, [id, selTechno]);

  useEffect(() => {
    if (batch) {
      setSelTechno(batch.batch_entity_id);
      setChecked(batch.trainees);

      // let defaultValue:any = {}
      // defaultValue.batch_entity_id = batch.batch_entity_id
    }
  }, [batch, selTechno]);

  if (programs.length === 0 && trainers.length === 0) {
    return <div className="bg-black w-full h-screen"> Loading</div>;
  }

  if (!id && !batch) {
    return <div>....</div>;
  }

  console.log(batch);
  // console.log(recstudents);
  return (
    <div className="w-full bg-white rounded-md p-10 mx-auto ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <Typography variant="h5" color="blue-gray">
            Edit Batch
          </Typography>
        </div>
        <br />
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-5">
          <div className="lg:w-3/4 flex flex-col gap-5 lg:border-r-2 lg:pr-10 border-gray-200">
            <Typography color="gray" className="font-normal mb-5">
              General Information
            </Typography>
            <div>
              <Input
                label="Batch Name"
                defaultValue={batch?.batch_name}
                {...register('batch_name', { required: true })}
                error={errors.batch_name}
              />
              {errors.batch_name && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex lg:flex-row flex-col gap-5">
              <div className="w-1/2">
                {/* <Select inputProps={{...register('batch_entity_id',{required:true})}} error={errors.batch_entity_id} onChange={setSelTechno} label="Technology" >
                {
                  (programs || []).map((item:any)=>(
                    <Option key={item.prog_entity_id} value={item.prog_entity_id} >{item.prog_title}</Option>
                  ))
                }
              </Select> */}
                <select
                  className="w-full text-blue-gray-500 border border-gray-400 p-2 rounded-md"
                  {...register('batch_entity_id')}
                  // onChange={(e)=>setSelTechno(e.target.value)}
                  error={errors.batch_entity_id}
                  // label="Technology"
                >
                  {(programs || []).map((item: any) => (
                    <option
                      key={item.prog_entity_id}
                      value={item.prog_entity_id}
                      selected={selTechno == item.prog_entity_id}
                    >
                      {item.prog_title}
                    </option>
                  ))}
                </select>
                {errors.batch_entity_id && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              <div className="w-1/2">
                <select
                  className="w-full text-blue-gray-500 border border-gray-400 p-2 rounded-md"
                  {...register('batch_type')}
                  error={errors.batch_type}
                >
                  <option
                    value="offline"
                    selected={batch?.batch_status === 'offline'}
                  >
                    Offline
                  </option>
                  <option
                    value="online"
                    selected={batch?.batch_status === 'online'}
                  >
                    Online
                  </option>
                  <option
                    value="corporate"
                    selected={batch?.batch_status === 'corporate'}
                  >
                    Corporate
                  </option>
                </select>
                {/* <Select {...register('batch_type',{required:true})} onChange={setBatchType} label="Type" error={errors.batch_type} >
                <Option value='offline'>Offline</Option>
                <Option value='online'>Online</Option>
                <Option value='corporate'>Corporate</Option>
              </Select> */}
                {errors.batch_type && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="lg:flex justify-between gap-5">
              <div className="w-full">
                <Textarea
                  label="Description"
                  {...register('batch_description', { required: true })}
                  error={errors.batch_description}
                  defaultValue={batch?.batch_description}
                />
                {errors.batch_description && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="lg:w-1/4">
            <Typography color="gray" className="font-normal mb-5">
              Range Date
            </Typography>
            <div>
              <span className="text-sm mr-2 grid content-center">From</span>
              <div>
                <input
                  type="date"
                  defaultValue={batch?.batch_start_date}
                  {...register('batch_start_date', { required: true })}
                  className={`appearance-none border ${
                    errors.batch_start_date
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 text-red-500'
                      : 'border-blue-gray-200 focus:ring-light-blue-500 focus:border-light-blue-500 text-gray-600'
                  } rounded-md px-4 py-2 w-full text-sm focus:outline-none focus:ring-1`}
                />
                {errors.batch_start_date && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="mb-5">
              <span className="text-sm mr-2 grid content-center">To</span>
              <div>
                <input
                  type="date"
                  defaultValue={batch?.batch_end_date}
                  {...register('batch_end_date', { required: true })}
                  className={`appearance-none border ${
                    errors.batch_start_date
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 text-red-500'
                      : 'border-blue-gray-200 focus:ring-light-blue-500 focus:border-light-blue-500 text-gray-600'
                  } rounded-md px-4 py-2 w-full text-sm focus:outline-none focus:ring-1`}
                />
                {errors.batch_end_date && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <br />
        <Typography color="gray" className="font-normal mb-1 mt-3">
          Select Trainer and Co-Trainer
        </Typography>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 mt-5 ">
          <div className="lg:w-1/2">
            <div>
              {/* <Select onChange={setSelectedTrainer} label="Trainer" inputProps={{...register('trainer',{required:true})}} error={errors.trainer}>
                {
                  (trainers || []).map((item:any)=> (
                    <Option value={item}>{item.user_first_name}</Option>
                  ))
                }
            </Select> */}
              {/* selected={} */}
              <select
                className="w-full text-blue-gray-500 border border-gray-400 p-2 rounded-md"
                {...register('trainer')}
                error={errors.trainer}
              >
                {(trainers || []).map((item: any) => (
                  <option
                    value={item}
                    selected={
                      batch?.trainers &&
                      batch.trainers[0].tpro_emp_entity_id ===
                        item.emp_entity_id
                    }
                  >
                    {item.user_first_name}
                  </option>
                ))}
              </select>
              {errors.trainer && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div>
              <select
                className="w-full text-blue-gray-500 border border-gray-400 p-2 rounded-md"
                {...register('cotrainer')}
                error={errors.cotrainer}
              >
                {(trainers || []).map((item: any) => (
                  <option
                    value={item}
                    selected={
                      batch?.trainers &&
                      batch.trainers[1].tpro_emp_entity_id ===
                        item.emp_entity_id
                    }
                  >
                    {item.user_first_name}
                  </option>
                ))}
              </select>
              {/* <Select onChange={setSelectedCoTrainer} label="Co-Trainer" inputProps={{...register('cotrainer',{required:true})}} error={errors.cotrainer}>
                {
                  (trainers || []).map((item:any)=> (
                    <Option value={item} selected={batch.trainers && batch.trainers[1].tpro_emp_entity_id === item.emp_entity_id}>{item.user_first_name}</Option>
                  ))
                }
            </Select> */}
              {errors.cotrainer && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>
        </div>

        <Typography color="gray" className="font-normal mb-2 mt-10">
          Recommended Bootcamp Members
        </Typography>
        <div className="flex flex-col lg:flex-row gap-3 justify-start ">
          {recstudents ? (
            recstudents.map((item: any, index: number) => (
              <div className="my-3" key={item.prap_user_entity_id}>
                <label
                  className={`flex justify-between content-center w-auto cursor-pointer rounded-lg py-3 px-4 font-semibold text-sm ${
                    checked.find(
                      (i: any) =>
                        i.batr_trainee_entity_id === item.prap_user_entity_id ||
                        i.prap_user_entity_id === item.prap_user_entity_id
                    )
                      ? 'bg-light-blue-500 border border-light-blue-500 transition-all duration-300 text-white shadow-lg shadow-light-blue-200'
                      : 'bg-white border border-gray-`300 text-light-blue-400 hover:scale-105 transition-transform ease-in-out'
                  }`}
                >
                  <div className="flex gap-4 justify-between">
                    <Avatar className="w-10 h-10" src={item.user_photo} />
                    <div>
                      <div>{item.user_first_name}</div>
                      <div className="font-normal text-light-blue-200">
                        {item.user_last_name}
                      </div>
                    </div>
                  </div>
                  <input
                    checked={
                      checked.find(
                        (i: any) =>
                          i.batr_trainee_entity_id ===
                            item.prap_user_entity_id ||
                          i.prap_user_entity_id === item.prap_user_entity_id
                      )
                        ? true
                        : false
                    }
                    className="hidden"
                    type="checkbox"
                    onChange={e => activate(item, e)}
                  />
                  {checked.find(
                    (i: any) =>
                      i.prap_user_entity_id === item.prap_user_entity_id ||
                      i.prap_user_entity_id === item.prap_user_entity_id
                  ) ? (
                    <div className="text-xl grid content-center">
                      {' '}
                      <HiMinusSm />{' '}
                    </div>
                  ) : (
                    <div className="text-xl grid content-center">
                      {' '}
                      <HiPlusSm />{' '}
                    </div>
                  )}
                  {/* {
                    checked.map(check=>(
                      check.
                    ))
                  } */}
                </label>
              </div>
            ))
          ) : (
            <div className=" flex justify-items-center mx-auto text-center text-sm ">
              <p className="bg-red-100 px-12 py-2 rounded-md text-red-900">
                Belum ada orang yang mendaftar program terpilih <br /> Coba
                ganti program
              </p>
            </div>
          )}
        </div>
        <div className="flex w-full justify-center mt-5">
          <Button type="submit" className="w-1/4">
            submit
          </Button>
        </div>
      </form>
    </div>
  );
}
