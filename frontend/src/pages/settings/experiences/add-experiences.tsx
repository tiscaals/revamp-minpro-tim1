import { Dialog, Transition } from '@headlessui/react';
import { Checkbox, Input, Textarea } from '@material-tailwind/react';
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  doReqCity,
  doRequestAddExperiences,
} from '../../redux/users-schema/action/actionReducer';

const AddExperiences = (props: any) => {
  type FormValue = {
    usex_entity_id: any;
    usex_title: string;
    usex_profile_headline: string;
    usex_employment_type: string;
    usex_company_name: string;
    usex_is_current: any;
    usex_start_date: Date;
    usex_end_date: Date | null;
    usex_industry: string;
    usex_description: string;
    usex_experience_type: string;
    usex_city_id: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const dispatch = useDispatch();
  const { city }: any = useSelector((state: any) => state.cityReducers);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleValidation = {
    usdu_entity_id: { required: 'id required' },
    usex_title: { required: 'title is required' },
    usex_profile_headline: { required: 'profile headline required' },
    usex_employment_type: { required: 'employment type required' },
    usex_company_name: { required: 'company name required' },
    usex_start_date: { required: 'start date is required' },
    usex_description: { required: 'description is required' },
    usex_experience_type: { required: 'experiences type is required' },
    usex_city_id: { required: 'city id required' },
  };

  const handleAddExperiences = async (data: any) => {
    let usex_is_current;
    if (data.usex_is_current) {
      usex_is_current = 1;
    } else {
      usex_is_current = 0;
    }
    const add = {
      usex_entity_id: data.usex_entity_id,
      usex_title: data.usex_title,
      usex_profile_headline: data.usex_profile_headline,
      usex_employment_type: data.usex_employment_type,
      usex_company_name: data.usex_company_name,
      usex_is_current: usex_is_current,
      usex_start_date: data.usex_start_date,
      usex_end_date: data.usex_end_date,
      usex_industry: data.usex_industry,
      usex_description: data.usex_description,
      usex_experience_type: data.usex_experience_type,
      usex_city_id: data.usex_city_id,
    };

    dispatch(doRequestAddExperiences(add));
    props.closeModal();
  };

  useEffect(() => {
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
                    Add Experiences
                  </Dialog.Title>

                  <div className="border-t-1 border border-black-900 mt-3"></div>
                  <div className="">
                    <form onSubmit={handleSubmit(handleAddExperiences)}>
                      <div className=" bg-white py-6  m-auto w-full">
                        <div className="grid grid-cols-1 gap-4  m-auto">
                          <div className="col-span-1">
                            <input
                              type="hidden"
                              defaultValue={props.profile?.user_entity_id}
                              {...register('usex_entity_id')}
                            />
                            <div className="w-full mt-2 mb-2 relative">
                              <Input
                                label="Title"
                                type="text"
                                {...register(
                                  'usex_title',
                                  handleValidation.usex_title
                                )}
                                autoComplete="off"
                              />
                              <span className="text-sm text-red-600">
                                {errors?.usex_title &&
                                  errors.usex_title.message}
                              </span>
                            </div>
                            <div className="w-full mt-2 mb-2 relative">
                              <Input
                                label="Headline"
                                type="text"
                                {...register(
                                  'usex_profile_headline',
                                  handleValidation.usex_profile_headline
                                )}
                                autoComplete="off"
                              />
                              <span className="text-sm text-red-600">
                                {errors?.usex_profile_headline &&
                                  errors.usex_profile_headline.message}
                              </span>
                            </div>
                            <div className="mt-2 mb-2 flex justify-between">
                              <div className="w-full mr-3">
                                <label
                                  htmlFor="Degree"
                                  className="block text-xs text-gray-700 mb-1"
                                >
                                  City
                                </label>
                                <select
                                  className="py-2.5 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  {...register(
                                    'usex_city_id',
                                    handleValidation.usex_city_id
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
                                  {errors?.usex_city_id &&
                                    errors.usex_city_id.message}
                                </span>
                              </div>

                              <div className="w-full mt-5">
                                <Input
                                  label="Company"
                                  type="text"
                                  {...register(
                                    'usex_company_name',
                                    handleValidation.usex_company_name
                                  )}
                                  autoComplete="off"
                                />
                                <span className="text-sm text-red-600">
                                  {errors?.usex_company_name &&
                                    errors.usex_company_name.message}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 mb-2 flex justify-between">
                              <div className="w-full mr-3">
                                <Input
                                  label="Start"
                                  type="date"
                                  {...register(
                                    'usex_start_date',
                                    handleValidation.usex_start_date
                                  )}
                                />
                                <span className="text-sm text-red-600">
                                  {errors?.usex_start_date &&
                                    errors.usex_start_date.message}
                                </span>
                              </div>

                              <div className="w-full">
                                <Input
                                  label="End"
                                  type="date"
                                  {...register('usex_end_date')}
                                />
                              </div>

                              <div className="w-full text-sm">
                                <Checkbox
                                  label="Until Now"
                                  {...register('usex_is_current')}
                                  checked={isChecked}
                                  onChange={handleCheckboxChange}
                                />
                              </div>
                            </div>
                            <div className="w-full mt-2 mb-2 relative">
                              <Input
                                label="Industry"
                                type="text"
                                {...register('usex_industry')}
                                autoComplete="off"
                              />
                            </div>

                            <div className="mt-2 mb-2 flex justify-between">
                              <div className="w-full mr-3">
                                <label
                                  htmlFor="employtype"
                                  className="block text-xs text-gray-700 mb-1"
                                >
                                  Employe Type
                                </label>
                                <select
                                  className="py-2.5 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  {...register(
                                    'usex_employment_type',
                                    handleValidation.usex_employment_type
                                  )}
                                >
                                  <option value="">Select Type</option>
                                  <option value="fulltime">Fulltime</option>
                                  <option value="freelance">Freelance</option>
                                </select>

                                <span className="text-sm text-red-600">
                                  {errors?.usex_employment_type &&
                                    errors.usex_employment_type.message}
                                </span>
                              </div>
                              <div className="w-full mr-3">
                                <label
                                  htmlFor="experiencetype"
                                  className="block text-xs text-gray-700 mb-1"
                                >
                                  Experience Type
                                </label>
                                <select
                                  className="py-2.5 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  {...register(
                                    'usex_experience_type',
                                    handleValidation.usex_experience_type
                                  )}
                                >
                                  <option value="">Select Type</option>
                                  <option value="company">Company</option>
                                  <option value="certified">Certified</option>
                                  <option value="voluntering">
                                    Voluntering
                                  </option>
                                  <option value="organization">
                                    Organization
                                  </option>
                                  <option value="reward">Reward</option>
                                </select>

                                <span className="text-sm text-red-600">
                                  {errors?.usex_experience_type &&
                                    errors.usex_experience_type.message}
                                </span>
                              </div>
                            </div>

                            <div className="w-full mt-2 mb-2 relative">
                              <Textarea
                                label="Description"
                                {...register(
                                  'usex_description',
                                  handleValidation.usex_description
                                )}
                                autoComplete="off"
                              />
                              <span className="text-sm text-red-600">
                                {errors?.usex_description &&
                                  errors.usex_description.message}
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

export default AddExperiences;
