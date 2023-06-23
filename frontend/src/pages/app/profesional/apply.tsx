import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Logo from '../../../images/logo.png';
import DefaultImage from '../../../images/default-avatar.jpg';
import { Button } from '@material-tailwind/react';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { doRequestGetProfile } from '@/pages/redux/users-schema/action/actionReducer';
import { useDispatch, useSelector } from 'react-redux';

const Apply = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const port = 'http://localhost:7300/';
  const { profile, refresh, status, message }: any = useSelector(
    (state: any) => state.settingReducers
  );

  const [selectedDate, setSelectedDate] = useState(
    profile?.user_birth_date || ''
  );
  const [age, setAge] = useState('');

  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birthdateObj = new Date(birthdate);
    const ageInMilliseconds = today.getTime() - birthdateObj.getTime();
    const ageDate = new Date(ageInMilliseconds);
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    return calculatedAge.toString();
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    setAge(calculateAge(event.target.value));
  };

  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);
  const [selectedPhotoURL, setSelectedPhotoURL] = useState<any>(
    // profile?.user_photo
    //   ? `${port}${profile?.user_photo}`
    //   : DefaultImage?.src
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

    if (profile?.user_birth_date) {
      setAge(calculateAge(profile.user_birth_date));
    } else {
      setAge('');
    }
  }, [profile?.user_photo, profile?.user_birth_date, refresh]);

  useEffect(()=>{
    if(profile){
      setSelectedPhotoURL(`${port}${profile?.user_photo}`)
    }
  },[profile.user_photo])

  return (
    <div className="grid place-items-center mx-2 sm:my-auto">
      <div className="w-full px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
        <div className="flex justify-center items-center">
          <img className="w-40" src={Logo.src} alt="Logo" />
        </div>

        <h2 className="text-center font-bold uppercase text-2xl lg:text-2xl text-blue-800">
          Professional Application Process
        </h2>

        <form
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
          method="POST"
        >
          <div>
            <div>
              <label
                htmlFor=""
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Firstname
              </label>
              <input
                type="text"
                placeholder="First name"
                autoComplete="off"
                className="block w-full py-2 px-1 text-black appearance-none border-b-2 border-black-800 focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                defaultValue={profile?.user_first_name || ''}
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-xs font-semibold text-gray-600 uppercase mb-1 mt-2"
              >
                Lastname
              </label>
              <input
                id=""
                type="text"
                name=""
                placeholder="Last Name"
                autoComplete="off"
                className="block w-full py-2 px-1 text-black appearance-none border-b-2 border-black-800 focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                defaultValue={profile?.user_last_name || ''}
              />
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
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-xs font-semibold text-gray-600 uppercase mt-2 mb-1"
              >
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
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-xs font-semibold text-gray-600 uppercase mt-2 mb-1"
              >
                Major
              </label>
              <input
                type="text"
                placeholder="Major"
                autoComplete="off"
                className="block w-full py-2 px-1 text-black appearance-none border-b-2 border-black-800 focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                defaultValue={
                  (profile?.users_educations &&
                    profile.users_educations[0]?.usdu_field_study) ||
                  ''
                }
              />
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-xs font-semibold text-gray-600 uppercase mt-2 mb-1"
              >
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                autoComplete="off"
                className="block w-full py-2 px-1 text-black appearance-none border-b-2 border-black-800 focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white mb-3"
                defaultValue={
                  profile?.users_phones &&
                  (profile?.users_phones[1]?.uspo_number ||
                    profile?.users_phones[0]?.uspo_number)
                }
              />
            </div>
          </div>

          <div className="lg:mt-0">
            <div>
              <label
                htmlFor=""
                className="block w-full py-2 px-1 text-xs font-semibold text-gray-600 uppercase"
              >
                BirthDay
              </label>
              <div className="flex flex-col lg:flex-row">
                {profile?.user_birth_date ? (
                  
                    <input
                      type="date"
                      defaultValue={profile?.user_birth_date}
                      onChange={handleDateChange}
                      className="bg-white text-black focus:text-gray-500 focus:outline-none border-b-2 w-full"
                    />
                
                ) : (
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="bg-white text-black focus:text-gray-500 focus:outline-none border-b-2 w-full"
                  />
                )}

                <input
                  type="text"
                  name="age"
                  value={age ? `${age} tahun` : ''}
                  placeholder="Age"
                  className="bg-white text-black "
                  readOnly
                />
              </div>
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-xs font-semibold text-gray-600 uppercase mt-2 mb-2"
              >
                Photo Profile
              </label>
              <div className="shrink-0">
                {selectedPhotoURL != DefaultImage.src ? (
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
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-700 hover:file:bg-violet-100"
                  onChange={handlePhotoSelection}
                />
              </label>
            </div>

            <div>
              <label
                htmlFor=""
                className="block text-xs font-semibold text-gray-600 uppercase mt-12  mb-2"
              >
                Resume
              </label>
              <input
                type="file"
                accept=".pdf"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-700 hover:file:bg-violet-100"
                defaultValue={
                  (profile?.users_media &&
                    profile.users_medias[0].usme_filename) ||
                  ''
                }
              />
            </div>
          </div>

          <Button
            onClick={() => router.push('/')}
            className="lg:py-3 lg:px-16 md:px-12 sm:px-8 mt-4 sm:mt-0 bg-blue-800 rounded-sm
                      font-medium text-white uppercase text-center
                      focus:outline-none hover:bg-blue-700 hover:shadow-none"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            // onClick={() => router.push('/signup/confirm')}
            className="lg:py-3 lg:px-16 md:px-12 sm:px-8 mt-4 sm:mt-0 bg-blue-800 rounded-sm
                      font-medium text-white uppercase
                      focus:outline-none hover:bg-blue-700 hover:shadow-none"
          >
            Apply
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Apply;
