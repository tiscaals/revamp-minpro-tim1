import { doRequestAddPhoneNumber } from '@/pages/redux/users-schema/action/actionReducer';
import { Dialog, Transition } from '@headlessui/react';
import { Button, Input } from '@material-tailwind/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const AddPhoneNumber = (props: any) => {
  type FormValue = {
    uspo_entity_id: any;
    number_phone: string;
    uspo_ponty_code: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const dispatch = useDispatch();

  const addPhoneNumberValidation = {
    uspo_entity_id: { required: 'id required' },
    number_phone: {
      required: 'please fill column email address before submit',
    },
    uspo_ponty_code: { required: 'type phone is required' },
  };

  const handleAddPhoneNumber = async (data: any) => {
    dispatch(doRequestAddPhoneNumber(data));
    props.closeModal();
  };

  useEffect(() => {}, [handleAddPhoneNumber]);

  return (
    <div>
      <Transition appear show={props.show} as={Fragment}>
        <Dialog as="div" className="relative z-10" static onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Phone
                  </Dialog.Title>

                  <div className="border-t-1 border border-black-900 mt-3"></div>
                  <div className="">
                    <form onSubmit={handleSubmit(handleAddPhoneNumber)}>
                      <div className=" bg-white py-6  m-auto w-full">
                        <div className="grid grid-cols-1 gap-4  m-auto">
                          <div className="col-span-1">
                            <input
                              type="hidden"
                              defaultValue={props.profile?.user_entity_id}
                              {...register(
                                'uspo_entity_id',
                                addPhoneNumberValidation.uspo_entity_id
                              )}
                            />
                            <div className="w-full mt-2 mb-2 relative">
                              <Input
                                label="New Phone Number"
                                type="text"
                                {...register(
                                  'number_phone',
                                  addPhoneNumberValidation.number_phone
                                )}
                                autoComplete="off"
                              />
                              <span className="text-sm text-red-600">
                                {errors?.number_phone &&
                                  errors.number_phone.message}
                              </span>
                            </div>

                            <div className="w-50 mt-2 mb-2">
                              <select
                                className="block w-50 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                {...register(
                                  'uspo_ponty_code',
                                  addPhoneNumberValidation.uspo_ponty_code
                                )}
                              >
                                <option value="">Select Type Number</option>
                                <option value="cellular">Cellular</option>
                                <option value="home">Home</option>
                              </select>

                              <span className="text-sm text-red-600">
                                {errors?.uspo_ponty_code &&
                                  errors.uspo_ponty_code.message}
                              </span>
                            </div>

                            <div className="border-t-1 border border-black-900 mt-5"></div>
                            <div className="flex-row space-x-4 mt-4 text-right">
                              <Button
                                variant="outlined"
                                className="inline-flex justify-center rounded-md border bg-white border-red-500 hover:bg-red-500 hover:text-white px-4 py-2 text-sm font-medium text-red-900"
                                onClick={props.closeModal}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="outlined"
                                className="inline-flex justify-center rounded-md border bg-white text-blue-500 hover:bg-blue-400 hover:text-white px-4 py-2 text-sm font-medium"
                                type="submit"
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AddPhoneNumber;
