import image from '../../../public/img/default.jpg';
import BreadcrumbsSlice from '../shared/breadcrumbs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doRequestGetProfile } from '../redux/users-schema/action/actionReducer';
import { useDispatch, useSelector } from 'react-redux';
import { BsPencilFill } from 'react-icons/bs';
import EditProfile from './edit-profile';
import { ToastContainer, toast } from 'react-toastify';
import { notifyFailed, notifySuccess } from '../alert';
import EditPassword from './edit-password';

const Settings = (props: any) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { profile, token, refresh, status, message }: any = useSelector(
    (state: any) => state.settingReducers
  );

  const [user_entity_id, setUserId]: any = useState('');
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);

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
      });
    }
  }, [user_entity_id, isEditProfile, isEditPassword, refresh]);

  const port = 'http://localhost:7300/';

  return (
    <>
      <BreadcrumbsSlice />
      <ToastContainer />
      <div className="mx-auto bg-white border-b-2 shadow-md overflow-hidden lg:max-w-6xl">
        <div className="pl-8 mt-8 uppercase tracking-wide text-lg text-indigo-500 font-semibold">
          Profile
        </div>
        <div className="md:flex">
          <div className="md:flex-shrink-0">
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={() => setIsEditProfile(true)}
          >
            <BsPencilFill className="mr-2" />
            <span>Edit</span>
          </button>
        </div>
      </div>

      {/* Page2 */}
      <div className="mx-auto bg-white border-b-2 shadow-md overflow-hidden lg:max-w-6xl">
        <div className="pl-8 mt-8 uppercase tracking-wide text-lg text-indigo-500 font-semibold">
          Login
        </div>
        <div className="md:flex">
          <div className="p-8 flex flex-col">
            <div>
              <div className="font-bold text-xl mb-2">Change Password</div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end pr-10 pb-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={() => setIsEditPassword(true)}
          >
            <BsPencilFill className="mr-2" />
            <span>Edit</span>
          </button>
        </div>
      </div>

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
    </>
  );
};

export default Settings;
