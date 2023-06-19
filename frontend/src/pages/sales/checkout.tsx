import React, { useEffect, useState } from 'react';
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
import { delCartReq, getAllCartReq } from '../redux/action/actionReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplyButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#3f51b5',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const CartPage: React.FC = () => {
  const { items, message, refresh } = useSelector((state: any) => state.salesReducers);
  const dispatch = useDispatch();

  const [isAccountValid, setIsAccountValid] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedFintech, setSelectedFintech] = useState('');
  const handleAccountFintechClick = (fintech: string) => {
    setSelectedFintech(fintech);
  };

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [removeItemId, setRemoveItemId] = useState(0);

  const router = useRouter();

  const handleCheckOut = () => {
    if (isAccountValid) {
      router.push('/sales/createorder');
    }
  };

  const handleSearch = (event: any) => {
    const searchTerm = event.target.value;
    // Perform search operation based on searchTerm
  };

  useEffect(() => {
    dispatch(getAllCartReq());
  }, [dispatch]);

  useEffect(() => {
    calculateTotalPrice();
  }, [items]);

  const calculateTotalPrice = () => {
    if (items && items.length > 0) {
      const total = items.reduce((accumulator: number, course: any) => {
        const price = parseFloat(course.prog_price.replace(/[^0-9.-]+/g, ""));
        return accumulator + price;
      }, 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0); // Set total price to 0 if there are no items
    }
  };

  const handleRemoveCartItem = (id: number) => {
    setRemoveItemId(id);
    setShowRemoveModal(true);
  };

  const confirmRemoveCartItem = () => {
    dispatch(delCartReq(removeItemId));
    toast.success('Item removed from cart'); // Display success message
    setShowRemoveModal(false);
  };

  const cancelRemoveCartItem = () => {
    setShowRemoveModal(false);
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container mx-auto p-4">
      <p className="text-lg font-bold text-red-600">{items.length} Course in cart</p>
        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2">
          <div className="col-span-1">
            <div className="grid grid-cols-1 gap-4">
              {items &&
                items.map((course: any, index: any) => {
                  if (course.cait_id && !isNaN(course.cait_id)) {
                    return (
                      <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-lg">
                        <div className="h-16 w-16 mr-4 relative">
                          <Image src={courseImage} alt="Course Image" layout="fill" objectFit="cover" className="rounded-full" />
                        </div>
                        <div className="flex flex-col flex-grow">
                          <div className="flex justify-between mb-4">
                            <div>
                              <p className="text-lg font-bold text-gray-800">{course.prog_headline}</p>
                              <p className="text-gray-600">{course.prog_title}</p>
                            </div>
                            <div className="flex items-center">
                              <p className="text-gray-600">Rp. {course.prog_price}</p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-lg flex items-center transform hover:scale-105">
                              Save for later
                              <BookmarkAddIcon className="ml-2" />
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-lg flex items-center transform hover:scale-105"
                              onClick={() => handleRemoveCartItem(course.cait_id)}
                            >
                              Remove
                              <DeleteForeverIcon className="ml-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return null; // If cait_id is not valid, the course item won't be rendered
                  }
                })}
              <div className="flex items-center p-4 bg-white rounded-lg shadow-lg">
                <p className="text-lg font-bold text-gray-800">Payment</p>
                <PaymentsIcon className="ml-2" />
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="grid grid-cols-1 gap-4 h-full">
              <div className="p-5 y-1 bg-white rounded-lg shadow-lg flex flex-col">
                <p className="text-lg font-bold text-gray-800">Total:</p>
                <p className="text-3xl font-bold text-gray-800">Rp. {totalPrice.toLocaleString()}</p>

                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-lg mt-4"
                  onClick={handleCheckOut}
                >
                  Checkout
                  <ShoppingCartCheckoutIcon className="ml-2" />
                </button>
                <div>
                  <div className="mt-4 flex items-center">
                    <TextField
                      id="search"
                      label="Discount"
                      variant="outlined"
                      size="small"
                      onChange={handleSearch}
                      fullWidth
                      className="mr-2"
                    />

                    <ApplyButton variant="contained" color="primary" startIcon={<ThumbUpAltIcon />} style={{ backgroundColor: '#3f51b5' }} className="mr-2">
                      Apply
                    </ApplyButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex grid-cols-2'>

          <div className="flex items-center justify-between mt-4 sm:justify-start">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                {selectedFintech || 'Fintech'}
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />
              </Menu.Button>

              <Menu.Items className="origin-top-right absolute right-0 left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 max-h-[20rem] overflow-y-auto">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={() => handleAccountFintechClick('GoTo')}
                    >
                      GoTo
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={() => handleAccountFintechClick('OVO')}
                    >
                      OVO
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>

            </Menu>
            <IconButton>
              <FontAwesomeIcon icon={faArrowRight} className="text-gray-600" />
            </IconButton>
          </div>

          <div>
            <div className="mt-4 flex items-center">
              <TextField
                id="search"
                label="Fintech Account"
                variant="outlined"
                size="small"
                onChange={handleSearch}
                fullWidth
                className="mr-2"
              />
            </div>
          </div>
        </div>

      </div>

      {showRemoveModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold">Remove Item</h2>
            <p>Are you sure you want to remove this item?</p>
            <div className="mt-4 flex justify-end">
              <Button variant="outlined" className="mr-2" onClick={cancelRemoveCartItem}>
                Cancel
              </Button>
              <Button variant="contained" color="secondary" className="bg-red-500" onClick={confirmRemoveCartItem}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default CartPage;
