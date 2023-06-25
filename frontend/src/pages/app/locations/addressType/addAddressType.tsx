import React, { Fragment, useState } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { Listbox } from '@headlessui/react';
import { HiChevronUpDown, HiCheck } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { reqCreateAdressType, reqCreateCat, reqCreateSkillType} from '@/redux/actions/actionReducer';
import Index from '@/pages/locations';

const AddAddressType = (props: any) => {

  const dispatch = useDispatch();

  type FormValues = {
    adty_name: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleRegistration = async (data: FormValues) => {
    console.log('ini',data);
    dispatch(reqCreateAdressType(data));
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
                  Tambahkan Adress Type
                </Dialog.Title>
                <form className="space-y-6"  onSubmit={handleSubmit(handleRegistration)}>
                  <div className="flex items-center">
                    <label
                      className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                      htmlFor="inline-full-name"
                    >
                      Adress Type
                    </label>
                    <div className="w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="text"
                        {...register('adty_name')}
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

export default AddAddressType;
