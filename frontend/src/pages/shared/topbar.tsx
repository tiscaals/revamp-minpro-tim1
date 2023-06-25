import { GoThreeBars } from 'react-icons/go';
import { Menu, Transition } from '@headlessui/react';
import { BsPencilFill, BsPersonCircle, BsCaretDownFill } from 'react-icons/bs';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import defaultImage from '../../images/default-avatar.jpg';
import { doRequestGetProfile } from '../redux/users-schema/action/actionReducer';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default function TopBar({ showNav, setShowNav }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const port = 'http://localhost:3003/images/user-image/';
  const { profile }: any = useSelector((state: any) => state.settingReducers);
  const [profileImage, setProfileImage] = useState('');

  const logoutAuth = async (id: any) => {
    try {
      const result = await Swal.fire({
        title: 'logout confirm',
        text: 'are you sure want to exit?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      });

      if (result.isConfirmed) {
        Cookies.remove('access_token');
        router.push('/signin');
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to logout. Please try again.', 'error');
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

    if (profile && profile.user_photo) {
      setProfileImage(`${port}${profile.user_photo}`);
    } else {
      setProfileImage(defaultImage.src);
    }
  }, [profile?.user_photo]);
  return (
    <div
      className={`bg-white fixed z-10 w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${
        showNav ? 'pl-56' : ''
      }`}
    >
      <div className="pl-4 md:pl-16">
        <GoThreeBars
          className="h-8 w-8 text-gray-700 cursor-pointer hover:text-gray-400"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className="flex items-center pr-4 md:pr-16 ">
        <span className="tetx-sm"> {profile?.user_name} </span>
        <Menu as="div" className="relative inline-block text-left">
          <div className="flex items-center">
            <Menu.Button className="group flex items-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 md:mr-4">
              <picture>
                <img
                  src={profileImage}
                  className="rounded-full h-8 md:mr-4 border-2 border-white shadow-sm"
                  alt="profile picture"
                />
              </picture>
              <BsCaretDownFill
                className="h-4 w-4 text-gray-700 group-hover:text-gray-400 sm:flex group-aria-pressed:rotate-180"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => router.push('/app/settings')}
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <BsPencilFill
                            className="mr-2 h-5 w-5 text-white-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <BsPencilFill
                            className="mr-2 h-5 w-5 text-blue-400"
                            aria-hidden="true"
                          />
                        )}
                        Edit Account
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }: any) => (
                      <button
                        onClick={logoutAuth}
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <BiLogInCircle
                            className="mr-2 h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        ) : (
                          <BiLogInCircle
                            className="mr-2 h-5 w-5 text-blue-400"
                            aria-hidden="true"
                          />
                        )}
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
