import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import courseImage from '../../images/logokecil.png';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import Navbar from '../components/navbar';
import { useRouter } from 'next/router';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { MdRemoveShoppingCart, MdShoppingCart } from 'react-icons/md';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PaymentsIcon from '@mui/icons-material/Payments';
import { addOrderReq, delCartReq, getAllCartReq } from '../redux/action/actionReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiCartDownload } from 'react-icons/bi';

const ApplyButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#3f51b5',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const CreateOrder: React.FC = () => {
  const { items, message, refresh } = useSelector((state: any) => state.salesReducers);
  const { order, messagee, refreshh } = useSelector((state: any) => state.orderReducers);

  const dispatch = useDispatch();

  const [isAccountValid, setIsAccountValid] = useState(false);
  // const [totalPrice, setTotalPrice] = useState(0);

  const [selectedFintech, setSelectedFintech] = useState('');
  const handleAccountFintechClick = (fintech: string) => {
    setSelectedFintech(fintech);
  };

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [removeItemId, setRemoveItemId] = useState(0);

  const router = useRouter();
  const { totalPrice, accountNumber, fintechName, userName, spof_id, spof_discount }:any = router.query;
  const totalPriceString = Array.isArray(totalPrice) ? totalPrice[0] : totalPrice;
  const totalPriceNumber = parseInt(totalPriceString || "0");

  useEffect(() => {
    dispatch(getAllCartReq());
  }, [refresh]);
  console.log(items);

// Fungsi untuk menghasilkan nomor pesanan acak
const generateOrderNumber = () => {
  const prefix = 'ORDER';
  const characters = '0123456789';
  let randomNumber = '';
  for (let i = 0; i < 6; i++) {
    randomNumber += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `${prefix}${randomNumber}`;
};


// Fungsi untuk menghasilkan kode nomor TRPA acak
const generateTrpaCodeNumber = () => {
  const prefix = 'TRPA';
  const characters = '0123456789';
  let randomNumber = '';
  for (let i = 0; i < 6; i++) {
    randomNumber += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `${prefix}${randomNumber}`;
};


// Fungsi untuk menghasilkan kode lisensi acak
const generateLicenseCode = () => {
  const prefix = 'LICENSE';
  const characters = '0123456789';
  let randomNumber = '';
  for (let i = 0; i < 5; i++) {
    randomNumber += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `${prefix}${randomNumber}`;
};


// Menggunakan generator untuk mendapatkan nilai acak
const handleCreateOrder = async () => {
  const trpaCodeNumber = generateTrpaCodeNumber();

  const cartItems = items.map((item:any) => {
    return {
      cait_id: item.cait_id,
      cait_quantity: item.cait_quantity,
      cait_unit_price: totalPrice,
      cait_user_entity_id: item.cait_user_entity_id,
      cait_prog_entity_id: item.cait_prog_entity_id,
    };
  });

  const dummyData = {
    cartItems,
    p_sohe_order_number: generateOrderNumber(),
    p_sohe_account_number: accountNumber,
    p_sohe_trpa_code_number: trpaCodeNumber,
    p_sohe_license_code: generateLicenseCode(),
    p_sohe_user_entity_id: items[0].cait_user_entity_id,
    p_sohe_status: 'open',
    p_sode_unit_discount: parseFloat(spof_discount),
    p_sode_soco_id: parseInt(spof_id),
  };

  try {
    await dispatch(addOrderReq(dummyData));
    // Pindahkan halaman ke '/sales/receipt' setelah memasukkan data
    router.push({
      pathname: '/sales/receipt',
      query: { totalPrice, accountNumber, fintechName, userName, trpaCodeNumber },
    });
  } catch (error) {
    // Handle error jika terjadi kegagalan
    console.error('Gagal memasukkan data:', error);
  }
};





  // useEffect(() => {
  //   calculateTotalPrice();
  // }, [items]);

  // const calculateTotalPrice = () => {
  //   if (items && items.length > 0) {
  //     const total = items.reduce((accumulator: number, course: any) => {
  //       const price = parseFloat(course.prog_price.replace(/[^0-9.-]+/g, ""));
  //       return accumulator + price;
  //     }, 0);
  //     setTotalPrice(total);
  //   } else {
  //     setTotalPrice(0); // Set total price to 0 if there are no items
  //   }
  // };

  const handleRemoveCartItem = (id: number) => {
    setRemoveItemId(id);
    setShowRemoveModal(true);
  };

  const confirmRemoveCartItem = () => {
    dispatch(delCartReq(removeItemId));
    toast.success('Item removed from cart'); // Menampilkan pesan berhasil
    setShowRemoveModal(false);
  };

  const cancelRemoveCartItem = () => {
    setShowRemoveModal(false);
  };

  const handleCancelOrder = () => {
    router.push('/sales/checkout');
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container mx-auto p-4">
      <p className="text-lg font-bold text-red-600">
  <span className="cart-icon bg-red-500 text-white px-2 py-1 rounded mr-2">
    {items.length}
  </span>
  Course in cart
  <BiCartDownload className="inline-block ml-2" />
</p>
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
                <p className="text-3xl font-bold text-gray-800">Rp. {totalPriceNumber.toLocaleString()}</p>

                <button className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-lg mt-4 flex items-center justify-center flex-row-reverse"
                  onClick={handleCreateOrder}
                >
                  <MdShoppingCart className="ml-2" />
                  Create Order
                </button>

                <button
                  className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-lg mt-4 flex items-center justify-center flex-row-reverse"
                  onClick={handleCancelOrder}
                >
                  <MdRemoveShoppingCart className="ml-2" />
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="items-center p-4 bg-white mt-2">
            <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-green-500 to-blue-500 bg-clip-text text-transparent ">Payment via {fintechName}</p>
            <p className="text-lg font-semibold italic bg-gradient-to-r from-gray-800 via-green-500 to-blue-500 bg-clip-text text-transparent ">Account Number: {accountNumber}</p>
            <p className="text-lg font-semibold italic bg-gradient-to-r from-gray-800 via-green-500 to-blue-500 bg-clip-text text-transparent ">Account Name: {userName}</p>
            <p className="text-lg font-semibold italic bg-gradient-to-r from-gray-800 via-green-500 to-blue-500 bg-clip-text text-transparent ">Credit: Rp. {totalPriceNumber.toLocaleString()}</p>
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

export default CreateOrder;
