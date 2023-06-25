import React, { Fragment, useState } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { Listbox } from '@headlessui/react';
import { HiChevronUpDown, HiCheck } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { reqCreateAdressType, reqCreateCat, reqCreateModule, reqCreateSkillTemplete, reqCreateSkillType} from '@/redux/actions/actionReducer';
import Index from '@/pages/locations';

const AddST = (props: any) => {
  console.log(props)

  const dispatch = useDispatch();

  type FormValues = {
    skte_skill: string;
    skte_description: string;
    skte_week : string;
    skte_orderby : string;
    skty_name : string;
    skte_skte_id : number ;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleRegistration = async (data: FormValues) => {
    console.log('ini',data);
    dispatch(reqCreateSkillTemplete(data));
    props.closeModal()
  };
  return (
    <div>
      <Transition appear show={props.show} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto z-50"
          onClose={() => null}
        >
          <div className="min-h-screen flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                <Dialog.Title
                  as="h3"
                  className="pb-6 pt-3 text-center text-lg leading-6 text-gray-700 font-bold"
                >
                  Tambahkan Skill Tempelete
                </Dialog.Title>
                <form className="space-y-6"  onSubmit={handleSubmit(handleRegistration)}>
                  <div className="flex items-center">
                    <label
                      className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                      htmlFor="inline-full-name"
                    >
                      Skill
                    </label>
                    <div className="w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="text"
                        {...register('skte_skill')}
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                      htmlFor="inline-full-name"
                    >
                      Type
                    </label>
                    <div className="w-2/3">
                    <select
                      {...register('skty_name')}
                      className="text-center rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900"
                    >
                      <option value="">-- Pilih --</option>
                      {props.dataType?.map((dt: any) => (
                        <option key={dt.skty_name} value={dt.skty_name}>
                          {dt.skty_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                      htmlFor="inline-full-name"
                    >
                      Parent
                    </label>
                    <div className="w-2/3">
                    <select
                      {...register('skte_skte_id')}
                      className="text-center rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900"
                    >
                      <option value="">-- Pilih --</option>
                      {props.dataParent[0].map((dp: any) => (
                        <option key={dp.skte_id} value={dp.skte_id}>
                          {dp.skte_skill}
                        </option>
                      ))}
                    </select>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                      htmlFor="inline-full-name"
                    >
                      Week
                    </label>
                    <div className="w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="number"
                        {...register('skte_week')}
                      />
                    </div>
                    <label
                      className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                      htmlFor="inline-full-name"
                    >
                      Order By
                    </label>
                    <div className="w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="number"
                        {...register('skte_orderby')}
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                      htmlFor="inline-full-name"
                    >
                      Description
                    </label>
                    <div className="w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 h-24"
                        id="inline-full-name"
                        type="text"
                        {...register('skte_description')}
                        />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="mr-4 shadow bg-teal-600 hover:bg-teal-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="button"
                      onClick={() => props.closeModal()}
                    >
                      Cancel
                    </button>
                    <button
                      className="shadow bg-teal-600 hover:bg-teal-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AddST;
