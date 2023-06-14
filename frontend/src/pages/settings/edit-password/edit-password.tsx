import { Dialog, Transition } from '@headlessui/react';
import { Input } from '@material-tailwind/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { doRequestUpdatePassword } from '../../redux/users-schema/action/actionReducer';

const EditPassword = (props: any) => {
  type FormValue = {
    user_entity_id: any;
    current_password: string;
    new_password: string;
    re_password: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const dispatch = useDispatch();

  const editPasswordValidation = {
    user_entity_id: { required: 'id required' },
    current_password: { required: 'current password is required' },
    new_password: { required: 'username is required' },
    re_password: {
      required: 'confirm password is required',
      validate: (value: string) =>
        value === watch('new_password') || 'passwords do not match',
    },
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEditPassword = async (data: any) => {
    dispatch(doRequestUpdatePassword(data));
    props.closeModal();
  };

  useEffect(() => {}, [handleEditPassword]);

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
                    Edit Password
                  </Dialog.Title>

                  <div className="border-t-1 border border-black-900 mt-3"></div>
                  <div className="">
                    <form onSubmit={handleSubmit(handleEditPassword)}>
                      <div className=" bg-white py-6  m-auto w-full">
                        <div className="grid grid-cols-1 gap-4  m-auto">
                          <div className="col-span-1">
                            <input
                              type="hidden"
                              defaultValue={props.profile.user_entity_id}
                              {...register(
                                'user_entity_id',
                                editPasswordValidation.user_entity_id
                              )}
                            />
                            <div className="w-full mt-2 mb-2 relative">
                              <Input
                                label="Current Password"
                                type={showPassword ? 'text' : 'password'}
                                {...register(
                                  'current_password',
                                  editPasswordValidation.current_password
                                )}
                              />
                              <button
                                type="button"
                                className="absolute top-1 right-2 text-black-500"
                                onClick={handleTogglePassword}
                                style={{
                                  fontSize: '1.5rem',
                                  marginTop: '0.375rem',
                                }}
                              >
                                {showPassword ? (
                                  <AiFillEyeInvisible />
                                ) : (
                                  <AiFillEye />
                                )}
                              </button>
                              <span className="text-sm text-red-600">
                                {errors?.current_password &&
                                  errors.current_password.message}
                              </span>
                            </div>
                            <div className="w-full mt-2 mb-2 relative">
                              <Input
                                label="New Password"
                                type={showPassword ? 'text' : 'password'}
                                {...register(
                                  'new_password',
                                  editPasswordValidation.new_password
                                )}
                              />
                              <button
                                type="button"
                                className="absolute top-1 right-2 text-black-500"
                                onClick={handleTogglePassword}
                                style={{
                                  fontSize: '1.5rem',
                                  marginTop: '0.375rem',
                                }}
                              >
                                {showPassword ? (
                                  <AiFillEyeInvisible />
                                ) : (
                                  <AiFillEye />
                                )}
                              </button>
                              <span className="text-sm text-red-600">
                                {errors?.new_password &&
                                  errors.new_password.message}
                              </span>
                            </div>
                            <div className="w-full mt-2 mb-2 relative">
                              <Input
                                label="Re-Type Password"
                                type={showPassword ? 'text' : 'password'}
                                {...register(
                                  're_password',
                                  editPasswordValidation.re_password
                                )}
                              />
                              <button
                                type="button"
                                className="absolute top-1 right-2 text-black-500"
                                onClick={handleTogglePassword}
                                style={{
                                  fontSize: '1.5rem',
                                  marginTop: '0.375rem',
                                }}
                              >
                                {showPassword ? (
                                  <AiFillEyeInvisible />
                                ) : (
                                  <AiFillEye />
                                )}
                              </button>
                              <span className="text-sm text-red-600">
                                {errors?.re_password &&
                                  errors.re_password.message}
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

export default EditPassword;
