import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@material-tailwind/react';
import { doRequestAddSkills, doReqGetSkills } from '@/pages/redux/users-schema/action/actionReducer';

const AddSkills = (props: any) => {
  type FormValue = {
    uski_entity_id: string;
    uski_skty_name: string;
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValue>();

  const dispatch = useDispatch();
  const { skills }: any = useSelector((state: any) => state.skillsReducers);

  const handleValidation = {
    uski_entity_id: { required: 'id is required' },
    uski_skty_name: { required: 'choose your skills' },
  };

  const handleAddSkilss = async (data: any) => {
    if (data.uski_skty_name === undefined) {
      setError('uski_skty_name', {
        type: 'validate',
        message: 'choose your skills',
      });
    } else {
      dispatch(doRequestAddSkills(data));
      props.closeModal();
    }
  };

  useEffect(() => {
    dispatch(doReqGetSkills());
  }, []);

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
                    Add Skills
                  </Dialog.Title>

                  <div className="border-t-1 border border-black-900 mt-3"></div>
                  <div className="">
                    <form onSubmit={handleSubmit(handleAddSkilss)}>
                      <div className=" bg-white py-6  m-auto w-full">
                        <div className="grid grid-cols-1 gap-4  m-auto">
                          <div className="col-span-1">
                            <input
                              type="hidden"
                              defaultValue={props.profile?.user_entity_id}
                              {...register(
                                'uski_entity_id',
                                handleValidation.uski_entity_id
                              )}
                            />
                            <div className="w-full">
                              <Autocomplete
                                options={skills}
                                getOptionLabel={(option: any) =>
                                  option.skty_name
                                }
                                autoComplete
                                id="combo-box-demo"
                                size="small"
                                includeInputInList
                                onChange={(event: any, value: any) => {
                                  register('uski_skty_name', {
                                    value: value?.skty_name || value,
                                  });
                                }}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    label="Choose Skills"
                                    InputProps={{
                                      ...params.InputProps,
                                    }}
                                  />
                                )}
                              />
                              <span className="text-sm text-red-600">
                                {errors?.uski_skty_name &&
                                  errors.uski_skty_name.message}
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

export default AddSkills;
