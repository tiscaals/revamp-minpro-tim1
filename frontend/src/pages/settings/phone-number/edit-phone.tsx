import { Dialog, Transition } from '@headlessui/react';
import { Button, Input } from '@material-tailwind/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { doRequestUpdatePhoneNumber } from '../../redux/users-schema/action/actionReducer';

const EditPhoneNumber = (props: any) => {
  type FormValue = {
    uspo_number: string;
    number_phone: string;
    uspo_ponty_code: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const dispatch = useDispatch();

  const editPhoneNumberValidation = {
    uspo_number: { required: 'please fill column email address before submit' },
    number_phone: {
      required: 'please fill column email address before submit',
    },
    uspo_ponty_code: { required: 'type phone is required' },
  };

  const handleEditPhoneNumber = async (phone_number: any) => {
    dispatch(doRequestUpdatePhoneNumber(phone_number));
    props.closeModal();
  };

  useEffect(() => {}, [handleEditPhoneNumber]);

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
                    Edit Phone
                  </Dialog.Title>

                  <div className="border-t-1 border border-black-900 mt-3"></div>
                  <div className="">
                    <form onSubmit={handleSubmit(handleEditPhoneNumber)}>
                      <div className=" bg-white py-6  m-auto w-full">
                        <div className="grid grid-cols-1 gap-4  m-auto">
                          <div className="col-span-1">
                            <div className="w-full mt-2 mb-2 relative">
                              <input
                                type="hidden"
                                {...register(
                                  'uspo_number',
                                  editPhoneNumberValidation.uspo_number
                                )}
                                defaultValue={props.selectedPhone.uspo_number}
                                autoComplete="off"
                              />
                              <Input
                                label="Edit Phone Number"
                                type="number"
                                {...register(
                                  'number_phone',
                                  editPhoneNumberValidation.number_phone
                                )}
                                defaultValue={props.selectedPhone.uspo_number}
                                autoComplete="off"
                              />
                              <span className="text-sm text-red-600">
                                {errors?.uspo_number &&
                                  errors.uspo_number.message}
                              </span>
                            </div>

                            <div className="w-50 mt-2 mb-2">
                              <select
                                className="block w-50 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                {...register(
                                  'uspo_ponty_code',
                                  editPhoneNumberValidation.uspo_ponty_code
                                )}
                                defaultValue={props.selectedPontyCode}
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

export default EditPhoneNumber;
