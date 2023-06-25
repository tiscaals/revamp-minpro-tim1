import { Dialog, Transition } from '@headlessui/react';
import { Button, Input, Textarea } from '@material-tailwind/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { doRequestUpdateEducation } from '@/pages/redux/users-schema/action/actionReducer';

const EditEducation = (props: any) => {
  type FormValue = {
    usdu_id: string;
    usdu_school: string;
    usdu_degree: string;
    usdu_field_study: string;
    usdu_start_date: Date;
    usdu_end_date: Date;
    usdu_grade: string;
    usdu_activities: string;
    usdu_description: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const dispatch = useDispatch();
  const startDate = moment(props.selectedEducation.usdu_start_date).format(
    'YYYY-MM-DD'
  );
  const endDate = moment(props.selectedEducation.usdu_end_date).format(
    'YYYY-MM-DD'
  );

  const handleValidationEducation = {
    usdu_id: { required: 'id required' },
    usdu_school: { required: 'school is required' },
    usdu_degre: { required: 'choose your degree' },
    usdu_field_study: { required: 'field study is required' },
    usdu_start_date: { required: 'start date required' },
    usdu_end_date: { required: 'end data required' },
    usdu_grade: {
      required: 'grade data required',
      maxLength: { value: 5, message: 'grade maximum length is 5 characters' },
    },
    usdu_activities: {
      maxLength: {
        value: 512,
        message: 'activities maximum length is 512 characters',
      },
    },
    usdu_description: {
      maxLength: {
        value: 512,
        message: 'description maximum length is 512 characters',
      },
    },
  };

  const handleUpdateEducation = async (data: any) => {
    dispatch(doRequestUpdateEducation(data));
    props.closeModal();
  };

  useEffect(() => {}, [handleUpdateEducation]);

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
                    Edit Education
                  </Dialog.Title>

                  <div className="border-t-1 border border-black-900 mt-3"></div>
                  <div className="">
                    <form onSubmit={handleSubmit(handleUpdateEducation)}>
                      <div className=" bg-white py-6  m-auto w-full">
                        <div className="grid grid-cols-1 gap-4  m-auto">
                          <div className="col-span-1">
                            <input
                              type="hidden"
                              defaultValue={props.selectedEducation.usdu_id}
                              {...register('usdu_id')}
                            />
                            <div className="w-full mt-2 mb-2 relative">
                              <Input
                                label="School"
                                type="text"
                                {...register(
                                  'usdu_school',
                                  handleValidationEducation.usdu_school
                                )}
                                defaultValue={
                                  props.selectedEducation.usdu_school
                                }
                                autoComplete="off"
                              />
                              <span className="text-sm text-red-600">
                                {errors?.usdu_school &&
                                  errors.usdu_school.message}
                              </span>
                            </div>
                            <div className="w-full mt-2 mb-2 relative">
                              <Input
                                label="Field Study"
                                type="text"
                                {...register(
                                  'usdu_field_study',
                                  handleValidationEducation.usdu_field_study
                                )}
                                defaultValue={
                                  props.selectedEducation.usdu_field_study
                                }
                                autoComplete="off"
                              />
                              <span className="text-sm text-red-600">
                                {errors?.usdu_field_study &&
                                  errors.usdu_field_study.message}
                              </span>
                            </div>
                            <div className="mt-2 mb-2 flex justify-between">
                              <div className="w-full mr-3">
                                <label
                                  htmlFor="Degree"
                                  className="block text-xs text-gray-700 mb-1"
                                >
                                  Degree
                                </label>
                                <select
                                  className="py-2.5 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  {...register(
                                    'usdu_degree',
                                    handleValidationEducation.usdu_degre
                                  )}
                                  defaultValue={
                                    props.selectedEducation.usdu_degree
                                  }
                                >
                                  <option value="Bachelor">Bachelor</option>
                                  <option value="Diploma">Diploma</option>
                                </select>

                                <span className="text-sm text-red-600">
                                  {errors?.usdu_degree &&
                                    errors.usdu_degree.message}
                                </span>
                              </div>

                              <div className="w-full mt-5">
                                <Input
                                  label="Grade"
                                  type="text"
                                  {...register(
                                    'usdu_grade',
                                    handleValidationEducation.usdu_grade
                                  )}
                                  defaultValue={
                                    props.selectedEducation.usdu_grade
                                  }
                                  autoComplete="off"
                                />
                                <span className="text-sm text-red-600">
                                  {errors?.usdu_grade &&
                                    errors.usdu_grade.message}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 mb-2 flex justify-between">
                              <div className="w-full mr-3">
                                <Input
                                  label="Start"
                                  type="date"
                                  defaultValue={startDate}
                                  {...register(
                                    'usdu_start_date',
                                    handleValidationEducation.usdu_start_date
                                  )}
                                />
                                <span className="text-sm text-red-600">
                                  {errors?.usdu_start_date &&
                                    errors.usdu_start_date.message}
                                </span>
                              </div>

                              <div className="w-full">
                                <Input
                                  label="End"
                                  type="date"
                                  {...register(
                                    'usdu_end_date',
                                    handleValidationEducation.usdu_end_date
                                  )}
                                  defaultValue={endDate}
                                />
                                <span className="text-sm text-red-600">
                                  {errors?.usdu_end_date &&
                                    errors.usdu_end_date.message}
                                </span>
                              </div>
                            </div>
                            <div className="w-full mt-2 mb-2 relative">
                              <Textarea
                                label="Activies"
                                {...register(
                                  'usdu_activities',
                                  handleValidationEducation.usdu_activities
                                )}
                                defaultValue={
                                  props.selectedEducation.usdu_activities
                                }
                                autoComplete="off"
                              />
                              <span className="text-sm text-red-600">
                                {errors?.usdu_activities &&
                                  errors.usdu_activities.message}
                              </span>
                            </div>
                            <div className="w-full mt-2 mb-2 relative">
                              <Textarea
                                label="Description"
                                {...register(
                                  'usdu_description',
                                  handleValidationEducation.usdu_description
                                )}
                                defaultValue={
                                  props.selectedEducation.usdu_description
                                }
                                autoComplete="off"
                              />
                              <span className="text-sm text-red-600">
                                {errors?.usdu_description &&
                                  errors.usdu_description.message}
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

export default EditEducation;
