import React, { Fragment, useEffect, useState } from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
  Button,
  IconButton,
  Avatar,
  ButtonGroup,
  Input,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { Menu, Transition } from '@headlessui/react';
import {
  BsThreeDotsVertical,
  BsPencil,
  BsPencilFill,
  BsTrash,
  BsTrashFill,
} from 'react-icons/bs';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { doRequestGetRoac } from '../../redux/master-schema/action/actionReducer';
import { doRequestGetCandidate, doRequestUpdateCandidate } from '../../redux/jobhire-schema/action/actionReducer';
import Pagination from '../../komponen/pagination';
// import {
//   editParogReq,
//   editPrapReq,
//   getAllCandidatesReq,
//   getAllRoutesReq,
// } from '../redux/bootcamp-schema/action/actionReducer';

export default function Candidates() {
  const dispatch = useDispatch();
  const { routes } = useSelector((state: any) => state.RouteactionReducers);
  const { candidates, refresh } = useSelector((state: any) => state.TalentReducers);

  const [idProgress, setIdProgress] = useState();
  const [selectRoute, setSelectRoute] = useState('Apply');
  const [score, setScore] = useState();
  const [status, setStatus] = useState('');
  const [route, setRoute] = useState<string>('Apply');
  const [nextRoute, setNextRoute] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(doRequestGetRoac());
    dispatch(doRequestGetCandidate());
    console.log("CANDIDATES", candidates);
  }, [route, refresh]);

  useEffect(() => {
    if (routes) {
      setSelectRoute(route);
    }
  }, [routes]);

  const handleRoute = (routeName: string) => {
    setSelectRoute(routeName);
    setRoute(routeName);

    const currentIndex = routes.findIndex((r: any) => r.roac_name === routeName);
    console.log("CURRENT INDEX", currentIndex);

    const nextIndex = currentIndex + 1;

    if (nextIndex < routes.length) {
      const nextRoute = routes[nextIndex].roac_name;
      setNextRoute(nextRoute);
      console.log("NEXT ROUTE", nextRoute);
    } else {
      setNextRoute('');
    }
  };

  const filteredData =
    selectRoute != '' ? 
    candidates?.filter(
      (item: any) => item.tapr_progress_name === selectRoute)
    : candidates;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData?.slice(startIndex, endIndex);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  if (routes.length === 0 && candidates.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <div className="bg-white px-7 py-3 rounded-md">
      <div className="my-4">
        <p className="text-gray-700 text-2xl font-bold ">Pro-Hire Candidates</p>
      </div>
      {routes ? (
        <Tabs value={selectRoute}>
          {/* <div className="flex justify-end">
            <div className="w-72">
              <Select label="Select Filtered">
                <Option>Filter by Year</Option>
                <Option>Filter by Month</Option>
                <Option>Filter by Week</Option>
              </Select>
            </div>
            <div className="w-13">
              <Select label="Select">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
            </div>
          </div> */}
          <TabsHeader className="my-5">
            {routes.map((item: any, index: any) => (
              <Tab
                key={item.roac_name}
                value={item.roac_name}
                onClick={() => handleRoute(item.roac_name)}
              >
                {item.roac_name}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            <table>

            </table>
          </TabsBody>
        </Tabs>
      ) : (
        <div className="bg-red-600">loading...</div>
      )}
      <table className="min-w-full table-fixed ">
        <tbody className="divide-y ">
          {(currentItems || []).length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-6 text-red-300">
                No data found
              </td>
            </tr>
          ) : (
            (currentItems || []).map((dt: any, index: any) => (
              <tr key={dt.id}>
                <td className="py-3 text-gray-900">
                  <Avatar src={`http://localhost:3003/image/profile/${dt.user_photo}`} />
                </td>
                <td className="py-3 text-gray-900">
                  <Typography variant="h6" color="blue-gray">
                    {dt.user_first_name} {dt.user_last_name}
                  </Typography>
                </td>
                <td className="py-3 text-gray-900">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="opacity-70"
                  >
                    {dt.pmail_address}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="opacity-70 italic"
                  >
                    {dt.uspo_ponty_code}{dt.uspo_number}
                  </Typography>
                </td>
                <td className="py-3 text-gray-900">
                  <Typography variant="small" color="blue-gray">
                    {dt.jopo_title}
                  </Typography>
                </td>
                <td className="py-3 text-gray-900">
                  <Typography variant="small" color="blue-gray">
                    Mendaftar pada {dt.taap_modified_date.substring(0, 10)}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="opacity-70"
                  >
                    Status: {dt.taap_status}
                  </Typography>
                </td>
                {selectRoute==='Interview'||selectRoute==='Succeed'||selectRoute==='Failed'?
                <td className="py-3 text-gray-900">
                  <Typography variant="small" color="blue-gray">
                    Filtering test score: {dt.taap_scoring}
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="opacity-70 italic">
                  "{dt.tapr_comment}"
                  </Typography>
                </td>
                :null}
                <td className="py-3 text-gray-900">
                  <div className="w-full text-right">
                    <Menu as="div" className="relative inline-block text-left ">
                      <div>
                        {route === 'Failed' || route === 'Succeed' ? null :
                        <Menu.Button
                          onClick={() => setIdProgress(dt.taap_entity_id)}
                          className="inline-flex w-full justify-center rounded-md 
                        bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-white 
                        focus-visible:ring-opacity-75"
                        >
                          <BsThreeDotsVertical
                            className="h-5 w-5 text-black hover:text-violet-100"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                        }
                      </div>

                      {/* ------ Switch Status ------ */}
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="z-30 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg bg-white p-3 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-1 py-1">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="mb-2"
                            >
                              Switch Status
                            </Typography>
                            <form>
                              <div className="flex flex-col gap-3">
                                {route === 'Filtering Test' ? (
                                  <>
                                    <Input
                                      label="Score Filtering Test"
                                      type="number"
                                      onChange={(e: any) => 
                                        setScore(e.target.value)
                                      }
                                    />
                                    {score?
                                      <>
                                      <Input
                                      labelProps={{
                                        className: "hidden" 
                                      }}
                                      className={
                                        score < 50
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-green-100 text-green-800'
                                      }
                                      value={
                                        score < 50
                                        ? 'Failed'
                                        : 'Passed'
                                      }
                                      />
                                      </>
                                    : null}
                                    <Textarea
                                      label="Review"
                                      onChange={(e: any) =>
                                        setComment(e.target.value)
                                      }
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() =>{
                                        {score ? 
                                          score < 50 ? setStatus('Failed') : setStatus(nextRoute)
                                        : ''};
                                        console.log("STATUS AT BUTTON",status);
                                        dispatch(
                                          doRequestUpdateCandidate({
                                            id: dt.taap_user_entity_id,
                                            taap_status: status.toLowerCase(),
                                            tapr_progress_name: status,
                                            taap_scoring: score,
                                            tapr_comment: comment
                                          })
                                        );
                                        console.log("STATUS",status);
                                      }}
                                    >
                                      Submit
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Select
                                      onChange={(e: any) => setStatus(e)}
                                      label="Set Status"
                                      value={route}
                                    >
                                      {routes.map((item: any) => (
                                        <Option value={item.roac_name}>
                                          {item.roac_name}
                                        </Option>
                                      ))}
                                    </Select>
                                    <Button
                                      size="sm"
                                      onClick={() => {
                                        dispatch(
                                          doRequestUpdateCandidate({
                                            id: dt.taap_user_entity_id,
                                            taap_status: status.toLowerCase(),
                                            tapr_progress_name: status,
                                          })
                                        );
                                        // console.log("STATUS",status);
                                      }}
                                    >
                                      Submit
                                    </Button>
                                  </>
                                )}
                              </div>
                            </form>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      ></Pagination>
    </div>
  );
}