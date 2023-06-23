import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCurrReq } from '../redux/curriculum-schema/action/actionReducer';
import Content from './content';
import { Menu, Transition } from '@headlessui/react';
import { BsFillPencilFill, BsThreeDotsVertical, BsTrash } from 'react-icons/bs';
import { Chip, Rating } from '@material-tailwind/react';
import ContentLink from '../contentlink';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  CardBody,
  Typography,
  CardFooter,
  Button,
  Select,
  Option,
} from '@material-tailwind/react';
import Pagination from '../pagination';
import Link from 'next/link';

const Curriculum = () => {
  const { curriculum, message, status, refresh } = useSelector(
    (state: any) => state.curriculumReducers
  );
  // console.log(curriculum);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isSelect, setIsSelect] = useState('');
  const [data, setData] = useState("");
  // console.log(isSelect);

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
    const filtered = curriculum.filter(
      (item: any) =>
        item.prog_title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.prog_headline.toLowerCase().includes(e.target.value)
    );
    setIsSearching(true);
    setFilteredData(filtered);
  };

  const handleSelect = ()=>{
    const filter = curriculum.filter(
      (item:any)=>
      item.prog_status.toLowerCase().includes(isSelect.toLowerCase())
    )
    setIsSearching(true);
    setFilteredData(filter);
  }

  

  const displayData = isSearching ? filteredData : curriculum;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(displayData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = displayData?.slice(startIndex, endIndex);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getAllCurrReq());
    
  }, [refresh, searchValue]);

  const column = [
    { name: 'Name' },
    { name: 'Title' },
    { name: 'Duration' },
    { name: 'Total' },
    { name: 'Type' },
    { name: 'Rating' },
  ];

  // console.log(searchValue);
  return (
    <div>
      <ContentLink
        title="curriculum"
        isilink="/curriculum/create"
        button="Create"
      >
        <div className="w-full lg:pb-6">
          <div className="pt-6 lg:flex lg:flex-wrap items-center lg:justify-center">
            <div className="pb-2 lg:pb-0">
              <h1>Search by category</h1>
            </div>

            <div className="pb-2 lg:pb-0 lg:pl-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className=" text-sm rounded-lg block w-full pl-8 p-2.5 ring-1 lg:w-[17rem] "
                  placeholder="name, title"
                  value={searchValue}
                  onChange={e => handleSearchChange(e)}
                />
              </div>
            </div>

            <div className="w-72">
              <Select onChange={(e:any)=>setIsSelect(e)}>
                <Option value="">Status</Option>
                <Option value="publish">publish</Option>
                <Option value="draft">draft</Option>
              </Select>
            </div>
            <div className="pb-2 lg:pb-0 lg:pl-4">
              <button
                className="w-full text-center text-white order-0  px-4 py-2  border rounded-md bg-blue-400 text-sm font-medium focus:ring-blue-500  uppercase hover:bg-blue-500"
                onClick={handleSelect}
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr className="border-t border-gray-300">
                {column.map((col, index) => (
                  <th
                    key={index}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {col.name}
                    </Typography>
                  </th>
                ))}
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(displayData || []).map((item: any, index: any) => (
                <tr key={index}>
                  <td className="py-4 px-6 text-left whitespace-nowrap">
                    {item.prog_headline}
                  </td>
                  <td className="py-4 px-6 text-left whitespace-nowrap">
                    {item.prog_title}
                  </td>
                  <td className="py-4 px-6 text-left whitespace-nowrap">
                    {item.prog_duration}
                  </td>
                  <td className="py-4 px-6 text-left whitespace-nowrap">
                    {item.prog_total_trainee + ' members'}
                    <br />
                    {item.total_batch + ' batchs'}
                  </td>
                  <td className="py-4 px-6 text-left whitespace-nowrap">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={item.prog_learning_type}
                      color={
                        item.prog_learning_type === 'online'
                          ? 'green'
                          : 'blue-gray'
                      }
                    />
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500 text-left">
                    <Rating value={item.ratings} readonly/>
                  </td>
                  <td className="py-4 px-6 text-left whitespace-nowrap">
                    <Menu>
                      <Menu.Button>
                        <BsThreeDotsVertical size={20} />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <Link 
                                href={{
                                  pathname:"curriculum/edit",
                                  query: {
                                    id:item.prog_entity_id
                                  },
                                }}
                                  className={`${active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}                              >
                                
                                  
                                  <BsFillPencilFill className="mr-2" />
                                  Edit
                                  </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700'
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                  <BsTrash className="mr-2" />
                                  Delete
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
        <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2">
            <Pagination 
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            ></Pagination>
          </footer>
      </ContentLink>
    </div>
  );
};

export default Curriculum;
