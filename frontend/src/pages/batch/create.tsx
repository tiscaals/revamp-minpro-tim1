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
  // const divRef = useRef(null);
  const [checked, setChecked] = useState<any>([]);
  const [selectedTrainer, setSelectedTrainer] = useState(trainerData[0]);
  const [selectedCoTrainer, setSelectedCoTrainer] = useState(trainerData[0]);
  const [query, setQuery] = useState('');
  const [selTechno, setSelTechno] = useState<string>('')
  const [batchType, setBatchType] = useState<string>('')

  const filteredPeople =
    query === ''
      ? trainerData
      : trainerData.filter((trainer: any) => {
          return trainer.name.toLowerCase().includes(query.toLowerCase());
        });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    data.namecheck = checked.sort((a, b) => a - b);
    data.batch_entity_id = selTechno
    data.batchType = batchType
    data.trainer = selectedTrainer
    data.cotrainer = selectedCoTrainer
    console.log(data);
  };

  const activate = (item: any, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setChecked([...checked,item]);
    } else {
      setChecked(checked.filter((it:any) => it.id !== item.id));
    }
  };

  console.log(checked);

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
                <Option value='1'>Material Tailwind HTML</Option>
                <Option value='2'>Material Tailwind React</Option>
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

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 mt-5 ">
          <div className="lg:w-1/2">
            <Typography color="black" className="font-normal mb-2 mt-3">
              Trainer
            </Typography>
            <Combobox value={selectedTrainer} onChange={setSelectedTrainer}>
              <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none"
                    displayValue={(person: any) => person.name}
                    onChange={event => setQuery(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <HiChevronDown
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery('')}
                >
                  <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredPeople.length === 0 && query !== '' ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      filteredPeople.map(person => (
                        <Combobox.Option
                          key={person.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-light-blue-500 text-white'
                                : 'text-gray-900'
                            }`
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {person.name}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-teal-600'
                                  }`}
                                >
                                  <HiCheck
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </div>
          <div className="lg:w-1/2">
            <Typography color="black" className="font-normal mb-2 mt-3">
              Co-Trainer
            </Typography>
            <Combobox value={selectedCoTrainer} onChange={setSelectedCoTrainer}>
              <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <Combobox.Input
                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none"
                    displayValue={(person: any) => person.name}
                    onChange={event => setQuery(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <HiChevronDown
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery('')}
                >
                  <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredPeople.length === 0 && query !== '' ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      filteredPeople.map(person => (
                        <Combobox.Option
                          key={person.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-light-blue-500 text-white'
                                : 'text-gray-900'
                            }`
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {person.name}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-teal-600'
                                  }`}
                                >
                                  <HiCheck
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
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
