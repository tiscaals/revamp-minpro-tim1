import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  reqdataemployee,
  reqplacement,
  reqsearchusers,
} from '../../redux/hr-schema/action/actionReducer';
import { FaUserPlus } from 'react-icons/fa';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { BsThreeDotsVertical, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { BiEditAlt, BiDetail } from 'react-icons/bi';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import { Menu, Transition } from "@headlessui/react";
import SearchEmployee from './searchEmployee';
import EditEmployee from './updateemployee';
import Link from 'next/link';


const Employee = () => {
  let { placement, message, refresh } = useSelector(
    (state: any) => state.hrReducers
  );

  let dispatch = useDispatch();
  const router = useRouter();

  const column = [
    { name: 'Employee' },
    { name: 'Position' },
    { name: 'Employee Code' },
    { name: 'Employee Type' },
    { name: 'Status' },
  ];
  // search
  const [searchValue, setSearchValue] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [filteredData, setFilteredData] = useState('')
  // const [isSelect, setIsSelect] = useState('')
  // const [isDetail, setIsDetail] = useState('')

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
    const filtered = placement.filter((item: any) => item.user_first_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      item.user_last_name.toLowerCase().includes(e.target.value) || item.emp_emp_number.toLowerCase().includes(e.target.value)
      || item.emp_type.toLowerCase().includes(e.target.value)
    );

    setIsSearching(true);
    setFilteredData(filtered);
  };
  const display = isSearching ? filteredData : placement;
  const [isCreateEmp, setIsCreateEmp] = useState(false);
  const [isEditEmp, setIsEditEmp] = useState(false);
  const [Data,setData] = useState()

  // pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPage = placement ? Math.ceil(placement.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = placement ? placement.slice(startIndex, endIndex) : 0;

  const isDisabled = currentPage === 1;
  const isDisabledr = currentPage === totalPage;


  useEffect(() => {
    dispatch(reqplacement());
    console.log(placement);
  }, [currentPage, itemsPerPage, refresh]);

  return (
    <>
      {isCreateEmp ? (
        <SearchEmployee
          show={isCreateEmp}
          closeModal={(): any => setIsCreateEmp(false)}
        />
      ) : (
        ''
      )}
      {isEditEmp ? (
        <EditEmployee
          show={isEditEmp}  data={Data}
          closeModal={(): any => setIsEditEmp(false)}
        />
      ) : (
        ''
      )}
      <Card className=" h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Members list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all members
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                color="blue"
                size="sm"
                onClick={() => {
                  setIsCreateEmp(true);
                }}
              >
                <FaUserPlus className="h-4 w-4" /> Create Employee
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<HiMagnifyingGlass className="h-5 w-5" />}
                onChange={e => handleSearchChange(e)}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {column.map(head => (
                  <th
                    key={head.name}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head.name}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(currentItems || []).map((dt: any, index: any) => {
                const isLast = index === currentItems.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';
                const fullname = dt.user_first_name + ' ' + dt.user_last_name;
                return (
                  <tr key={dt.id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          className="object-center object-cover"
                          src={dt.user_photo}
                          alt={dt.user_name}
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {fullname}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {dt.user_email_promotion}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal capitalize"
                        >
                          {dt.joro_name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {'org@codex.ac'}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal uppercase"
                        >
                          {dt.emp_emp_number}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal capitalize"
                      >
                        {dt.emp_type}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {/* <Tooltip ="Edit User"> */}
                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <BsThreeDotsVertical
                              className="ml-2 -mr-1 h-5 w-5 text-gray-700 hover:text-gray-400 sm:flex"
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
                          <Menu.Items className="z-50 absolute right-7 mt-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href={{
                                    pathname: 'employee/detail-employee',
                                    query: {
                                      id: dt.user_entity_id
                                    }
                                  }}
                                    // button
                                    // onClick={() => {
                                    //   setIsDetailEmp(true)
                                    //   // router.push(`/detail-employee/id?=${dt.user_entity_id}`);
                                    //   router.push(`/detail-employee?user_entity_id=${dt.user_entity_id}`);
                                    // }}
                                    className={`${active
                                      ? "bg-blue-500 text-white"
                                      : "text-gray-900"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    {active ? (
                                      <BiDetail
                                        className="mr-2 h-5 w-5  text-violet-400"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <BiDetail
                                        className="text-gray-900 mr-2 h-5 w-5  text-violet-400"
                                        aria-hidden="true"
                                      />
                                    )}
                                    Detail Employee
                                  </Link>
                                )}
                              </Menu.Item>
                            </div>
                            <div className="px-1 py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      setIsEditEmp(true);
                                      setData(dt);
                                    }}
                                    className={`${active
                                      ? "bg-blue-500 text-white"
                                      : "text-gray-900"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    {active ? (
                                      <BiEditAlt
                                        className="mr-2 h-5 w-5 text-violet-400"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <BiEditAlt
                                        className="text-gray-900 mr-2 h-5 w-5 text-violet-400"
                                        aria-hidden="true"
                                      />
                                    )}
                                    Edit Data
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      {/* </Tooltip> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className=" items-center justify-between border-t border-blue-gray-50 p-4">

          <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
            <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                  <span className="font-medium">{endIndex}</span> of{" "}
                  <span className="font-medium">{placement ? placement.length : 0}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <button
                    // href="#"
                    className="inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                    disabled={isDisabled}
                  >
                    <span className="sr-only">Previous</span>
                    <BsArrowLeftShort className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {Array.from({ length: totalPage }).map((_: any, index: any) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === currentPage;

                    return (
                      <button
                        key={pageNumber}
                        // href="#"
                        className={`relative inline-flex items-center ${isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-offset-0"
                          } px-4 py-2 text-sm font-semibold`}
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

                  <button
                    // href="/${nextPage}"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    disabled={isDisabledr}
                  >
                    <span className="sr-only">Next</span>
                    <BsArrowRightShort className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default Employee;
