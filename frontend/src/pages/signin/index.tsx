import React, { Fragment, useEffect, useState } from 'react';
import Logo from '../../images/logo.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Checkbox } from '@material-tailwind/react';
import { doReqLogin } from '../redux/users-schema/action/actionReducer';
import jwt, { JwtPayload } from 'jsonwebtoken';

const AuthLogin = () => {
  type FormValue = {
    usernameOrEmail: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const router = useRouter();
  const dispacth = useDispatch();

  let { message, status, refresh } = useSelector(
    (state: any) => state.authLoginReducers
  );

  const SigninValidation = {
    usernameOrEmail: { required: 'username or email is required' },
    password: {
      required: 'password is required',
    },
  };

  const [error, setIsError]: any = useState('');

  const handleCloseAlert = () => {
    setIsError(null);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignin = (data: any) => {
    dispacth(doReqLogin(data));
    // router.push('/app')

    if (status === 400) {
      setIsError(message);
    }
  };

  useEffect((): any => {
    const token = Cookies.get('access_token');
    if (token) {
      const decoded = jwt.decode(token) as JwtPayload;
      if (decoded.user_current_role == 2 || decoded.user_current_role == 10) {
          router.push('/');
      } else {
        router.push('/app');
      }
    }
  }, [handleSignin]);

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

            <form className="mt-10" onSubmit={handleSubmit(handleSignin)}>
              {error && (
                <Fragment>
                  <Alert
                    className="mb-3"
                    color="red"
                    onClose={handleCloseAlert}
                  >
                    {error}
                  </Alert>
                </Fragment>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Username Or Email
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="username or email"
                  autoComplete="off"
                  className="block w-full py-3 px-1 mt-2 
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                  {...register(
                    'usernameOrEmail',
                    SigninValidation.usernameOrEmail
                  )}
                />
                <span className="text-sm text-red-600">
                  {errors?.usernameOrEmail && errors.usernameOrEmail.message}
                </span>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="password"
                    autoComplete="current-password"
                    className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                    {...register('password', SigninValidation.password)}
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-2 text-black-500"
                    onClick={handleTogglePassword}
                    style={{ fontSize: '1.5rem' }}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </div>
                <span className="text-sm text-red-600">
                  {errors?.password && errors.password.message}
                </span>
              </div>

              <div className="items-center sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                <div className="flex">
                  <Checkbox label="Remember Me" />
                </div>

                <div className="flex-1 text-right">
                  <a href="#" className="underline text-blue-800">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                variant="filled"
                className="w-full bg-blue-800"
              >
                Sign In
              </Button>
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
