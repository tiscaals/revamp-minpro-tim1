import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  doRequestGetRole,
  doRequestUpdateRole,
} from '../redux/users-schema/action/actionReducer';

const EditUsers = (props: any) => {
  type FormValue = {
    user_entity_id: any;
    role_id: string;
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValue>();

  const dispatch = useDispatch();
  const { roles, refresh } = useSelector((state: any) => state.rolesReducers);

  const handleUpdate = async (data: any) => {
    const update = {
      user_entity_id: data.user_entity_id,
      role_id: data.role_id?.role_id,
    };

    if (data.role_id === undefined || data.role_id === null) {
      setError('role_id', {
        type: 'validate',
        message: 'please choose role before submit',
      });
    } else {
      dispatch(doRequestUpdateRole(update));
      props.closeModal();
    }
  };

  const propsData = {
    options: roles,
    getOptionLabel: (option: any) => option.role_name,
  };

  useEffect(() => {
    dispatch(doRequestGetRole());
  }, [refresh]);

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
                    Edit User
                  </Dialog.Title>

                  <div className="border-t-1 border border-black-900 mt-3"></div>
                  <div className="">
                    <form onSubmit={handleSubmit(handleUpdate)}>
                      <div className=" bg-white py-6  m-auto w-full">
                        <div className="grid grid-cols-1 gap-4  m-auto">
                          <div className="col-span-1">
                            <input
                              type="hidden"
                              defaultValue={props.userId}
                              {...register('user_entity_id')}
                            />
                            <div className="w-full">
                              <Autocomplete
                                {...propsData}
                                autoComplete
                                id="combo-box-demo"
                                size="small"
                                includeInputInList
                                onChange={(event: any, value: any) => {
                                  register('role_id', { value: value });
                                }}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    label="Choose Role"
                                    InputProps={{
                                      ...params.InputProps,
                                    }}
                                  />
                                )}
                              />
                              <span className="text-sm text-red-600">
                                {errors?.role_id && errors.role_id.message}
                              </span>
                            </div>
                            <div className="border-t-1 border border-black-900 mt-5"></div>
                            <div className="flex-row space-x-4 mt-4 text-right">
                              <button
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={props.closeModal}
                              >
                                Cancel
                              </button>
                              <button
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                type="submit"
                              >
                                Save
                              </button>
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

export default EditUsers;
