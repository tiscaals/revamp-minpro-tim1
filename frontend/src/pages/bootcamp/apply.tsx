import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Logo from '../../images/logo.png';
import DefaultImage from '../../images/default-avatar.jpg';
import { Button } from '@material-tailwind/react';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {
  doRequestApplyBootcamp,
  doRequestApplyJob,
  doRequestGetProfile,
} from '@/pages/redux/users-schema/action/actionReducer';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { BsFiletypeDoc } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import MyTimeline from '../bootcamp/components/timeline';

const Apply = () => {
  type FormValue = {
    user_id: any;
    firstname: string;
    lastname: string;
    userphoto: string;
    birthdate: string;
    user_school: string;
    user_degree: string;
    user_field_study: string;
    user_phone_number: string;
    user_resume: string;
    user_filelink: string;
    user_filesize: string;
    user_filetype: string;
    role_id: any;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const router = useRouter();
  const dispatch = useDispatch();
  const port = 'http://localhost:7300/images/user-image/';
  const { profile, refresh, status, message }: any = useSelector(
    (state: any) => state.settingReducers
  );

  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);
  const [selectedPhotoURL, setSelectedPhotoURL] = useState('');
  // const [selectedPhotoURL, setSelectedPhotoURL] = useState(
  //   profile?.user_photo ? `${port}${profile?.user_photo}` : DefaultImage.src
  // );
  const { id } = router.query;

  const handlePhotoSelection = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e: any) {
      setSelectedPhotoFile(file);
      setSelectedPhotoURL(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (profile && profile.user_photo) {
      setSelectedPhotoURL(`${port}${profile.user_photo}`);
    } else {
      setSelectedPhotoURL(DefaultImage.src);
    }
  }, [profile, port, id]);

  const handleValidation = {
    user_id: { required: 'user_id is required' },
    firstname: { required: 'firstname is required' },
    lastname: { required: 'lastname is required' },
    userphoto: { required: 'userphoto is required' },
    birthdate: { required: 'birthdate is required' },
    user_school: { required: 'school or university is required' },
    user_degree: { required: 'education is required' },
    user_field_study: { required: 'field study is required' },
    user_phone_number: { required: 'field phone number' },
    user_resume: { required: 'resume required' },
    user_filelink: { required: 'file link required' },
    user_filesize: { required: 'file size required' },
    user_filetype: { required: 'file type required' },
    role_id: { required: 'role id required' },
  };

  const handleApply = async (data: any) => {
    console.log(data);
    try {
      const result = await Swal.fire({
        title: 'Apply Confirmation',
        text: `check your data again before registering`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Apply',
      });

      if (result.isConfirmed) {
        const formData: any = new FormData();
        formData.append('user_id', profile?.user_entity_id);
        formData.append('firstname', data.firstname);
        formData.append('lastname', data.lastname);

        if (selectedPhotoFile) {
          formData.append('userphoto', selectedPhotoFile);
        } else if (!selectedPhotoFile) {
          formData.append('userphoto', '');
        }

        formData.append('birthdate', data.birthdate);
        formData.append('user_school', data.user_school);
        formData.append('user_degree', data.user_degree);
        formData.append('user_field_study', data.user_field_study);
        formData.append('user_phone_number', profile?.user_phone_number);
        formData.append('user_resume', data.user_resume[0]);
        formData.append('user_filesize', data.user_resume[0].size);
        let type = data.user_resume[0]?.type;
        let fileType = type?.split('/')[1];
        formData.append('user_filetype', fileType);
        formData.append('role_id', 10);
        formData.append('prap_prog_entity_id', 1);

        console.log('ApplyJobs', ...formData);
        console.log('dataAply', data);

        dispatch(doRequestApplyBootcamp(formData));
        router.push('/bootcamp/confirm');
      }
    } catch (error) {
      console.error('Apply Error:', error);
    }
  };

  //Decode Token
  let decoded: any;
  const token = Cookies.get('access_token');
  //End

  useEffect(() => {
    if (token) {
      try {
        decoded = jwt.decode(token) as JwtPayload;
        dispatch(doRequestGetProfile(decoded.user_entity_id));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('tokens not found');
    }
  }, [refresh, profile?.user_photo]);

  return (
    <div className="grid place-items-center mx-2 sm:my-auto">
      <div className="w-full px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
        <div className="flex justify-center items-center">
          <img className="w-40" src={Logo.src} alt="Logo" />
        </div>

        <h2 className="text-center font-bold uppercase text-2xl lg:text-2xl text-blue-800">
          Apply Bootcamp
        </h2>

        <form
          className="mt-10 grid grid-rows-1 lg:grid-cols-3 gap-16"
          onSubmit={handleSubmit(handleApply)}
        >
          <div className="col-span-2 px-8">
            <div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">
                  Firstname
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  autoComplete="off"
                  className="block w-full py-2 px-1 text-black appearance-none border-b-2 border-black-800 focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                  defaultValue={profile?.user_first_name || ''}
                  {...register('firstname', handleValidation.firstname)}
                />
                <span className="text-sm text-red-600">
                  {errors?.firstname && errors.firstname.message}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 mt-2">
                  Lastname
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  autoComplete="off"
                  className="block w-full py-2 px-1 text-black appearance-none border-b-2 border-black-800 focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                  defaultValue={profile?.user_last_name || ''}
                  {...register('lastname', handleValidation.lastname)}
                />
                <span className="text-sm text-red-600">
                  {errors?.lastname && errors.lastname.message}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mt-2 mb-1">
                  School or University
                </label>
                <input
                  type="text"
                  placeholder="School or University"
                  autoComplete="off"
                  className="block w-full py-2 px-1 text-black appearance-none border-b-2 border-black-800 focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                  defaultValue={
                    (profile?.users_educations &&
                      profile.users_educations[0]?.usdu_school) ||
                    ''
                  }
                  {...register('user_school', handleValidation.user_school)}
                />
                <span className="text-sm text-red-600">
                  {errors?.user_school && errors.user_school.message}
                </span>
              </div>

              <div>
                <label
                  htmlFor=""
                  className="block text-xs font-semibold text-gray-600 uppercase mt-2 mb-1"
                >
                  Education
                </label>
                <div className="form-control">
                  <select
                    className="select select-bordere border-gray-400 bg-white text-black"
                    defaultValue={
                      (profile?.users_educations &&
                        profile.users_educations[0]?.usdu_degree) ||
                      ''
                    }
                    {...register('user_degree', handleValidation.user_degree)}
                  >
                    <option value="">Choose Education</option>
                    <option
                      value="Bachelor"
                      selected={
                        profile?.users_educations &&
                        profile.users_educations[0]?.usdu_degree === 'Bachelor'
                      }
                    >
                      Bachelor
                    </option>
                    <option
                      value="Diploma"
                      selected={
                        profile?.users_educations &&
                        profile.users_educations[0]?.usdu_degree === 'Diploma'
                      }
                    >
                      Diploma
                    </option>
                  </select>
                </div>
                <span className="text-sm text-red-600">
                  {errors?.user_degree && errors.user_degree.message}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mt-2 mb-1">
                  Field Study
                </label>
                <input
                  type="text"
                  placeholder="Field Study"
                  autoComplete="off"
                  className="block w-full py-2 px-1 text-black appearance-none border-b-2 border-black-800 focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                  defaultValue={
                    (profile?.users_educations &&
                      profile.users_educations[0]?.usdu_field_study) ||
                    ''
                  }
                  {...register(
                    'user_field_study',
                    handleValidation.user_field_study
                  )}
                />
                <span className="text-sm text-red-600">
                  {errors?.user_field_study && errors.user_field_study.message}
                </span>
              </div>

              <div>
                <label
                  htmlFor=""
                  className="block w-full py-2 px-1 text-xs font-semibold text-gray-600 uppercase"
                >
                  BirthDay
                </label>
                <div className="flex flex-col lg:flex-row">
                  <input
                    type="date"
                    defaultValue={profile?.user_birth_date}
                    {...register('birthdate', handleValidation.birthdate)}
                    className="bg-white text-black focus:text-gray-500 focus:outline-none border-b-2 w-full"
                  />
                </div>
                <span className="text-sm text-red-600">
                  {errors?.birthdate && errors.birthdate.message}
                </span>
              </div>

              <div className="mt-5">
                <label
                  htmlFor=""
                  className="block text-xs font-semibold text-gray-600 uppercase mt-1 mb-2"
                >
                  Resume
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-700 hover:file:bg-violet-100"
                  defaultValue={
                    (profile?.users_media &&
                      profile.users_medias[0].usme_filename) ||
                    ''
                  }
                  disabled={profile?.user_current_role !== 2}
                  {...register('user_resume', handleValidation.user_resume)}
                />

                <span className="text-sm text-red-600">
                  {errors?.user_resume && errors.user_resume.message}
                </span>

                <div className="my-8">
                  {profile?.users_medias &&
                    profile?.users_medias.length > 0 && (
                      <Link
                        href={profile.users_medias[0].usme_file_link || ''}
                        className="bg-blue-700 text-white text-sm py-2 px-4 rounded-md flex items-center w-fit"
                        target="_blank"
                      >
                        <BsFiletypeDoc className="mr-2" />
                        Resume
                      </Link>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col justify-center">
              <div className="shrink-0 mx-auto">
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
                <span className="sr-only">Choose profile photo</span>
              </label>
              <input
                accept="image/png, image/jpeg, image/jpg"
                type="file"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-700 hover:file:bg-violet-100"
                disabled={profile?.user_current_role !== 2}
                {...register('userphoto', handleValidation.userphoto)}
                onChange={handlePhotoSelection}
              />
              <span className="text-sm text-red-600">
                {errors?.userphoto && errors.userphoto.message}
              </span>
              <br />
            </div>
            <MyTimeline />
          </div>
          <Button
            onClick={() => router.push('/')}
            className="lg:py-3 lg:px-16 md:px-12 sm:px-8 mt-4 sm:mt-0 bg-blue-800 rounded-sm
                        font-medium text-white uppercase text-center text-xs
                        focus:outline-none hover:bg-blue-700 hover:shadow-none"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="lg:py-3lg:px-16 md:px-12 sm:px-8 mt-4 sm:mt-0 bg-blue-800 rounded-sm
                        font-medium text-white uppercase
                        focus:outline-none hover:bg-blue-700 hover:shadow-none disabled:bg-red-900"
            disabled={profile?.user_current_role !== 2}
          >
            {profile?.user_current_role !== 2 ? 'You are registered' : 'Apply'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Apply;
