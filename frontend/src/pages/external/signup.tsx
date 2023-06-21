import React, { Fragment, useEffect, useState } from 'react';
import Logo from '../../../public/img/logo.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Checkbox } from '@material-tailwind/react';
import Cookies from 'js-cookie';
import { doReqSignup } from '../redux/users-schema/action/actionReducer';

const AuthSignUpExternal = () => {
  type FormValue = {
    user_name: string;
    pmail_address: string;
    user_password: string;
    confirm_password: string;
    uspo_number: string;
    usro_role_id: any;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const router = useRouter();
  const dispacth = useDispatch();

  let { message, status, refresh } = useSelector(
    (state: any) => state.authSignUpReducers
  );

  const SignUpValidation = {
    user_name: { required: 'username is required' },
    pmail_address: { required: 'email is required' },
    user_password: {
      required: 'password is required',
      minLength: {
        value: 8,
        message: 'password minimum 8 characters',
      },
    },
    confirm_password: {
      required: 'confirm password is required',
      minLength: {
        value: 8,
        message: 'password minimum 8 characters',
      },
      validate: (value: string) =>
        value === watch('user_password') || 'passwords do not match',
    },
    uspo_number: { required: 'phone number is required' },
    usro_role_id: { required: 'role is required' },
  };

  const [error, setIsError]: any = useState('');

  const handleCloseAlert = () => {
    setIsError(null);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (data: any) => {
    try {
      dispacth(doReqSignup(data));

      if (status === 400) {
        setIsError(message);
      } else if (status === 200) {
        router.push('/signup/confirm');
      }
    } catch (error) {
      setIsError('an error occurred during sign up.');
    }
  };

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      router.push('/');
    }
  }, [refresh]);

  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="grid place-items-center mx-2  sm:my-auto">
          <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
            <div className="flex justify-center items-center">
              <img className="w-40" src={Logo.src} alt="Logo" />
            </div>
            <h2 className="text-center font-bold uppercase text-2xl lg:text-2xl text-blue-800">
              Sign Up
            </h2>

            <form className="mt-10" onSubmit={handleSubmit(handleSignUp)}>
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
                  htmlFor="username"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="username"
                  autoComplete="off"
                  className="block w-full py-3 px-1 mt-2 
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                  {...register('user_name', SignUpValidation.user_name)}
                />

                <span className="text-sm text-red-600">
                  {errors?.user_name && errors.user_name.message}
                </span>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                >
                  email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="email"
                  autoComplete="off"
                  className="block w-full py-3 px-1 mt-2
                              text-gray-800 appearance-none 
                              border-b-2 border-gray-100
                              focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                  {...register('pmail_address', SignUpValidation.pmail_address)}
                />
                <span className="text-sm text-red-600">
                  {errors?.pmail_address && errors.pmail_address.message}
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
                    {...register(
                      'user_password',
                      SignUpValidation.user_password
                    )}
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-2 text-black-500"
                    onClick={handleTogglePassword}
                    style={{ fontSize: '1.5rem' }}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                  <span className="text-sm text-red-600">
                    {errors?.user_password && errors.user_password.message}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm_password"
                  className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="confirm_password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="confirm password"
                    autoComplete="current-password"
                    className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                    {...register(
                      'confirm_password',
                      SignUpValidation.confirm_password
                    )}
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
                  {errors?.confirm_password && errors.confirm_password.message}
                </span>
              </div>

              <div>
                <label
                  htmlFor="phone_number"
                  className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                >
                  Phone Number
                </label>
                <input
                  id="phone_number"
                  type="number"
                  placeholder="phone number"
                  autoComplete="off"
                  className="block w-full py-3 px-1 mt-2
                            text-gray-800 appearance-none 
                            border-b-2 border-gray-100
                            focus:text-gray-500 focus:outline-none focus:border-gray-200 bg-white"
                  {...register('uspo_number', SignUpValidation.uspo_number)}
                />
                <span className="text-sm text-red-600">
                  {errors?.uspo_number && errors.uspo_number.message}
                </span>
              </div>

              <div>
                <input
                  type="hidden"
                  value="2"
                  {...register('usro_role_id', SignUpValidation.usro_role_id)}
                ></input>
              </div>

              <div className="flex flex-col sm:flex-row justify-between">
                <Button
                  onClick={() => router.push('/signin')}
                  variant="filled"
                  className="w-full py-3 mr-2 lg:px-16 md:px-12 sm:px-8 mt-10 bg-blue-800 rounded-sm
                  font-medium text-white uppercase"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="filled"
                  className="w-full py-3 ml-2 lg:px-16 md:px-12 sm:px-8 mt-10 bg-blue-800 rounded-sm
                  font-medium text-white uppercase"
                >
                  Sign Up
                </Button>
              </div>
            </form>
            <div className="text-center mt-5">
              <Link
                href="/internal/signup"
                className="underline text-blue-800 text-sm"
              >
                If you are employee code.id, click this for signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSignUpExternal;
