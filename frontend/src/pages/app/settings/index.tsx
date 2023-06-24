import image from '../../../images/default-avatar.jpg';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { useDispatch, useSelector } from 'react-redux';
import { BsPencilFill, BsPlusCircleFill, BsTrash3Fill } from 'react-icons/bs';
import EditProfile from './edit-profile/edit-profile';
import { ToastContainer, toast } from 'react-toastify';
import EditPassword from './edit-password/edit-password';
import { Button, Typography } from '@material-tailwind/react';
import AddEmail from './email/add-email';
import Swal from 'sweetalert2';
import EditEmail from './email/edit-email';
import AddPhoneNumber from './phone-number/add-phone';
import EditPhoneNumber from './phone-number/edit-phone';
import AddAddress from './address/add-address';
import EditAddress from './address/edit-address';
import AddEducation from './education/add-education';
import EditEducation from './education/edit-education';
import AddExperiences from './experiences/add-experiences';
import EditExperiences from './experiences/edit-experience';
import AddSkills from './skills/add-skills';
import { notifySuccess, notifyFailed } from '@/pages/alert';
import {
  doRequestDeleteEmail,
  doRequestDeletePhone,
  doRequestDeleteAddress,
  doRequestDeleteEducation,
  doRequestDeleteExperiences,
  doRequestDeleteSkills,
  doRequestGetProfile,
} from '@/pages/redux/users-schema/action/actionReducer';
import BreadcrumbsSlice from '@/pages/shared/breadcrumbs';

const Settings = (props: any) => {
  // Var Core
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile, refresh, status, message }: any = useSelector(
    (state: any) => state.settingReducers
  );
  // End Var Core

  //Start State
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);

  const [isAddEmail, setIsAddEmail] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const [isAddPhoneNumber, setIsAddPhoneNumber] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [selectedPontyCode, setSelectedPontyCode] = useState(null);
  const [isEditPhoneNumber, setIsEditPhoneNumber] = useState(false);

  const [isAddAddress, setIsAddAddress] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressType, setSelectedAddressType] = useState(null);

  const [isAddEducation, setIsAddEducation] = useState(false);
  const [isEditEducation, setIsEditEducation] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  const [isAddExperiences, setIsAddExperiences] = useState(false);
  const [isEditExperiences, setIsEditExperiences] = useState(false);
  const [selectedExperiences, setSelectedExperiences] = useState(null);

  const [isAddSkills, setIsAddSkills] = useState(false);
  // End State

  // Get Date By Year For Page Education
  const educationYear =
    profile?.users_educations && profile?.users_educations[0];

  const startDate = educationYear?.usdu_start_date
    ? new Date(educationYear.usdu_start_date)
    : null;

  const endDate = educationYear?.usdu_end_date
    ? new Date(educationYear.usdu_end_date)
    : null;

  const startYear = startDate ? startDate.getFullYear() : null;
  const endYear = endDate ? endDate.getFullYear() : null;
  //End

  // Handle Delete Email
  const handleDeleteEmail = async (id: any, email: any) => {
    try {
      const result = await Swal.fire({
        title: 'email delete confirmation',
        text: `are you sure to delete the selected emails? ${email}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        dispatch(doRequestDeleteEmail(id));
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  // End Handle Delete Email

  // Handle Delete Phone Number
  const handleDeletePhone = async (phone_number: any) => {
    try {
      const result = await Swal.fire({
        title: 'phone number delete confirmation',
        text: `are you sure to delete the selected number? ${phone_number}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        dispatch(doRequestDeletePhone(phone_number));
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  // End Handle Delete Phone

  // Handle Delete Address
  const handleDeleteAddress = async (id: any) => {
    try {
      const result = await Swal.fire({
        title: 'address delete confirmation',
        text: `are you sure to delete the selected address?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        dispatch(doRequestDeleteAddress(id));
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  // End Handle Delete Address

  // Handle Delete Education
  const handleDeleteEducation = async (id: any) => {
    try {
      const result = await Swal.fire({
        title: 'education delete confirmation',
        text: `are you sure to delete your education information?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        dispatch(doRequestDeleteEducation(id));
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  // End Handle Delete Education

  // Handle Delete Experiences
  const handleDeleteExperiences = async (id: any) => {
    try {
      const result = await Swal.fire({
        title: 'experiences delete confirmation',
        text: `are you sure to delete your experiences information?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        dispatch(doRequestDeleteExperiences(id));
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  // End Handle Delete Experiences

  // Handle Delete Skills
  const handleDeleteSkills = async (id: any) => {
    try {
      const result = await Swal.fire({
        title: 'skills delete confirmation',
        text: `are you sure to delete your skills?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        dispatch(doRequestDeleteSkills(id));
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  // End Handle Delete Skill

  //Decode Token
  let decoded: any;
  const token = Cookies.get('access_token');
  // End

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

    if (message) {
      setTimeout(() => {
        if (status === 200) {
          notifySuccess('success', message);
        } else if (status == 400) {
          notifyFailed('error', message);
        }
      }, 500);
    }
  }, [refresh]);

  const port = 'http://localhost:7300/images/user-image/';

  return (
    <>
      <BreadcrumbsSlice />
      <ToastContainer />
      {/* Page Profile */}
      <div className="mx-auto bg-white border-b-2 shadow-md overflow-hidden lg:max-w-6xl">
        <div className="pl-8 mt-8 uppercase tracking-wide text-lg text-indigo-500 font-semibold">
          Profile
        </div>
        <div className="md:flex">
          <div className="md:flex-shrink-0 ml-5 mt-5">
            {profile && profile.user_photo ? (
              <img
                src={`${port}${profile.user_photo}`}
                alt={profile.user_photo}
                className="h-48 lg:w-fit object-cover rounded-full w-fit"
              />
            ) : (
              <img
                src={image.src}
                alt={profile && profile.user_photo}
                className="h-48 lg:w-fit object-cover rounded-full w-fit ml-4 mt-2"
              />
            )}
          </div>
          <div className="p-8 flex flex-col">
            <div>
              <div className="font-bold text-xl mb-2">{`${
                profile?.user_first_name ?? ''
              } ${profile?.user_last_name ?? ''}`}</div>

              <div className="mt-2 text-gray-500">
                {profile?.users_roles?.[0]?.role?.role_name ?? ''}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end pr-10 pb-2">
          <Button
            variant="outlined"
            className="font-bold py-2 px-4 rounded flex items-center hover:bg-blue-500 hover:text-white"
            onClick={() => setIsEditProfile(true)}
          >
            <BsPencilFill className="mr-2" />
            <span>Edit</span>
          </Button>
        </div>
        <div className="flex w-full justify-end pr-10 pb-10"></div>
      </div>
      {/* End Page Profile */}

      {/* Page Edit Password */}
      <div className="mx-auto bg-white border-b-2 shadow-md overflow-hidden lg:max-w-6xl">
        <div className="pl-8 mt-8 uppercase tracking-wide text-lg text-indigo-500 font-semibold">
          Edit Password
        </div>
        <div className="md:flex">
          <div className="p-8 flex flex-col">
            <div>
              <Typography variant="h6" className="uppercase">
                Change Password
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end pr-10 pb-2">
          <Button
            variant="outlined"
            className="font-bold py-2 px-4 rounded flex items-center hover:bg-blue-500 hover:text-white"
            onClick={() => setIsEditPassword(true)}
          >
            <BsPencilFill className="mr-2" />
            <span>Edit</span>
          </Button>
        </div>
        <div className="flex w-full justify-end pr-10 pb-10"></div>
      </div>
      {/* End Page Edit Password */}

      {/* Page Email */}
      <div className="mx-auto bg-white border-b-2 shadow-md overflow-hidden lg:max-w-6xl">
        <div className="pl-8 mt-8 uppercase tracking-wide text-lg text-indigo-500 font-semibold">
          Email
          <div className="flex w-full justify-end pr-10 pb-2">
            <Button
              color="blue"
              className="font-bold py-2 px-4 rounded flex items-center"
              onClick={() => setIsAddEmail(true)}
            >
              <BsPlusCircleFill />
              <span className="ml-2">Add</span>
            </Button>
          </div>
        </div>
        <div className="lg:flex">
          <div className="p-8 flex flex-col lg:w-full">
            <div className="mb-5">
              <Typography variant="h6" className="uppercase">
                Your Email :
              </Typography>
            </div>
            <div className="flex flex-col">
              {/* Render each email */}
              {profile?.users_emails &&
                profile.users_emails.length > 0 &&
                profile.users_emails.map((email: any, index: any) => (
                  <div
                    className="flex items-center justify-start"
                    key={email.pmail_id}
                  >
                    <div className="mt-3 border-t border-gray-400 w-1/2">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          {email.pmail_address}
                        </dt>
                      </div>
                    </div>
                    <div className="flex items-center ml-auto mt-4">
                      <div className="flex flex-col lg:flex-row">
                        <Button
                          variant="outlined"
                          className="font-bold py-2 px-4 rounded flex items-center hover:bg-blue-500 hover:text-white mr-2"
                          onClick={() => {
                            setSelectedEmail(email);
                            setIsEditEmail(true);
                          }}
                        >
                          <BsPencilFill className="mr-2" />
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="outlined"
                          className="hover:bg-red-700 text-red-700 border-red-500 hover:text-white font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0"
                          onClick={() => {
                            handleDeleteEmail(
                              email.pmail_id,
                              email.pmail_address
                            );
                          }}
                        >
                          <BsTrash3Fill className="mr-2" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end pr-10 pb-2"></div>
      </div>
      {/* End Page Email */}

      {/* Page Phone */}
      <div className="mx-auto bg-white border-b-2 shadow-md overflow-hidden lg:max-w-6xl">
        <div className="pl-8 mt-8 uppercase tracking-wide text-lg text-indigo-500 font-semibold">
          Phones
          <div className="flex w-full justify-end pr-10 pb-2">
            <Button
              color="blue"
              className="font-bold py-2 px-4 rounded flex items-center"
              onClick={() => setIsAddPhoneNumber(true)}
            >
              <BsPlusCircleFill />
              <span className="ml-2">Add</span>
            </Button>
          </div>
        </div>
        <div className="lg:flex">
          <div className="p-8 flex flex-col lg:w-full">
            <div className="mb-5">
              <Typography variant="h6" className="uppercase">
                Your Phones:
              </Typography>
            </div>
            <div className="flex flex-col">
              {/* For PhoneCellular */}
              {profile?.users_phones &&
                profile.users_phones.length > 0 &&
                profile.users_phones.map((phone: any, index: any) => (
                  <div className="flex items-center justify-start" key={index}>
                    <div className="mt-3 border-t border-gray-400 w-1/2">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-1 sm:gap-1 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          <div className="flex items-center">
                            <span>
                              {phone.uspo_number.replace(
                                /(\d{4})(\d{4})(\d{4})/,
                                '$1-$2-$3'
                              )}
                            </span>
                            {phone.uspo_ponty_code &&
                              phone.uspo_ponty_code.length > 0 && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                                  {phone.uspo_ponty_code}
                                </span>
                              )}
                          </div>
                        </dt>
                      </div>
                    </div>
                    <div className="flex items-center ml-auto">
                      <div className="flex flex-col lg:flex-row">
                        {/* Tombol Edit */}
                        <Button
                          variant="outlined"
                          className="font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0 md:mr-2 hover:text-white hover:bg-blue-500"
                          onClick={() => {
                            setSelectedPhone(phone);
                            setSelectedPontyCode(phone.uspo_ponty_code);
                            setIsEditPhoneNumber(true);
                          }}
                        >
                          <BsPencilFill className="mr-2" />
                          <span>Edit</span>
                        </Button>
                        {/* Tombol Hapus */}
                        <Button
                          variant="outlined"
                          className="hover:bg-red-500 text-red-500 border-red-500 hover:text-white font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0"
                          onClick={() => {
                            handleDeletePhone(phone.uspo_number);
                          }}
                        >
                          <BsTrash3Fill className="mr-2" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              {/* End PhoneCellular */}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end pr-10 pb-2"></div>
      </div>
      {/* End Page Phone */}

      {/* Page Address */}
      <div className="mx-auto bg-white border-b-2 shadow-md overflow-hidden lg:max-w-6xl">
        <div className="pl-8 mt-8 uppercase tracking-wide text-lg text-indigo-500 font-semibold">
          Address
          <div className="flex w-full justify-end pr-10 pb-2">
            <Button
              color="blue"
              className="font-bold py-2 px-4 rounded flex items-center"
              onClick={() => setIsAddAddress(true)}
            >
              <BsPlusCircleFill />
              <span className="ml-2">Add</span>
            </Button>
          </div>
        </div>
        <div className="lg:flex">
          <div className="p-8 flex flex-col lg:w-full">
            <div className="mb-5">
              <Typography variant="h6" className="uppercase">
                Your Address :
              </Typography>
            </div>

            <div className="flex flex-col w-full">
              {/* For Address*/}
              {profile?.users_addresses &&
                profile.users_addresses.length > 0 && (
                  <div>
                    {profile.users_addresses.map((data: any, index: any) => (
                      <div
                        key={index}
                        className="flex items-center justify-start mt-3 w-full"
                      >
                        <div className="mt-3 border-t border-gray-400 w-1/2">
                          <div className="px-4 py-6 sm:grid sm:grid-cols-1 sm:gap-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              {data.address.addr_line1} <br />
                              {data.address.addr_line2} <br />
                              {data.address.city.city_name} -{' '}
                              {data.address.addr_postal_code}
                            </dt>
                          </div>
                        </div>

                        <div className="flex items-center ml-auto">
                          <div className="flex flex-col lg:flex-row">
                            <Button
                              variant="outlined"
                              className="font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0 md:mr-2 hover:bg-blue-500 hover:text-white"
                              onClick={() => {
                                setIsEditAddress(true);
                                setSelectedAddress(data.address);
                                setSelectedAddressType(data.address_type);
                              }}
                            >
                              <BsPencilFill className="mr-2" />
                              <span>Edit</span>
                            </Button>
                            <Button
                              variant="outlined"
                              className="hover:bg-red-500 text-red-500 border-red-500 hover:text-white font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0"
                              onClick={() => {
                                handleDeleteAddress(data.address.addr_id);
                              }}
                            >
                              <BsTrash3Fill className="mr-2" />
                              <span>Delete</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              {/* End Address*/}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end pr-10 pb-2"></div>
      </div>
      {/* End Page Address */}

      {/* Page Education */}
      <div className="mx-auto bg-white border-b-2 shadow-md overflow-hidden lg:max-w-6xl">
        <div className="pl-8 mt-8 uppercase tracking-wide text-lg text-indigo-500 font-semibold">
          Education
          <div className="flex w-full justify-end pr-10 pb-2">
            <Button
              color="blue"
              className="font-bold py-2 px-4 rounded flex items-center"
              onClick={() => setIsAddEducation(true)}
            >
              <BsPlusCircleFill />
              <span className="ml-2">Add</span>
            </Button>
          </div>
        </div>
        {profile?.users_educations && profile.users_educations.length > 0 && (
          <div className="lg:flex">
            <div className="p-8 flex flex-col lg:w-full">
              <div>
                <div className="mt-6 border-t border-gray-400">
                  <dl className="divide-y divide-gray-100">
                    {profile.users_educations.map(
                      (education: any, index: any) => (
                        <div
                          key={index}
                          className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                        >
                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            School
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {education.usdu_school}
                          </dd>

                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Degree
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {education.usdu_degree}
                          </dd>

                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Field Study
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {education.usdu_field_study}
                          </dd>

                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Grade (IPK)
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {education.usdu_grade}
                          </dd>

                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Year
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {startYear} <span>until</span> {endYear}
                          </dd>

                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Activity
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {education.usdu_activities}
                          </dd>

                          <dt className="text-sm font-medium leading-6 text-gray-900">
                            Description
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {education.usdu_description}
                          </dd>
                        </div>
                      )
                    )}
                  </dl>
                </div>
              </div>
              {profile.users_educations.map((education: any, index: any) => (
                <div key={index} className="flex flex-col w-full">
                  <div className="flex items-center justify-start mt-3">
                    <div className="flex items-center ml-auto">
                      <div className="flex flex-col lg:flex-row">
                        <Button
                          variant="outlined"
                          className="font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0 md:mr-2 hover:bg-blue-500 hover:text-white"
                          onClick={() => {
                            setIsEditEducation(true);
                            setSelectedEducation(education);
                          }}
                        >
                          <BsPencilFill className="mr-2" />
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="outlined"
                          className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0"
                          onClick={() => {
                            handleDeleteEducation(education.usdu_id);
                          }}
                        >
                          <BsTrash3Fill className="mr-2" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex w-full justify-end pr-10 pb-2"></div>
      </div>
      {/* End Education */}

      {/* Page Experience */}
      <div className="mx-auto bg-white border-b-2 shadow-md overflow-hidden lg:max-w-6xl">
        <div className="pl-8 mt-8 uppercase tracking-wide text-lg text-indigo-500 font-semibold">
          Experiences
          <div className="flex w-full justify-end pr-10 pb-2">
            <Button
              className="font-bold py-2 px-4 rounded flex items-center"
              onClick={() => setIsAddExperiences(true)}
            >
              <BsPlusCircleFill />
              <span className="ml-2">Add</span>
            </Button>
          </div>
        </div>
        {profile?.users_experiences && profile.users_experiences.length > 0 && (
          <div className="lg:flex">
            {profile.users_experiences.map((experiences: any, index: any) => (
              <div className="p-8 flex flex-col lg:w-full">
                <div key={index}>
                  <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                      {experiences.usex_title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                      {experiences.usex_profile_headline}
                    </p>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                      {format(
                        new Date(experiences.usex_start_date),
                        'MMMM yyyy',
                        { locale: id }
                      )}
                      {experiences.usex_end_date !== null &&
                        ` - ${format(
                          new Date(experiences.usex_end_date),
                          'MMMM yyyy',
                          { locale: id }
                        )}`}

                      {experiences.usex_is_current != 0 && (
                        <span> - Until Now</span>
                      )}
                    </p>

                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                      {experiences.city.city_name}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          {experiences.usex_description}
                        </dt>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  {/* For Button*/}
                  {profile?.users_experiences &&
                    profile.users_experiences.length > 0 && (
                      <div>
                        {profile.users_experiences.map(
                          (data: any, index: any) => (
                            <div
                              key={index}
                              className="flex items-center justify-start mt-3"
                            >
                              <div className="flex items-center ml-auto">
                                <div className="flex flex-col lg:flex-row">
                                  <Button
                                    variant="outlined"
                                    className="font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0 md:mr-2 hover:text-white hover:bg-blue-500"
                                    onClick={() => {
                                      setIsEditExperiences(true);
                                      setSelectedExperiences(data);
                                      // setSelectedAddressType(data.address_type);
                                    }}
                                  >
                                    <BsPencilFill className="mr-2" />
                                    <span>Edit</span>
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    className="border-red-500 hover:bg-red-500 text-red-500 hover:text-white font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0"
                                    onClick={() => {
                                      handleDeleteExperiences(data.usex_id);
                                    }}
                                  >
                                    <BsTrash3Fill className="mr-2" />
                                    <span>Delete</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  {/* End Button*/}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex w-full justify-end pr-10 pb-2"></div>
      </div>
      {/* End Experience */}

      {/* Page Skill */}
      <div className="mx-auto bg-white border-b-2 shadow-md overflow-hidden lg:max-w-6xl">
        <div className="pl-8 mt-8 uppercase tracking-wide text-lg text-indigo-500 font-semibold">
          Skill
          <div className="flex w-full justify-end pr-10 pb-2">
            <Button
              color="blue"
              className="font-bold py-2 px-4 rounded flex items-center"
              onClick={() => setIsAddSkills(true)}
            >
              <BsPlusCircleFill />
              <span className="ml-2">Add</span>
            </Button>
          </div>
        </div>
        <div className="lg:flex">
          <div className="p-8 flex flex-col lg:w-full">
            <div className="mb-5">
              <Typography variant="h6" className="uppercase">
                Your Skill :
              </Typography>
            </div>
            <div className="flex flex-col">
              {profile?.users_skills &&
                profile.users_skills.length > 0 &&
                profile.users_skills.map((skills: any, index: any) => (
                  <div
                    className="flex items-center justify-start"
                    key={skills.uski_id}
                  >
                    <div className="mt-3 border-t border-gray-400 w-1/2">
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          <span className="font-bold uppercase">
                            {index + 1}
                          </span>
                        </dt>
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          <span className="text-sm">
                            {skills.uski_skty_name}
                          </span>
                        </dt>
                      </div>
                    </div>
                    <div className="flex items-center ml-auto mt-4">
                      <div className="flex flex-col lg:flex-row">
                        <Button
                          variant="outlined"
                          className="border-red-500 hover:bg-red-500 hover:text-white text-red-500 font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0"
                          onClick={() => {
                            handleDeleteSkills(skills.uski_id);
                          }}
                        >
                          <BsTrash3Fill className="mr-2" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end pr-10 pb-2"></div>
      </div>
      {/* End Page Skill */}

      {/* Fn Open Modal */}
      <div>
        {isEditProfile ? (
          <EditProfile
            show={isEditProfile}
            profile={profile}
            closeModal={() => setIsEditProfile(false)}
          />
        ) : (
          ''
        )}

        {isEditPassword ? (
          <EditPassword
            show={isEditPassword}
            profile={profile}
            closeModal={() => setIsEditPassword(false)}
          />
        ) : (
          ''
        )}

        {isAddEmail ? (
          <AddEmail
            show={isAddEmail}
            profile={profile}
            closeModal={() => setIsAddEmail(false)}
          />
        ) : (
          ''
        )}

        {isEditEmail ? (
          <EditEmail
            show={isEditEmail}
            profile={profile}
            selectedEmail={selectedEmail}
            closeModal={() => setIsEditEmail(false)}
          />
        ) : (
          ''
        )}

        {isAddPhoneNumber ? (
          <AddPhoneNumber
            show={isAddPhoneNumber}
            profile={profile}
            closeModal={() => setIsAddPhoneNumber(false)}
          />
        ) : (
          ''
        )}

        {isEditPhoneNumber ? (
          <EditPhoneNumber
            show={isEditPhoneNumber}
            profile={profile}
            selectedPhone={selectedPhone}
            selectedPontyCode={selectedPontyCode}
            closeModal={() => setIsEditPhoneNumber(false)}
          />
        ) : (
          ''
        )}

        {isAddAddress ? (
          <AddAddress
            show={isAddAddress}
            profile={profile}
            closeModal={() => setIsAddAddress(false)}
          />
        ) : (
          ''
        )}

        {isEditAddress ? (
          <EditAddress
            show={isEditAddress}
            profile={profile}
            selectedAddress={selectedAddress}
            selectedAddressType={selectedAddressType}
            closeModal={() => setIsEditAddress(false)}
          />
        ) : (
          ''
        )}

        {isAddEducation ? (
          <AddEducation
            show={isAddEducation}
            profile={profile}
            closeModal={() => setIsAddEducation(false)}
          />
        ) : (
          ''
        )}

        {isEditEducation ? (
          <EditEducation
            show={isEditEducation}
            profile={profile}
            selectedEducation={selectedEducation}
            closeModal={() => setIsEditEducation(false)}
          />
        ) : (
          ''
        )}

        {isAddExperiences ? (
          <AddExperiences
            show={isAddExperiences}
            profile={profile}
            closeModal={() => setIsAddExperiences(false)}
          />
        ) : (
          ''
        )}

        {isAddSkills ? (
          <AddSkills
            show={isAddSkills}
            profile={profile}
            closeModal={() => setIsAddSkills(false)}
          />
        ) : (
          ''
        )}

        {isEditExperiences ? (
          <EditExperiences
            show={isEditExperiences}
            profile={profile}
            selectedExperiences={selectedExperiences}
            closeModal={() => setIsEditExperiences(false)}
          />
        ) : (
          ''
        )}
      </div>
      {/* End Fn Open Modal */}
    </>
  );
};

export default Settings;
