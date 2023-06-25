import { doRequestAddEmail } from '@/pages/redux/users-schema/action/actionReducer';
import { Dialog, Transition } from '@headlessui/react';
import { Button, Input } from '@material-tailwind/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const AddEmail = (props: any) => {
  type FormValue = {
    pmail_entity_id: any;
    pmail_address: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const dispatch = useDispatch();

  const addEmailValidation = {
    pmail_entity_id: { required: 'id required' },
    pmail_address: {
      required: 'please fill column email address before submit',
      isValidEmail: 'please enter a valid email address',
    },
  };

  const handleAddEmail = async (data: any) => {
    dispatch(doRequestAddEmail(data));
    props.closeModal();
  };

  useEffect(() => {}, [handleAddEmail]);

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
                    Add Email
                  </Dialog.Title>

                  <div className="border-t-1 border border-black-900 mt-3"></div>
                  <div className="">
                    <form onSubmit={handleSubmit(handleAddEmail)}>
                      <div className=" bg-white py-6  m-auto w-full">
                        <div className="grid grid-cols-1 gap-4  m-auto">
                          <div className="col-span-1">
                            <input
                              type="hidden"
                              defaultValue={props.profile.user_entity_id}
                              {...register(
                                'pmail_entity_id',
                                addEmailValidation.pmail_entity_id
                              )}
                            />
                            <div className="w-full mt-2 mb-2 relative">
                              <Input
                                label="Add New Email"
                                type="email"
                                {...register(
                                  'pmail_address',
                                  addEmailValidation.pmail_address
                                )}
                                autoComplete="off"
                              />
                              <span className="text-sm text-red-600">
                                {errors?.pmail_address &&
                                  errors.pmail_address.message}
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

export default AddEmail;
