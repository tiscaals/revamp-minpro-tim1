import image from '../../../public/img/default.jpg';
import BreadcrumbsSlice from '../shared/breadcrumbs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  doRequestDeleteAddress,
  doRequestDeleteEmail,
  doRequestDeletePhone,
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
import AddPhoneNumber from './phone-number/add-phone';
import EditPhoneNumber from './phone-number/edit-phone';
import AddAddress from './address/add-address';
import EditAddress from './address/edit-address';

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

  const [isAddPhoneNumber, setIsAddPhoneNumber] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [selectedPontyCode, setSelectedPontyCode] = useState(null);
  const [isEditPhoneNumber, setIsEditPhoneNumber] = useState(false);

  const [isAddAddress, setIsAddAddress] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressType, setSelectedAddressType] = useState(null);
  // End State

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

      if (user_entity_id) {
        dispatch(doRequestGetProfile(user_entity_id));
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

      if (user_entity_id) {
        dispatch(doRequestGetProfile(user_entity_id));
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

      if (user_entity_id) {
        dispatch(doRequestGetProfile(user_entity_id));
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  // End Handle Delete Address

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
      }, 500);
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
        <div className="flex w-full justify-end pr-10 pb-10"></div>
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
        <div className="flex w-full justify-end pr-10 pb-10"></div>
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
          <div className="p-8 flex flex-col lg:w-full">
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
                          handleDeleteEmail(
                            profile.users_emails[0].pmail_id,
                            profile.users_emails[0].pmail_address
                          );
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
                          handleDeleteEmail(
                            profile.users_emails[1].pmail_id,
                            profile.users_emails[1].pmail_address
                          );
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
                Your Phones :
              </Typography>
            </div>
            <div className="flex flex-col">
              {/* For PhoneCellular*/}
              {profile?.users_phones && profile.users_phones.length > 0 && (
                <div className="flex items-center justify-start">
                  <Typography variant="h6">
                    <span className="underline">
                      {profile?.users_phones && profile.users_phones.length > 0
                        ? profile.users_phones[0].uspo_number.replace(
                            /(\d{4})(\d{4})(\d{4})/,
                            '$1-$2-$3'
                          )
                        : ''}
                    </span>

                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                      {profile?.users_phones && profile.users_phones.length > 0
                        ? profile.users_phones[0].uspo_ponty_code
                        : ''}
                    </span>
                  </Typography>
                  <div className="flex items-center ml-auto">
                    <div className="flex flex-col lg:flex-row">
                      <Button
                        color="amber"
                        className="font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0 md:mr-2"
                        onClick={() => {
                          setSelectedPhone(profile.users_phones[0]);
                          setSelectedPontyCode(
                            profile.users_phones[0].uspo_ponty_code
                          );
                          setIsEditPhoneNumber(true);
                        }}
                      >
                        <BsPencilFill className="mr-2" />
                        <span>Edit</span>
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0"
                        onClick={() => {
                          handleDeletePhone(
                            profile.users_phones[0].uspo_number
                          );
                        }}
                      >
                        <BsTrash3Fill className="mr-2" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {/* End PhoneCellular*/}

              {/* For PhoneHome  */}
              {profile?.users_phones && profile.users_phones.length > 1 && (
                <div className="flex items-center justify-start mt-4">
                  <Typography variant="h6">
                    <span className="underline">
                      {profile?.users_phones && profile.users_phones.length > 1
                        ? profile.users_phones[1].uspo_number.replace(
                            /(\d{4})(\d{4})(\d{4})/,
                            '$1-$2-$3'
                          )
                        : ''}
                    </span>

                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                      {profile?.users_phones && profile.users_phones.length > 1
                        ? profile.users_phones[1].uspo_ponty_code
                        : ''}
                    </span>
                  </Typography>
                  <div className="flex items-center ml-auto">
                    <div className="flex flex-col lg:flex-row">
                      <Button
                        color="amber"
                        className="font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0 md:mr-2"
                        onClick={() => {
                          setSelectedPhone(profile.users_phones[1]);
                          setSelectedPontyCode(
                            profile.users_phones[1].uspo_ponty_code
                          );
                          setIsEditPhoneNumber(true);
                        }}
                      >
                        <BsPencilFill className="mr-2" />
                        <span>Edit</span>
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0"
                        onClick={() => {
                          handleDeletePhone(
                            profile.users_phones[1].uspo_number
                          );
                        }}
                      >
                        <BsTrash3Fill className="mr-2" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {/*End PhoneHome */}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end pr-10 pb-2"></div>
      </div>

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
              {/* For Address 1*/}
              {profile?.users_addresses &&
                profile.users_addresses.length > 0 && (
                  <div>
                    {profile.users_addresses.map((data: any, index: any) => (
                      <div
                        key={index}
                        className="flex items-center justify-start mt-3"
                      >
                        <Typography variant="paragraph">
                          <span className="underline">
                            {data.address.addr_line1}
                          </span>
                          <br />
                          <span>
                            {data.address.city.city_name} -{' '}
                            {data.address.addr_postal_code}
                          </span>
                        </Typography>

                        <div className="flex items-center ml-auto">
                          <div className="flex flex-col lg:flex-row">
                            <Button
                              color="amber"
                              className="font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0 md:mr-2"
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
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center mt-2 lg:mt-0"
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
              {/* End Address 1*/}
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
    </>
  );
};

export default Settings;
