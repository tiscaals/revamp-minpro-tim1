import React from 'react';
import Logo from '../../images/logo.png';
import { useRouter } from 'next/router';

const ConfirmBootcamp = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="grid place-items-center mx-2 sm:my-auto">
          <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
            <div className="flex justify-center items-center">
              <img className="w-40" src={Logo.src} alt="Logo" />
            </div>
            <h2 className="text-center font-bold uppercase text-2xl lg:text-2xl text-blue-800">
              Confirmation
            </h2>
            <p className="text-center text-sm mt-4">
              terimakasih sudah apply untuk mengikuti bootcamp click{' '}
              <button
                onClick={() => router.replace('/')}
                className="text-blue-800 underline"
              >
                disini
              </button>
              {''} untuk kembali
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBootcamp;
