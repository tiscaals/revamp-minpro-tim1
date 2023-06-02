import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Logo from '../../../public/img/logo.png';
import { CalendarIcon } from '@heroicons/react/24/solid';
import DefaultIcon from '../../../public/img/default.jpg';

const Apply = () => {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState('');
  const [age, setAge] = useState('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    calculateAge(event.target.value);
  };

  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birthdateObj = new Date(birthdate);
    const ageInMilliseconds = today.getTime() - birthdateObj.getTime();
    const ageDate = new Date(ageInMilliseconds);
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    setAge(calculatedAge.toString());
  };

  const [selectedPhoto, setSelectedPhoto] = useState(DefaultIcon.src);

  const handlePhotoSelection = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e: any) {
      setSelectedPhoto(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-7/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
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
              <label
                htmlFor=""
                className="block text-xs font-semibold text-gray-600 uppercase mb-1"
              >
                Fullname
              </label>
              <input
                id=""
                type="text"
                name=""
                placeholder="Full Name"
                autoComplete="off"
                className="block w-full py-2 px-1 text-black appearance-none border-b-2 border-black-800 focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                required
              />

              <label
                htmlFor=""
                className="block text-xs font-semibold text-gray-600 uppercase mt-2 mb-1"
              >
                BirthDay
              </label>
              <div className="flex items-center ">
                <input
                  id="dateInput"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="bg-white text-black focus:text-gray-500 focus:outline-none border-b-2"
                />
                <CalendarIcon className="w-6 mx-3" />
                <input
                  id="age"
                  type="text"
                  name="age"
                  value={age ? `${age} tahun` : ''}
                  placeholder="Age"
                  className="bg-white text-black focus:outline-none"
                  readOnly
                />
              </div>

              <label
                htmlFor=""
                className="block text-xs font-semibold text-gray-600 uppercase mt-2 mb-1"
              >
                Education
              </label>
              <div className="form-control">
                <select className="select select-bordere border-gray-400 bg-white text-black">
                  <option disabled selected>
                    Pendidikan
                  </option>
                  <option>S1</option>
                  <option>SLTA</option>
                </select>
              </div>

              <label
                htmlFor=""
                className="block text-xs font-semibold text-gray-600 uppercase mt-2 mb-1"
              >
                Major
              </label>
              <input
                id=""
                type="text"
                name=""
                placeholder="Jurusan"
                autoComplete="off"
                className="block w-full py-2 px-1 text-black appearance-none border-b-2 border-black-800 focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                required
              />

              <label
                htmlFor=""
                className="block text-xs font-semibold text-gray-600 uppercase mt-2 mb-1"
              >
                Phone Number
              </label>
              <input
                id=""
                type="text"
                name=""
                placeholder="Phone Number"
                autoComplete="off"
                className="block w-full py-2 px-1 text-black appearance-none border-b-2 border-black-800 focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white mb-3"
                required
              />

              <label
                htmlFor=""
                className="block text-xs font-semibold text-gray-600 uppercase mt-2 mb-1"
              >
                Resume
              </label>
              <input
                id="file-input"
                type="file"
                accept=".pdf"
                className="file-input file-input-ghost w-full mt-1 bg-white border-gray-400"
                placeholder="Pilih file PDF"
              />
              {/* <span className='text-rose-700  text-xs'>* PDF FILE</span> */}
            </div>

            <div className="lg:mt-0 sm:mt-8">
              <label
                htmlFor=""
                className="block text-xs font-semibold text-gray-600 uppercase mb-2"
              >
                Photo Profile
              </label>
              <div className="shrink-0">
                <img
                  className="h-16 w-25 object-cover rounded-full mb-3"
                  src={selectedPhoto}
                  alt="Current profile photo"
                />
              </div>
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-blue-700 hover:file:bg-violet-100"
                  onChange={handlePhotoSelection}
                />
              </label>
            </div>

            <Link
              href="/signin"
              className="lg:py-3 lg:px-16 md:px-12 sm:px-8 mt-4 sm:mt-0 bg-blue-800 rounded-sm
                      font-medium text-white uppercase text-center
                      focus:outline-none hover:bg-blue-700 hover:shadow-none"
            >
              Cancel
            </Link>

            <button
              // type="submit"
              onClick={() => router.push('/signup/confirm')}
              className="lg:py-3 lg:px-16 md:px-12 sm:px-8 mt-4 sm:mt-0 bg-blue-800 rounded-sm
                      font-medium text-white uppercase
                      focus:outline-none hover:bg-blue-700 hover:shadow-none"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Apply;
