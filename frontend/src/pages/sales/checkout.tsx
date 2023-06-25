import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import courseImage from '../../images/logokecil.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHome, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Menu, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/solid';
import { IconButton, InputAdornment } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Search as SearchIcon } from '@mui/icons-material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useRouter } from 'next/router';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PaymentsIcon from '@mui/icons-material/Payments';
import { MdCancel } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiCartDownload } from 'react-icons/bi';
import { getAllCartReq, delCartReq, getDiskonReq, getPaymentReq } from '../redux/sales-schema/action/actionReducer';
import NavBar from '../komponen/navBar';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';

const ApplyButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#3f51b5',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const CartPage: React.FC = () => {
  const { items, message, refresh } = useSelector((state: any) => state.salesReducers);
  console.log(items, "dqdaa")

  const { diskon, pesan } = useSelector((state: any) => state.diskonReducers)
  const { payment, pesan1 } = useSelector((state: any) => state.paymentReducers);
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDiscountApplied, isSetDiscountApplied] = useState(false);
  const [selectedFintech, setSelectedFintech] = useState('');
  const [selectedAccountNumber, setSelectedAccountNumber] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [discountApply, setDiscountApply] = useState<any>()

  const handleAccountFintechClick = (fintech: string) => {
    setSelectedFintech(fintech);
    setSelectedAccountNumber(''); // Reset nomor akun saat fintech dipilih ulang
  };


  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [removeItemId, setRemoveItemId] = useState(0);

  const router = useRouter();

  const handleCheckOut = () => {
    if (selectedAccountNumber) {
      router.push({
        pathname: '/sales/createorder',
        query: { totalPrice: totalPrice, accountNumber: selectedAccountNumber, fintechName: selectedFintech, userName: selectedUserName, spof_id: discountApply?.spof_id, spof_discount: discountApply?.spof_discount }
      });
    } else {
      toast.error('No account number found');
    }
  };


  const handleSearch = (event: any) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleSearchFintech = (event: any) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleSearchAccountNumber = () => {
    const matchingAccount = payment.find(
      (account: any) =>
        account.usac_account_number.toLowerCase() === searchTerm.toLowerCase()
    );

    if (matchingAccount) {
      const matchingFintech = payment.find(
        (account: any) =>
          account.fint_name.toLowerCase() === selectedFintech.toLowerCase()
      );

      if (
        matchingFintech &&
        matchingFintech.usac_account_number === matchingAccount.usac_account_number
      ) {
        const accountNumber = matchingAccount.usac_account_number;
        const userName = matchingAccount.user_name; // Menyimpan user_name yang ditemukan
        console.log('Account Number:', accountNumber);
        console.log('User Name:', userName); // Menampilkan user_name
        setSelectedAccountNumber(accountNumber);
        setSelectedUserName(userName); // Menyimpan user_name pada state
        toast.success('Account found: ' + userName + ' ' + accountNumber); // Pesan sukses jika account number ditemukan
      } else {
        toast.error('No matching fintech account found');
        setSelectedAccountNumber('');
        setSelectedUserName(''); // Mengosongkan user_name pada state
      }
    } else {
      toast.error('No matching account found');
      setSelectedAccountNumber('');
      setSelectedUserName(''); // Mengosongkan user_name pada state
    }
  };

  useEffect(() => {
    dispatch(getAllCartReq());
  }, [refresh]);

  useEffect(() => {
    calculateTotalPrice();
  }, [items]);

  useEffect(() => {
    dispatch(getDiskonReq());
  }, [dispatch])

  useEffect(() => {
    dispatch(getPaymentReq());
  }, [dispatch])

  const calculateTotalPrice = () => {
    if (items && items?.length > 0) {
      const total = items?.reduce((accumulator: number, course: any) => {
        const price = parseFloat(course.prog_price.replace(/[^0-9.-]+/g, ""));
        const matchingDiscount = diskon.find((d: any) => d.prog_entity_id === course.prog_entity_id);
        if (matchingDiscount) {
          const discount = parseFloat(matchingDiscount.spof_discount);
          const discountedPrice = price - (price * discount) / 100;
          return accumulator + discountedPrice;
        } else {
          return accumulator + price;
        }
      }, 0);
      setTotalPrice(total);
      setOriginalPrice(total);
    } else {
      setTotalPrice(0);
      setOriginalPrice(0);
    }
  };

  const handleRemoveCartItem = (id: number) => {
    setRemoveItemId(id);
    setShowRemoveModal(true);
  };

  const confirmRemoveCartItem = () => {
    dispatch(delCartReq(removeItemId));
    toast.success('Item removed from cart'); // Menampilkan pesan berhasil
    setShowRemoveModal(false);
  };

  // const confirmRemoveCartItem = async () => {
  //   dispatch(delCartReq(removeItemId));
  //   await dispatch(getAllCartReq());
  //   setShowRemoveModal(false);
  //   toast.success('Item removed from cart');
  // };




  const cancelRemoveCartItem = () => {
    setShowRemoveModal(false);
  };

  const handleApplyDiscount = () => {
    const matchingDiscount = diskon.find((d: any) =>
      d.spof_description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      d.prog_entity_id === d.prog_entity_id
    );

    if (matchingDiscount) {
      setDiscountApply(matchingDiscount);
      const discount = parseFloat(matchingDiscount.spof_discount);
      const discountedPrice = totalPrice - (totalPrice * discount) / 100;
      setTotalPrice(discountedPrice);
      isSetDiscountApplied(true);
      toast.success('Discount applied');
    } else {
      toast.error('No matching discount found');
    }
  };

  const handleCancelDiscount = () => {
    setTotalPrice(originalPrice);
    isSetDiscountApplied(false);
    toast.success('Discount cancelled');
  };

  return (
    <>
      <NavBar />
      <ToastContainer />
      <div className="container mt-12 mx-auto p-4">
        <div className="flex items-center p-4 bg-white rounded-lg shadow-lg">

          <p className="text-lg font-bold text-red-600">
            <span className="cart-icon bg-red-500 text-white px-2 py-1 rounded mr-2">
              {items?.length}
            </span>
            Course in cart
            <BiCartDownload className="inline-block ml-2" />
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2">
          <div className="col-span-1">
            <div className="grid grid-cols-1 gap-4">
              {items &&
                items.map((course: any, index: any) => {
                  console.log(items)

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
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-gray-800 hover:border-gray-900 rounded-full transition-colors duration-300 shadow-lg flex items-center transform hover:scale-105">
                              Save for later
                              <BookmarkAddIcon className="ml-2" />
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border-b-4 border-gray-800 hover:border-gray-900 rounded-full flex items-center transform hover:scale-105"
                              onClick={() => handleRemoveCartItem(course?.cait_id)} // Memastikan parameter yang diteruskan adalah cait_id
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
                <p className="text-3xl font-bold text-gray-800">Rp. {totalPrice?.toLocaleString()}</p>

                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-gray-600 hover:border-gray-900 rounded-full mt-4"
                  onClick={handleCheckOut}
                >
                  Checkout
                  <ShoppingCartCheckoutIcon className="ml-2" />
                </button>


                <div>
                  <div className="mt-1 flex items-center">

                    {isDiscountApplied ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<MdCancel />}
                        style={{ backgroundColor: '#f44336' }}
                        className="mr-2 mt-3"
                        onClick={handleCancelDiscount}
                      >
                        Cancel Discount
                      </Button>
                    ) : (
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

                          <ApplyButton
                            variant="contained"
                            color="primary"
                            startIcon={<ThumbUpAltIcon />}
                            style={{ backgroundColor: '#3f51b5' }}
                            className="mr-2"
                            onClick={handleApplyDiscount}
                          >
                            Apply
                          </ApplyButton>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center p-4 bg-white rounded-lg shadow-lg">

          <div className="flex grid-cols-2">
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
                  onChange={handleSearchFintech}
                  fullWidth
                  className="mr-2"
                />


                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  style={{ backgroundColor: '#3f51b5' }}
                  onClick={handleSearchAccountNumber}
                >
                  Search
                </Button>
              </div>
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
