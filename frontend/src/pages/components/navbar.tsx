import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
    const router = useRouter();
    const [isProgramDropdownOpen, setProgramDropdownOpen] = useState(false);
    const [isCourseDropdownOpen, setCourseDropdownOpen] = useState(false);
    const [isJobHiringDropdownOpen, setJobHiringDropdownOpen] = useState(false);
    const [isAboutDropdownOpen, setAboutDropdownOpen] = useState(false);

    const handleProgramDropdown = () => {
        setProgramDropdownOpen(!isProgramDropdownOpen);
    };

    const handleCourseDropdown = () => {
        setCourseDropdownOpen(!isCourseDropdownOpen);
    };

    const handleJobHiringDropdown = () => {
        setJobHiringDropdownOpen(!isJobHiringDropdownOpen);
    };

    const handleAboutDropdown = () => {
        setAboutDropdownOpen(!isAboutDropdownOpen);
    };

    const [isSignupClicked, setSignupClicked] = useState(false);
    const [isSigninClicked, setSigninClicked] = useState(false);

    const handleSignupClick = () => {
        setSignupClicked(true);
        setSigninClicked(false);
    }    
        const handleSigninClick = () => {
            setSignupClicked(false);
            setSigninClicked(true);
    }

    return (
        <nav className="bg-blue-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/" passHref>
                                <div className={`text-white font-bold text-xl ${router.pathname === '/' ? 'underline' : ''}`}>Logo</div>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block justify-center">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <div className="relative">
                                <button
                                    onClick={handleProgramDropdown}
                                    className={`flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${router.pathname === '/programs' ? 'underline' : ''}`}
                                >
                                    Programs
                                    <svg
                                        className={`ml-1 h-5 w-5 transition-transform ${isProgramDropdownOpen ? 'transform rotate-180' : ''}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6 8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                {isProgramDropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                Bootcamp Reguler
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                Bootcamp Online
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                Bootcamp Corporate
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <button
                                    onClick={handleCourseDropdown}
                                    className={`flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${router.pathname === '/online-course' ? 'underline' : ''}`}
                                >
                                    Online Course
                                    <svg
                                        className={`ml-1 h-5 w-5 transition-transform ${isCourseDropdownOpen ? 'transform rotate-180' : ''}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6 8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                {isCourseDropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                Programming
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                Development
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                Mobile
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                UI/UX Design
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                Machine Learning
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                Data Scientist
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                Database
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                Digital Marketing
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <button
                                    onClick={handleJobHiringDropdown}
                                    className={`flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${router.pathname === '/job-hiring' ? 'underline' : ''}`}
                                >
                                    Job Hiring
                                    <svg
                                        className={`ml-1 h-5 w-5 transition-transform ${isJobHiringDropdownOpen ? 'transform rotate-180' : ''}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6 8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                {isJobHiringDropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                Our Graduates
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                Professional Hiring
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <button
                                    onClick={handleAboutDropdown}
                                    className={`flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${router.pathname === '/about' ? 'underline' : ''}`}
                                >
                                    About
                                    <svg
                                        className={`ml-1 h-5 w-5 transition-transform ${isAboutDropdownOpen ? 'transform rotate-180' : ''}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6 8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                {isAboutDropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                Alumni Testimoni
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                About Us
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div  className="flex">
                <button
                  onClick={handleSignupClick}
                  className={`flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isSignupClicked ? 'bg-blue-500 text-white' : ''}`}
                  style={{ transition: 'background-color 0.3s, color 0.3s, transform 0.3s' }}
                >
                  {isSignupClicked ? 'Clicked' : 'Signup'}
                </button>
             
                <button
                  onClick={handleSigninClick}
                  className={`flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isSigninClicked ? 'bg-blue-500 text-white' : ''}`}
                  style={{ transition: 'background-color 0.3s, color 0.3s, transform 0.3s' }}
                >
                  {isSigninClicked ? 'Clicked' : 'Signin'}
                </button>
              </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
