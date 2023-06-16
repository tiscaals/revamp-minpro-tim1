import { Dialog, Transition } from '@headlessui/react';
import { Input } from '@material-tailwind/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  doReqAddressType,
  doReqCity,
  doRequestAddAddress,
} from '../../redux/users-schema/action/actionReducer';

const AddAddress = (props: any) => {
  type FormValue = {
    first_address: string;
    second_address: string;
    code_pos: string;
    city_id: string;
    user_id: string;
    address_type_id: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const dispatch = useDispatch();
  const { addr_type }: any = useSelector(
    (state: any) => state.addressTypeReducers
  );
  const { city }: any = useSelector((state: any) => state.cityReducers);

  const handleValidationAddress = {
    first_address: { required: 'first address required' },
    code_pos: { required: 'postal code required' },
    city_id: { required: 'choose your city' },
    user_id: { required: 'id is required' },
    address_type_id: { required: 'choose your type address' },
  };

  const handleAddAddress = async (data: any) => {
    dispatch(doRequestAddAddress(data));
    props.closeModal();
  };

  useEffect(() => {
    dispatch(doReqAddressType());
    dispatch(doReqCity());
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
                    Add Address
                  </Dialog.Title>

                  <div className="border-t-1 border border-black-900 mt-3"></div>
                  <div className="">
                    <form onSubmit={handleSubmit(handleAddAddress)}>
                      <div className=" bg-white py-6  m-auto w-full">
                        <div className="grid grid-cols-1 gap-4  m-auto">
                          <div className="col-span-1">
                            <input
                              type="hidden"
                              defaultValue={props.profile?.user_entity_id}
                              {...register(
                                'user_id',
                                handleValidationAddress.user_id
                              )}
                            />
                            <div className="w-full mt-2 mb-2 relative">
                              <Input
                                label="Add Address 1"
                                type="text"
                                {...register(
                                  'first_address',
                                  handleValidationAddress.first_address
                                )}
                                autoComplete="off"
                              />
                              <span className="text-sm text-red-600">
                                {errors?.first_address &&
                                  errors.first_address.message}
                              </span>
                            </div>
                            <div className="w-full mt-2 mb-2 relative">
                              <Input
                                label="Add Address 2"
                                type="text"
                                {...register('second_address')}
                                autoComplete="off"
                              />
                            </div>
                            <div className="mt-2 mb-2 flex justify-between">
                              <div className="w-full mr-3">
                                <Input
                                  label="Postal Code"
                                  type="text"
                                  {...register(
                                    'code_pos',
                                    handleValidationAddress.code_pos
                                  )}
                                  autoComplete="off"
                                />
                                <span className="text-sm text-red-600">
                                  {errors?.code_pos && errors.code_pos.message}
                                </span>
                              </div>

                              <div className="w-full">
                                <select
                                  className="py-2.5 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  {...register(
                                    'city_id',
                                    handleValidationAddress.city_id
                                  )}
                                >
                                  <option value="">Select City</option>
                                  {Array.isArray(city) &&
                                    city.map((dt: any, index: any) => (
                                      <option key={index} value={dt.city_id}>
                                        {dt.city_name}
                                      </option>
                                    ))}
                                </select>

                                <span className="text-sm text-red-600">
                                  {errors?.city_id && errors.city_id.message}
                                </span>
                              </div>
                            </div>
                            <div className="w-50">
                              <select
                                className="py-2.5 w-80 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                {...register(
                                  'address_type_id',
                                  handleValidationAddress.address_type_id
                                )}
                              >
                                <option value="">Select Address Type</option>
                                {Array.isArray(addr_type) &&
                                  addr_type.map((dt: any, index: any) => (
                                    <option key={index} value={dt.adty_id}>
                                      {dt.adty_name}
                                    </option>
                                  ))}
                              </select>
                              <br />
                              <span className="text-sm text-red-600">
                                {errors?.address_type_id &&
                                  errors.address_type_id.message}
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

export default AddAddress;
