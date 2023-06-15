import React, { useState } from 'react';
import Image from 'next/image';
import courseImage from '../../images/logokecil.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHome, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { IconButton, InputAdornment } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Search as SearchIcon } from '@mui/icons-material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Navbar from '../components/navbar';
import { useRouter } from 'next/router';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PaymentsIcon from '@mui/icons-material/Payments';

const ApplyButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#3f51b5',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const CartPage: React.FC = () => {
  const [isAccountValid, setIsAccountValid] = useState(false);
  const [coursePrice, setCoursePrice] = useState(3500000);
  const [total, setTotal] = useState(coursePrice);

  const router = useRouter();

  const handleCheckOut = () => {
    if (isAccountValid) {
        router.push('/sales/createorder')
    }
  }

  const handleAccountFintechClick = () => {
    setIsAccountValid(true);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    // Perform search operations based on the searchTerm
  };

  const handleCoursePriceChange = (event:any) => {
    setCoursePrice(event.target.value);
    setTotal(event.target.value);
  };

  return (
    <>
    <Navbar />

  
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="col-span-1">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-lg">
              <div className="h-16 w-16 mr-4 relative">
                <Image
                  src={courseImage}
                  alt="Course Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-lg font-bold text-gray-800">Course 1</p>
                    <p className="text-gray-600">Description of Course 1</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-600">Rp. {coursePrice}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-lg flex items-center transform hover:scale-105">
                    Save for later
                    <BookmarkAddIcon className="ml-2" />
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-lg flex items-center transform hover:scale-105">
                    Remove
                    <DeleteForeverIcon className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-lg">
              <p className="text-lg font-bold text-gray-800">Payment</p>
              <PaymentsIcon className="ml-2"/>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="grid grid-cols-1 gap-4 h-full">
            <div className="p-5 y-1 bg-white rounded-lg shadow-lg flex flex-col">
              <p className="text-lg font-bold text-gray-800">Total:</p>
              <p className="text-3xl font-bold text-gray-800">Rp. {total}</p>

              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-lg mt-4"
              onClick={handleCheckOut}
              >
                Checkout
                <ShoppingCartCheckoutIcon className="ml-2" />
              </button>
              <div>
                <div className="mt-4 flex items-center">
                  <TextField
                    id="search"
                    label="Search"
                    variant="outlined"
                    size="small"
                    onChange={handleSearch}
                    fullWidth
                    className="mr-2"
                  />

                  <ApplyButton
                    variant="contained"
                    color="primary"
                    startIcon={<ThumbUpAltIcon />}
                    style={{ backgroundColor: '#3f51b5' }}
                    className="mr-2"
                  >
                    Apply
                  </ApplyButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Fintech
                  <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block px-4 py-2 text-sm transition-all duration-300 hover:bg-gray-200 hover:text-gray-900 rounded-md shadow-md`}
                      >
                        <FontAwesomeIcon icon={faHome} className="mr-2" /> GoTo
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block px-4 py-2 text-sm transition-all duration-300 hover:bg-gray-200 hover:text-gray-900 rounded-md shadow-md`}
                      >
                        <FontAwesomeIcon icon={faWallet} className="mr-2" /> OVO
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div>
            <button
              className="ml-4 inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={handleAccountFintechClick}
            >
              Account Fintech
            </button>
          </div>
        </div>
      </div>

      {isAccountValid && (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-lg mt-2">
          <p className="text-lg font-bold text-gray-800">Your account is valid, please continue to complete</p>
        </div>
      )}
    </div>
    </>
  );
}

export default CartPage;
