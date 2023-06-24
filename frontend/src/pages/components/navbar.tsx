  import { Fragment, useState } from 'react';
  import { useRouter } from 'next/router';
  import Link from 'next/link';
  import { Menu, Transition } from '@headlessui/react';
  import { BsCaretDownFill, BsPencilFill, BsPersonCircle } from 'react-icons/bs';
  import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
  import Image from 'next/image';
  import logo from '../../images/codexlogo.png'

  const Navbar = () => {
    const [isProgramDropdownOpen, setIsProgramDropdownOpen] = useState(false);
    const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
    const [isJobHiringDropdownOpen, setIsJobHiringDropdownOpen] = useState(false);
    const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
    const [isSignupClicked, setIsSignupClicked] = useState(false);
    const [isSigninClicked, setIsSigninClicked] = useState(false);
    const [isBootcampRegulerDropdownOpen, setIsBootcampRegulerDropdownOpen] = useState(false);
    const [isBootcampOnlineDropdownOpen, setIsBootcampOnlineDropdownOpen] = useState(false);
    const [isBootcampCorporateDropdownOpen, setIsBootcampCorporateDropdownOpen] = useState(false);


    const [token, setToken] = useState('');
    const router = useRouter();

    const handleProgramDropdown = () => {
      setIsProgramDropdownOpen(!isProgramDropdownOpen);
    };

    const handleCourseDropdown = () => {
      setIsCourseDropdownOpen(!isCourseDropdownOpen);
    };

    const handleJobHiringDropdown = () => {
      setIsJobHiringDropdownOpen(!isJobHiringDropdownOpen);
    };

    const handleAboutDropdown = () => {
      setIsAboutDropdownOpen(!isAboutDropdownOpen);
    };

    const handleBootcampRegulerClick = () => {
      setIsBootcampRegulerDropdownOpen(!isBootcampRegulerDropdownOpen);
    };

    const handleBootcampOnlineClick = () => {
      setIsBootcampOnlineDropdownOpen(!isBootcampOnlineDropdownOpen);
    };

    const handleBootcampCorporateClick = () => {
      setIsBootcampCorporateDropdownOpen(!isBootcampCorporateDropdownOpen);
    };

    return (
      
      <nav className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex justify-center mt-4 mb-4">
                  <Image className="w-full h-auto" src={logo} alt="company logo" />
                </div>
              </div>
            </div>
            <div className="block md:hidden">
              <button
                className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={handleProgramDropdown}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className={`h-6 w-6 ${isProgramDropdownOpen ? 'hidden' : 'block'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`h-6 w-6 ${isProgramDropdownOpen ? 'block' : 'hidden'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden md:block justify-center">
              <div className="ml-10 flex items-baseline space-x-4">
                <div className="relative">
                  <button
                    onClick={handleProgramDropdown}
                    className={`flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${router.pathname === '/programs' ? 'underline' : ''
                      }`}
                  >
                    Programs
                    <svg
                      className={`ml-1 h-5 w-5 transition-transform ${isProgramDropdownOpen ? 'transform rotate-180' : ''
                        }`}
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
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem"
                          onClick={handleBootcampRegulerClick}
                        >
                          Bootcamp Reguler
                        </button>
                        <div className="relative">
    {isBootcampRegulerDropdownOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
          NodeJS Fullstack
        </button>
        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
          Java Fullstack
        </button>
        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
          .Net Fullstack
        </button>
        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
          Golang Fullstack
        </button>
        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
          Android Mobile
        </button>
        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
          Flutter
        </button>
      </div>
    )}
  </div>

                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem"
                          onClick={handleBootcampOnlineClick}
                        >
                          Bootcamp Online
                        </button>
                        <div className="relative">

                        {isBootcampOnlineDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                              NodeJS Fullstack
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                              Golang Fullstack
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                              Android Mobile
                            </button>
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                              Flutter
                            </button>
                          </div>
                        )}
  </div>
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem"
                          onClick={handleBootcampCorporateClick}
                        >
                          Bootcamp Corporate
                        </button>
                        <div className="relative">
                        {isBootcampCorporateDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                              .Net Technology
                            </button>
                          </div>
                        )}
                          </div> 
                      </div>
                    </div>
                  )}

                </div>
                <div className="relative">
                  <button
                    onClick={handleCourseDropdown}
                    className={`flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${router.pathname === '/online-course' ? 'underline' : ''
                      }`}
                  >
                    Online Course
                    <svg
                      className={`ml-1 h-5 w-5 transition-transform ${isCourseDropdownOpen ? 'transform rotate-180' : ''
                        }`}
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
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
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
                    className={`flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${router.pathname === '/job-hiring' ? 'underline' : ''
                      }`}
                  >
                    Job Hiring
                    <svg
                      className={`ml-1 h-5 w-5 transition-transform ${isJobHiringDropdownOpen ? 'transform rotate-180' : ''
                        }`}
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
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                          Software Engineer
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                          Web Developer
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                          Data Scientist
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={handleAboutDropdown}
                    className={`flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${router.pathname === '/about' ? 'underline' : ''
                      }`}
                  >
                    About
                    <svg
                      className={`ml-1 h-5 w-5 transition-transform ${isAboutDropdownOpen ? 'transform rotate-180' : ''
                        }`}
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
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <Link href="/about" passHref>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                            About Us
                          </button>
                        </Link>
                        <Link href="/contact" passHref>
                          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                            Contact Us
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center pr-4 md:pr-16 ">
              <Menu as="div" className="relative inline-block text-left">
                <div className="flex items-right">
                  <Menu.Button className="group flex items-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 md:mr-4">
                    <BsPersonCircle
                      className="h-6 w-6 mr-1 text-gray-700 group-hover:text-gray-400 sm:flex"
                      aria-hidden="true"
                    />
                    <BsCaretDownFill
                      className="h-4 w-4 text-gray-700 group-hover:text-gray-400 sm:flex group-aria-pressed:rotate-180"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {token ? (
                      <>
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                // onClick={()=>{setIsDelete(true); setDataUser(dt)}}
                                className={`${active ? 'bg-red-500 text-white' : 'text-gray-900'
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {active ? (
                                  <BsPencilFill
                                    className="mr-2 h-5 w-5 text-red-400"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <BsPencilFill
                                    className="mr-2 h-5 w-5 text-red-400"
                                    aria-hidden="true"
                                  />
                                )}
                                Edit Account
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => {
                                  localStorage.removeItem('AuthToken');
                                  router.reload();
                                }}
                                className={`${active ? 'bg-red-500 text-white' : 'text-gray-900'
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {active ? (
                                  <BiLogOutCircle
                                    className="mr-2 h-5 w-5 text-red-400"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <BiLogOutCircle
                                    className="mr-2 h-5 w-5 text-red-400"
                                    aria-hidden="true"
                                  />
                                )}
                                Logout
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => {
                                  router.push('/login');
                                }}
                                className={`${active ? 'bg-red-500 text-white' : 'text-gray-900'
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {active ? (
                                  <BiLogInCircle
                                    className="mr-2 h-5 w-5 text-red-400"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <BiLogInCircle
                                    className="mr-2 h-5 w-5 text-red-400"
                                    aria-hidden="true"
                                  />
                                )}
                                Login
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  export default Navbar;
