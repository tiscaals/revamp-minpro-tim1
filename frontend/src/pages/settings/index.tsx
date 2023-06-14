import image from '../../../public/img/default.jpg';
import BreadcrumbsSlice from '../shared/breadcrumbs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  doRequestDeleteEmail,
  doRequestGetProfile,
} from '../redux/users-schema/action/actionReducer';
import { useDispatch, useSelector } from 'react-redux';
import { BsPencilFill, BsPlusCircleFill, BsTrash3Fill } from 'react-icons/bs';
import EditProfile from './edit-profile/edit-profile';
import { ToastContainer, toast } from 'react-toastify';
import { notifyFailed, notifySuccess } from '../alert';
import EditPassword from './edit-password/edit-password';
import { Button, Typography } from '@material-tailwind/react';
import AddEmail from './email/add-email';
import Swal from 'sweetalert2';
import EditEmail from './email/edit-email';

const Settings = (props: any) => {
  // Fn Core
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile, token, refresh, status, message }: any = useSelector(
    (state: any) => state.settingReducers
  );
  // End Core

  //Start State
  const [user_entity_id, setUserId]: any = useState('');
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isAddEmail, setIsAddEmail] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  // End State

  // Handle Delete Email
  const handleDeleteEmail = async (id: any) => {
    try {
      const result = await Swal.fire({
        title: 'email delete confirm',
        text: 'are you sure to delete the selected emails?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        dispatch(doRequestDeleteEmail(id));
      }

      if (user_entity_id) {
        dispatch(doRequestGetProfile(user_entity_id));
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  // End Handle Delete Email

  useEffect(() => {
    const storedToken = localStorage.getItem('userData');
    if (storedToken) {
      const userData = JSON.parse(storedToken);
      setUserId(userData.user_entity_id);
    }

    if (user_entity_id) {
      dispatch(doRequestGetProfile(user_entity_id));
    }

    if (message) {
      setTimeout(() => {
        if (status === 200) {
          notifySuccess('success', message);
        } else if (status == 400) {
          notifyFailed('error', message);
        }
      }, 100);
    }
  }, [user_entity_id, refresh]);

  const port = 'http://localhost:7300/';

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
            color="amber"
            className="font-bold py-2 px-4 rounded flex items-center"
            onClick={() => setIsEditProfile(true)}
          >
            <BsPencilFill className="mr-2" />
            <span>Edit</span>
          </Button>
        </div>
      </div>

      {/* Page Edit Password */}
      <div className="mx-auto bg-white border-b-2 shadow-md overflow-hidden lg:max-w-6xl">
        <div className="pl-8 mt-8 uppercase tracking-wide text-lg text-indigo-500 font-semibold">
          Login
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
            color="amber"
            className="font-bold py-2 px-4 rounded flex items-center"
            onClick={() => setIsEditPassword(true)}
          >
            <BsPencilFill className="mr-2" />
            <span>Edit</span>
          </Button>
        </div>
      </div>

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
          <div className="p-8 flex flex-col lg:w-1/2">
            <div className="mb-5">
              <Typography variant="h6" className="uppercase">
                Your Email :
              </Typography>
            </div>
            <div className="flex flex-col">
              {/* For First Email */}
              {profile?.users_emails && profile.users_emails.length > 0 && (
                <div className="flex items-center justify-start">
                  <Typography variant="h6">
                    <span className="underline">
                      {profile?.users_emails && profile.users_emails.length > 0
                        ? profile.users_emails[0].pmail_address
                        : ''}
                    </span>
                  </Typography>
                  <div className="flex items-center ml-auto">
                    <div className="flex flex-col lg:flex-row">
                      <Button
                        color="amber"
                        className="font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0 md:mr-2"
                        onClick={() => {
                          setSelectedEmail(profile.users_emails[0]);
                          setIsEditEmail(true);
                        }}
                      >
                        <BsPencilFill className="mr-2" />
                        <span>Edit</span>
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0"
                        onClick={() => {
                          handleDeleteEmail(profile.users_emails[0].pmail_id);
                        }}
                      >
                        <BsTrash3Fill className="mr-2" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {/* End  Second Email*/}

              {/* For Second Email  */}
              {profile?.users_emails && profile.users_emails.length > 1 && (
                <div className="flex items-center justify-start mt-4">
                  <Typography variant="h6">
                    <span className="underline">
                      {profile?.users_emails && profile.users_emails.length > 1
                        ? profile.users_emails[1].pmail_address
                        : ''}
                    </span>
                  </Typography>
                  <div className="flex items-center ml-auto">
                    <div className="flex flex-col lg:flex-row">
                      <Button
                        color="amber"
                        className="font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0 md:mr-2"
                        onClick={() => {
                          setSelectedEmail(profile.users_emails[1]);
                          setIsEditEmail(true);
                        }}
                      >
                        <BsPencilFill className="mr-2" />
                        <span>Edit</span>
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0"
                        onClick={() => {
                          handleDeleteEmail(profile.users_emails[1].pmail_id);
                        }}
                      >
                        <BsTrash3Fill className="mr-2" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {/*End First Email */}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end pr-10 pb-2"></div>
      </div>

      {/* Function Open Modal */}
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
    </>
  );
};

export default Settings;
