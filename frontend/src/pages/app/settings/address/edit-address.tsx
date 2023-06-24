import {
  doRequestUpdateAddress,
  doReqAddressType,
  doReqCity,
} from '@/pages/redux/users-schema/action/actionReducer';
import { Dialog, Transition } from '@headlessui/react';
import { Button, Input } from '@material-tailwind/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const EditAddress = (props: any) => {
  type FormValue = {
    address_id: string;
    first_address: string;
    second_address: string;
    code_pos: string;
    city_id: string;
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
    address_id: { required: 'id is required' },
    first_address: { required: 'first address required' },
    code_pos: { required: 'postal code required' },
    city_id: { required: 'choose your city' },
    address_type_id: { required: 'choose your type address' },
  };

  const handleUpdateAddress = async (data: any) => {
    dispatch(doRequestUpdateAddress(data));
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
                    Edit Address
                  </Dialog.Title>

                  <div className="border-t-1 border border-black-900 mt-3"></div>
                  <div className="">
                    <form onSubmit={handleSubmit(handleUpdateAddress)}>
                      <div className=" bg-white py-6  m-auto w-full">
                        <div className="grid grid-cols-1 gap-4  m-auto">
                          <div className="col-span-1">
                            <input
                              type="hidden"
                              defaultValue={props.selectedAddress?.addr_id}
                              {...register(
                                'address_id',
                                handleValidationAddress.address_id
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
                                defaultValue={
                                  props.selectedAddress?.addr_line1 || ''
                                }
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
                                defaultValue={
                                  props.selectedAddress?.addr_line2 || ''
                                }
                              />
                            </div>
                            <div className="mt-2 mb-2 flex justify-between">
                              <div className="w-full mr-3 mt-5">
                                <Input
                                  label="Postal Code"
                                  type="text"
                                  {...register(
                                    'code_pos',
                                    handleValidationAddress.code_pos
                                  )}
                                  defaultValue={
                                    props.selectedAddress?.addr_postal_code ||
                                    ''
                                  }
                                  autoComplete="off"
                                />
                                <span className="text-sm text-red-600">
                                  {errors?.code_pos && errors.code_pos.message}
                                </span>
                              </div>

                              <div className="w-full">
                                <label
                                  htmlFor="city"
                                  className="block text-sm text-gray-700"
                                >
                                  City
                                </label>
                                <select
                                  className="py-2.5 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  {...register(
                                    'city_id',
                                    handleValidationAddress.city_id
                                  )}
                                >
                                  {Array.isArray(city) &&
                                    city.map((dt: any, index: any) => (
                                      <option
                                        key={index}
                                        value={dt.city_id}
                                        selected={
                                          props.selectedAddress?.city
                                            .city_name === dt.city_name
                                        }
                                      >
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
                              <label
                                htmlFor="city"
                                className="block text-sm text-gray-700"
                              >
                                Address Type
                              </label>
                              <select
                                className="py-2.5 w-80 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                {...register(
                                  'address_type_id',
                                  handleValidationAddress.address_type_id
                                )}
                              >
                                {Array.isArray(addr_type) &&
                                  addr_type.map((dt: any, index: any) => (
                                    <option
                                      key={index}
                                      value={dt.adty_id}
                                      selected={
                                        props.selectedAddressType?.adty_name ===
                                        dt.adty_name
                                      }
                                    >
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

export default EditAddress;
