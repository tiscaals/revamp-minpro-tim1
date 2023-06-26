import ContentLink from '@/pages/contentlink';
import React, { Fragment, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Pagination from '../../../../src/pages/komponen/pagination';
import Link from 'next/link';
import { Input, Option, Select, Switch } from '@material-tailwind/react';
import { Menu, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  doRequestGetJobPost,
  doRequestUpdateStatus,
} from '@/pages/redux/jobhire-schema/action/actionReducer';
import {
  doRequestGetIndustry,
  doRequestGetJobrole,
} from '@/pages/redux/master-schema/action/actionReducer';
import DeleteJobPost from './delete';

const columns = [
  { name: 'TITLE' },
  { name: 'START END DATE' },
  { name: 'UP TO SALARY' },
  { name: 'EXPERIENCE' },
  { name: 'INDUSTRY' },
  { name: 'PUBLISH' },
  { name: '' },
];

const Jobs = () => {
  const { job_post, refresh } = useSelector(
    (state: any) => state.JobPostReducers
  );
  const dispatch = useDispatch();

  const { industry } = useSelector((state: any) => state.IndustryReducers);
  const { job_role } = useSelector((state: any) => state.JobroleReducers);

  const [searchValue, setSearchValue] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [filteredData, setFilteredData]: any = useState([]);

  const [dataJoopo, setDataJopo] = useState('');

  {
    /* Current & Items per page */
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSearchChange = () => {
    setCurrentPage(1);
    setIsSearching(true);
    const searched = job_post.filter((item: any) => {
      const jopoTitle = item.jopo_title?.toLowerCase() ?? '';
      const jopoMinExperience =
        typeof item.jopo_min_experience === 'string'
          ? item.jopo_min_experience.toLowerCase()
          : '';
      const clitInduCode = item.clit_indu_code?.toLowerCase() ?? '';

      return (
        jopoTitle.includes(searchValue.toLowerCase()) ||
        jopoMinExperience.includes(searchValue.toLowerCase()) ||
        clitInduCode.includes(searchValue.toLowerCase())
      );
    });

    const filtered = searchFilter
      ? searched.filter((item: any) => item.jopo_open === searchFilter)
      : searched;

    setFilteredData(filtered);
  };

  const displayData = isSearching ? filteredData : job_post;

  {
    /* UNTUK PAGING START */
  }
  const totalPages = Math.ceil(displayData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = displayData?.slice(startIndex, endIndex);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  {
    /* UNTUK PAGING START END*/
  }

  useEffect(() => {
    dispatch(doRequestGetJobPost());
    setTimeout(() => {
      console.log('post', job_post);
      console.log('CURRENT ITEMS', currentItems);
    }, 2000);
  }, [currentPage, itemsPerPage, refresh]);

  useEffect(() => {
    dispatch(doRequestGetIndustry());
    dispatch(doRequestGetJobrole());
  }, [job_post]);

  const handlePublishChange = (event: any, data: any) => {
    const status = event.target.checked ? 'publish' : 'draft';

    const union = { id: data, status: status };
    console.log('union', union);
    dispatch(doRequestUpdateStatus(union));
  };

  return (
    <div>
      <ContentLink title="JOB POSTING" isilink="jobs/new" button="Posting Job">
        {/* <div className="container"> */}
        <div className="w-full lg:pb-6">
          <div className="pt-6 lg:flex lg:flex-wrap items-center lg:justify-center">
            <div className="pb-2 lg:pb-0">
              <h1>Search by Category</h1>
            </div>

            <div className="pb-2 lg:pb-0 lg:pl-4">
              <Input
                label="Title, Experience, Industry"
                type="text"
                id="simple-search"
                icon={<AiOutlineSearch className="h-4 w-4" />}
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
              />
            </div>

            <div className="pb-4 lg:pb-0 lg:pl-4">
              <Select
                label="Pilih Filter"
                onChange={value => setSearchFilter(value || '')}
              >
                <Option value="">All</Option>
                <Option value="1">Open</Option>
                <Option value="0">Closed</Option>
              </Select>
            </div>

            <div className="pb-2 lg:pb-0 lg:pl-4">
              <button
                className="w-full text-center text-white order-0  px-4 py-2  border rounded-md bg-blue-400 text-sm font-medium focus:ring-blue-500  uppercase hover:bg-blue-500"
                onClick={handleSearchChange}
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>

        {/* TABEL */}
        <div className="min-w-full flex justify-center shadow-md sm:rounded-lg">
          <table className="w-full table-fixed mx-auto">
            {/* TABLE HEADER */}
            <thead>
              <tr className="border-t border-gray-200">
                {(columns || []).map(col => (
                  <th
                    scope="col"
                    className="px-6 py-3 text-center border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <span className="lg:pl-2">{col.name}</span>
                  </th>
                ))}
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {(currentItems || []).map((dt: any, index: any) => (
                <tr className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 text-center"
                  >
                    {dt.jopo_title}
                  </th>
                  <td className="px-6 py-4 text-center">
                    {dt.jopo_start_date}
                    <br></br>
                    {dt.jopo_end_date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    IDR {dt.jopo_min_salary}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {dt.jopo_min_experience} Tahun
                  </td>
                  <td className="px-6 py-4 text-center">
                    {/* Industry */}
                    {industry.map((option: any) =>
                      dt.clit_indu_code === option.indu_code ? (
                        <h2 key={option.indu_code}>{option.indu_name}</h2>
                      ) : null
                    )}
                    {/* {dt.indu_name} */}

                    {/* Job Role */}
                    {job_role.map((option: any) =>
                      dt.jopo_joro_id === option.joro_id ? (
                        <h2 key={option.joro_id}>{option.joro_name}</h2>
                      ) : null
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <label className="relative inline-flex items-center  cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={dt.jopo_status === 'publish'}
                        onChange={event =>
                          handlePublishChange(event, dt.jopo_entity_id)
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full text-right">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
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
                          <Menu.Items className="absolute right-7 -mt-[4rem] mr-2 w-24 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    href={{
                                      pathname: 'jobs/edit',
                                      query: {
                                        id: dt.jopo_entity_id,
                                      },
                                    }}
                                    className={`${
                                      active
                                        ? 'bg-blue-400 text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    Edit
                                  </Link>
                                )}
                              </Menu.Item>
                            </div>

                            <div className="px-1 py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      setDataJopo(dt);
                                      setIsDelete(true);
                                    }}
                                    className={`${
                                      active
                                        ? 'bg-blue-400 text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    Delete
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </ContentLink>
      {isDelete ? (
        <DeleteJobPost
          show={isDelete}
          closeModal={() => setIsDelete(false)}
          data={dataJoopo}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Jobs;
