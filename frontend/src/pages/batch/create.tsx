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
import SearchList from '../components/searchlist';
import { HiChevronDown, HiCheck, HiPlusSm, HiMinusSm } from 'react-icons/hi';
import { Combobox, Transition } from '@headlessui/react';
import Image from 'next/image';

import logo from '../../images/avatar.webp';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProgramsReq, getAllTrainersReq } from '../redux/bootcamp-schema/action/actionReducer';

const data = [
  { id: 11, name: 'nama' },
  { id: 12, name: 'nama2' },
  { id: 13, name: 'nama3' },
  { id: 14, name: 'nama4' },
  { id: 15, name: 'nama5' },
  { id: 16, name: 'nama6' },
  { id: 17, name: 'nama7' },
  { id: 18, name: 'nama8' },
];

const trainerData: any[] = [
  {
    id: 1,
    name: 'Alex',
    role: 'trainer',
    img: 'https://ui-avatars.com/api/?background=random',
  },
  {
    id: 2,
    name: 'Assalam',
    role: 'trainer',
    img: 'https://ui-avatars.com/api/?background=random',
  },
  {
    id: 3,
    name: 'Bargoy',
    role: 'trainer',
    img: 'https://ui-avatars.com/api/?background=random',
  },
  {
    id: 4,
    name: 'Zufar',
    role: 'trainer',
    img: 'https://ui-avatars.com/api/?background=random',
  },
  {
    id: 5,
    name: 'Raihan',
    role: 'trainer',
    img: 'https://ui-avatars.com/api/?background=random',
  },
];

export default function Content() {
  const {programs} = useSelector((state:any)=>state.programReducers)
  const {trainers} = useSelector((state:any)=>state.trainerReducers)

  const [checked, setChecked] = useState<any>([]);
  const [selectedTrainer, setSelectedTrainer] = useState();
  const [selectedCoTrainer, setSelectedCoTrainer] = useState();
  const [selTechno, setSelTechno] = useState<string>('')
  const [batchType, setBatchType] = useState<string>('')

  const dispatch = useDispatch()
  console.log(trainers);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    data.batch_entity_id = selTechno
    data.batch_type = batchType
    data.batch_status = 'open'

    //PIC diambil dari user yang login (recruiter)
    data.batch_pic_id = 1
    data.trainee = checked.sort((a:any, b:any) => a - b)
    data.instructors = [selectedTrainer,selectedCoTrainer]
    console.log(data)
  };

  const activate = (item: any, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setChecked([...checked,item]);
    } else {
      setChecked(checked.filter((it:any) => it.id !== item.id));
    }
  };

  useEffect(()=>{
    dispatch(getAllTrainersReq())
    dispatch(getAllProgramsReq())
  },[])

  return (
    <div className="w-full bg-white rounded-md p-10 mx-auto ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <Typography variant="h5" color="blue-gray">
            Create Batch
          </Typography>
        </div>
        <br />
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-5">
          <div className="lg:w-3/4 flex flex-col gap-5 lg:border-r-2 lg:pr-10 border-gray-200">
            <Typography color="gray" className="font-normal mb-5">
              General Information
            </Typography>
            <Input label="Batch Name" {...register('batch_name')} />
            <div className="flex lg:flex-row flex-col gap-5">
              <Select onChange={setSelTechno} label="Technology">
                {
                  (programs || []).map((item:any)=>(
                    <Option value={item.prog_entity_id}>{item.prog_title}</Option>
                  ))
                }
              </Select>
              <Select onChange={setBatchType} label="Type" >
                <Option value='offline'>Offline</Option>
                <Option value='online'>Online</Option>
                <Option value='corporate'>Corporate</Option>
              </Select>
            </div>
            <div className="lg:flex justify-between gap-5">
              <Textarea label="Description" {...register('batch_description')} />
            </div>
          </div>
          <div className="lg:w-1/4">
            <Typography color="gray" className="font-normal mb-5">
              Range Date
            </Typography>
            <div>
              <span className="text-sm mr-2 grid content-center">From</span>
              <input
                type="date"
                {...register('batch_start_date')}
                className=" appearance-none border border-blue-gray-200 rounded-md px-4 py-2 w-full text-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-light-blue-500 focus:border-light-blue-500"
              />
            </div>

            <div className="mb-5">
              <span className="text-sm mr-2 grid content-center">To</span>
              <input
                type="date"
                {...register('batch_end_date')}
                className=" appearance-none border border-blue-gray-200 rounded-md px-4 py-2 w-full text-gray-600 text-sm  focus:outline-none focus:ring-1 focus:ring-light-blue-500 focus:border-light-blue-500"
              />
            </div>
          </div>
        </div>
        <br />
          <Typography color="gray" className="font-normal mb-1 mt-3">
              Select Trainer and Co-Trainer
            </Typography>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 mt-5 ">
          <div className="lg:w-1/2">
            <Select onChange={setSelectedTrainer} label="Trainer" >
                {
                  (trainers || []).map((item:any)=> (
                    <Option value={item}>{item.user_first_name}</Option>
                  ))
                }
            </Select>
          </div>
          <div className="lg:w-1/2">
            <Select onChange={setSelectedCoTrainer} label="Co-Trainer" >
                {
                  (trainers || []).map((item:any)=> (
                    <Option value={item}>{item.user_first_name}</Option>
                  ))
                }
            </Select>
          </div>
        </div>

        <Typography color="gray" className="font-normal mb-2 mt-10">
          Recommended Bootcamp Members
        </Typography>
        <div className="grid justify-center lg:grid-cols-4 ">
          {data.map((item, index) => (
            <div className="my-3" key={item.id}>
              <label
                className={`flex justify-between content-center w-48 cursor-pointer rounded-lg py-3 px-4 font-semibold text-sm uppercase ${
                  checked.find((i:any) => i.id === item.id)
                  ? 'bg-light-blue-500 border border-light-blue-500 transition-all duration-300 text-white shadow-md shadow-light-blue-100'
                  : 'bg-white border border-gray-`300 text-light-blue-400 hover:scale-105 transition-transform'
                }`}
              >
                <div>
                  <Avatar
                    className="w-7 h-7 mr-2"
                    src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff`}
                  />
                  {item.name}
                </div>
                <input
                  className="hidden"
                  type="checkbox"
                  onChange={e => activate(item, e)}
                />
                {checked.find((i:any) => i.id === item.id) ? (
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
          ))}
        </div>
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
}
