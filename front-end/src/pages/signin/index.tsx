import React from 'react';
import Logo from '../../../public/img/logo.png';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AuthLogin = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="grid place-items-center mx-2 my-20 sm:my-auto">
          <div
            className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
                    px-6 py-10 sm:px-10 sm:py-6 
                    bg-white rounded-lg shadow-md lg:shadow-lg"
          >
            <div className="flex justify-center items-center">
              <img className="w-40" src={Logo.src} alt="Logo" />
            </div>
            <h2 className="text-center font-bold uppercase text-2xl lg:text-2xl text-blue-800">
              Sign in to your account
            </h2>

            <form className="mt-10" method="POST">
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Username Or Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="username or email"
                autoComplete="off"
                className="block w-full py-3 px-1 mt-2 
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                required
              />

              <label
                htmlFor="password"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase "
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                autoComplete="current-password"
                className="block w-full py-3 px-1 mt-2
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                required
              />

              <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                <div className="flex items-center">
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-info mr-3"
                      />
                      <span className="label-text">Remember me</span>
                    </label>
                  </div>
                </div>

                <div className="flex-1 text-right">
                  <a href="#" className="underline text-blue-800">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <button
                // type="submit"
                onClick={() => router.push('/profesional/apply')}
                className="w-full py-3 mt-10 bg-blue-800 rounded-sm
                            font-medium text-white uppercase
                            focus:outline-none hover:bg-blue-700 hover:shadow-none"
              >
                Sign In
              </button>
            </form>
            <div className="text-center mt-5">
              <Link
                href="/external/signup"
                className="underline text-blue-800 text-sm"
              >
                Not yet registered, register now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
