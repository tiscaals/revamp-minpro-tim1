import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Textarea } from '@material-tailwind/react';
import DatePicker from 'react-multi-date-picker';
// import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { BsCalendar3 } from 'react-icons/bs';
import { FaCalendarAlt } from 'react-icons/fa';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import 'react-multi-date-picker/styles/layouts/mobile.css';

const SwitchDetail = (props: any) => {
  type FormValue = {
    startPeriod: Date;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValue>();

  return (
    <>
      <div>
        <Transition appear show={props.show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            static
            onClose={() => null}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
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
                  <Dialog.Panel className="w-full max-w-md relative transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-sms font-semibold text-light-blue-900 leading-6"
                    >
                      ID = {props.data}
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="mb-4">
                        <label className="text-sm">Select Type</label>
                        <select
                          id="selectType"
                          className="text-gray-200 absolute left-28 bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-gray-500 font-sm rounded-md text-sm px-4 py-1"
                          defaultValue="Status"
                        >
                          <option>Status</option>
                          <option value="#">On Bootcamp</option>
                          <option value="#">Idle</option>
                          <option value="#">Trial</option>
                          <option value="#">Placement</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm mr-6">Start Date</label>
                        <DatePicker
                          render={<InputIcon />}
                          className="rmdp-mobile"
                          mobileLabels={{
                            OK: 'Accept',
                            CANCEL: 'Close',
                          }}
                        />
                      </div>
                    </div>
                    <div className="pt-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Notes
                      </label>
                      <textarea
                        id="message"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                      ></textarea>
                    </div>
                    <div className="flex-row space-x-4 mt-4 text-right">
                      <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        Change Status
                      </button>
                      <button
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={props.closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default SwitchDetail;
