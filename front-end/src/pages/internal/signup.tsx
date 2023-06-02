import React from 'react';
import Logo from '../../../public/img/logo.png';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignUpEmploye = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="grid place-items-center mx-2  sm:my-auto">
          <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
            <div className="flex justify-center items-center">
              <img className="w-40" src={Logo.src} alt="Logo" />
            </div>
            <h2 className="text-center font-bold uppercase text-2xl lg:text-2xl text-blue-800">
              SignUp As Employee Code.Id
            </h2>

            <form className="mt-10" method="POST">
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Username
              </label>
              <input
                id="username"
                type="username"
                name="email"
                placeholder="username"
                autoComplete="off"
                className="block w-full py-3 px-1 mt-2 
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                required
              />

              <label
                htmlFor="email"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="email"
                autoComplete="off"
                className="block w-full py-3 px-1 mt-2
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                required
              />

              <label
                htmlFor="password"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                autoComplete="off"
                className="block w-full py-3 px-1 mt-2
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                required
              />

              <label
                htmlFor="confirm_password"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                Confirm password
              </label>
              <input
                id="confirm_password"
                type="password"
                name="confirm_password"
                placeholder="confirm password"
                autoComplete="off"
                className="block w-full py-3 px-1 mt-2
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                required
              />

              <label
                htmlFor="phone_number"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                Phone Number
              </label>
              <input
                id="phone_number"
                type="phone_number"
                name="phone_number"
                placeholder="phone number"
                autoComplete="off"
                className="block w-full py-3 px-1 mt-2
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                required
              />

              <div className="flex flex-col sm:flex-row justify-between">
                <Link
                  href="/external/signup"
                  className="py-3 lg:px-16 md:px-12 sm:px-8 mt-10 bg-blue-800 rounded-sm
                            font-medium text-white uppercase text-center
                            focus:outline-none hover:bg-blue-700 hover:shadow-none"
                >
                  Cancel
                </Link>
                <button
                  // type="submit"
                  onClick={() => router.push('/signup/confirm')}
                  className="py-3 lg:px-16 md:px-12 sm:px-8 mt-10 bg-blue-800 rounded-sm
                            font-medium text-white uppercase
                            focus:outline-none hover:bg-blue-700 hover:shadow-none"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpEmploye;
