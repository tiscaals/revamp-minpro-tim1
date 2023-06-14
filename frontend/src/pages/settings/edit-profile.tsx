import { Dialog, Transition } from '@headlessui/react';
import { Input } from '@material-tailwind/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DefaultImage from '../../../public/img/default.jpg';
import { useDispatch } from 'react-redux';
import { doRequestUpdateProfile } from '../redux/users-schema/action/actionReducer';

const EditProfile = (props: any) => {
  type FormValue = {
    user_entity_id: any;
    user_name: string;
    user_first_name: string;
    user_last_name: string;
    user_birth_date: any;
    user_photo: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const dispatch = useDispatch();
  const port = 'http://localhost:7300/';

  const editProfileValidation = {
    user_entity_id: { required: 'id required' },
    user_name: { required: 'username is required' },
  };

  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);
  const [selectedPhotoURL, setSelectedPhotoURL] = useState(
    props.profile.user_photo
      ? `${port}${props.profile.user_photo}`
      : DefaultImage.src
  );

  const handlePhotoSelection = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e: any) {
      setSelectedPhotoFile(file);
      setSelectedPhotoURL(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleEditProfile = async (data: any) => {
    const formData = new FormData();
    formData.append('user_entity_id', data.user_entity_id);
    formData.append('user_name', data.user_name);
    formData.append('user_first_name', data.user_first_name);
    formData.append('user_last_name', data.user_last_name);
    formData.append('user_birth_date', data.user_birth_date);

    if (selectedPhotoFile) {
      formData.append('user_photo', selectedPhotoFile);
    } else if (!selectedPhotoFile) {
      formData.append('user_photo', '');
    }

    dispatch(doRequestUpdateProfile(formData));

    props.closeModal();
  };

  useEffect(() => {}, [handleEditProfile]);

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
                    Edit Profile
                  </Dialog.Title>

                  <div className="border-t-1 border border-black-900 mt-3"></div>
                  <div className="">
                    <form onSubmit={handleSubmit(handleEditProfile)}>
                      <div className=" bg-white py-6  m-auto w-full">
                        <div className="grid grid-cols-1 gap-4  m-auto">
                          <div className="col-span-1">
                            <input
                              type="hidden"
                              defaultValue={props.profile.user_entity_id}
                              {...register(
                                'user_entity_id',
                                editProfileValidation.user_entity_id
                              )}
                            />
                            <div className="w-full mt-2 mb-2">
                              <Input
                                label="Username"
                                defaultValue={props.profile.user_name}
                                {...register(
                                  'user_name',
                                  editProfileValidation.user_name
                                )}
                              />
                              <span className="text-sm text-red-600">
                                {errors?.user_name && errors.user_name.message}
                              </span>
                            </div>
                            <div className="flex flex-wrap ">
                              <div className="w-full lg:w-1/2 flex mb-2 lg:mb-0">
                                <Input
                                  label="Firstname"
                                  defaultValue={props.profile.user_first_name}
                                  {...register('user_first_name')}
                                />
                              </div>
                              <div className=" w-full lg:w-1/2 flex ">
                                <Input
                                  label="Lastname"
                                  defaultValue={props.profile.user_last_name}
                                  {...register('user_last_name')}
                                />
                              </div>
                            </div>

                            <div className="w-full mt-2 mb-2">
                              <Input
                                label="Birthdate"
                                type="date"
                                defaultValue={props.profile.user_birth_date}
                                {...register('user_birth_date')}
                              />
                            </div>
                            <div className="lg:mt-3 sm:mt-8">
                              <div className="shrink-0">
                                {selectedPhotoURL ? (
                                  <img
                                    src={selectedPhotoURL}
                                    alt="Current profile photo"
                                    className="h-16 w-25 object-cover rounded-full mb-3"
                                  />
                                ) : (
                                  <img
                                    src={DefaultImage.src}
                                    alt="Default profile photo"
                                    className="h-16 w-25 object-cover rounded-full mb-3"
                                  />
                                )}
                              </div>
                              <label className="block">
                                <span className="sr-only">
                                  Choose profile photo
                                </span>
                                <input
                                  type="file"
                                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-700 hover:file:bg-violet-100"
                                  {...register('user_photo')}
                                  onChange={handlePhotoSelection}
                                />
                              </label>
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

export default EditProfile;
