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
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PaymentsIcon from '@mui/icons-material/Payments';

import { MdOutlineRemoveShoppingCart, MdOutlineShoppingCart, MdRemoveShoppingCart, MdShoppingCart } from 'react-icons/md';

const ApplyButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#3f51b5',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.1)',
    },
}));

const CreateOrder: React.FC = () => {
    const [isAccountValid, setIsAccountValid] = useState(false);
    const router = useRouter();

    const handleCancelOrder = () => {
        router.push('/sales/checkout'); // Navigate to the checkout page
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
                                            <p className="text-gray-600">Rp. 3.500.000</p>
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
                                <PaymentsIcon className="ml-2" />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <div className="grid grid-cols-1 gap-4 h-full">
                            <div className="p-5 y-1 bg-white rounded-lg shadow-lg flex flex-col">
                                <p className="text-lg font-bold text-gray-800">Total:</p>
                                <p className="text-3xl font-bold text-gray-800">Rp. 3.500.000</p>

                                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-lg mt-4 flex items-center justify-center flex-row-reverse"
                                >
                                    <MdShoppingCart className="ml-2" />
                                    Cancel Order
                                </button>

                                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-lg mt-4 flex items-center justify-center flex-row-reverse"
                                    onClick={handleCancelOrder}
                                >
                                    <MdRemoveShoppingCart className="ml-2" />
                                    Cancel Order
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-lg mt-2">
                    <p className="text-lg font-bold text-gray-800">Your account is valid, please continue to complete</p>
                </div>

            </div>
        </>
    );
}

export default CreateOrder;
