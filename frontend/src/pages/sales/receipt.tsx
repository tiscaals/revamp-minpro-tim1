import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import courseImage from '../../images/logokecil.png';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import Navbar from '../components/navbar';
import { useRouter } from 'next/router';
import PaymentsIcon from '@mui/icons-material/Payments';
import { getAllCartReq } from '../redux/action/actionReducer';
import { useDispatch, useSelector } from 'react-redux';

const ApplyButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#3f51b5',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const Invoice: React.FC = () => {
  const { items, message, refresh } = useSelector((state: any) => state.salesReducers);
  const dispatch = useDispatch();
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState(0);

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
      setTotalPrice(0); // Atur total harga ke 0 jika tidak ada item
    }
  };
  
  const handleCancelOrder = () => {
    router.push('/sales/checkout');
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2">
          <div className="col-span-1">
            <div className="grid grid-cols-1 gap-4">
              {items.map((course: any, index: any) => (
                <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-lg">
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
                        <p className="text-lg font-bold text-gray-800">{course.prog_headline}</p>
                        <p className="text-gray-600">{course.prog_title}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-gray-600">Rp. {course.prog_price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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

                <div className="mt-20">
                <p className="text-lg font-bold text-center text-gray-800">Thanks For Buying</p>
              </div>


              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="items-center p-4 bg-white mt-2">
            <p className="text-lg font-semi-bold text-gray-800">Payment via Fintech GoTo</p>
            <p className="text-lg font-semi-bold text-gray-800">Account Number : 081360089190</p>
            <p className="text-lg font-semi-bold text-gray-800">Account Name : Vendy Gulo</p>
            <p className="text-lg font-semi-bold text-gray-800">Credit : Rp. 3.500.000</p>
            <p className="text-lg font-semi-bold text-gray-800">Transaction Number : TRX-20221512-0001</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Invoice;
