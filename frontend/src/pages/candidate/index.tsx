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
import {
  editParogReq,
  editPrapReq,
  getAllCandidatesReq,
  getAllRoutesReq,
} from '../redux/bootcamp-schema/action/actionReducer';

export default function Candidates() {
  const dispatch = useDispatch();
  const { routes } = useSelector((state: any) => state.routeReducers);
  const { candidates, refresh } = useSelector(
    (state: any) => state.candidateReducers
  );

  const [idProgress, setIdProgress] = useState();
  const [selectRoute, setSelectRoute] = useState('');
  const [grade, setGrade] = useState(0);
  const [status, setStatus] = useState('');
  const [route, setRoute] = useState<string>('apply');
  const [review, setReview] = useState('');
  const [prapstatus, setPrapstatus] = useState();

  useEffect(() => {
    dispatch(getAllRoutesReq());
    dispatch(getAllCandidatesReq());
  }, [route, refresh]);

  useEffect(() => {
    if (routes) {
      setSelectRoute(route);
    }
  }, [routes]);

  const handleRoute = (routeName: string) => {
    setSelectRoute(routeName);
    setRoute(routeName);
  };

  const filteredData =
    selectRoute === ''
      ? candidates
      : candidates?.filter(
          (item: any) => item.parog_progress_name === selectRoute
        );

  if (routes.length === 0 && candidates.length === 0) {
    return <div>loading...</div>;
  }

  // console.log(selectRoute);

  return (
    <div className="bg-white px-7 py-3 rounded-md">
      <div className="my-4">
        <p className="text-gray-700 text-2xl font-bold ">Candidates</p>
      </div>
      {routes ? (
        <Tabs value={route}>
          <div className="flex justify-end">
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
          </div>
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
        </Tabs>
      ) : (
        <div className="bg-red-600">loading...</div>
      )}
      <table className="min-w-full table-fixed ">
        <tbody className="divide-y ">
          {(filteredData || []).length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-6 text-red-300">
                No data found
              </td>
            </tr>
          ) : (
            (filteredData || []).map((dt: any, index: any) => (
              <tr key={dt.id}>
                <td className="py-3 text-gray-900">
                  <Avatar src={dt.user_photo} />
                </td>
                <td className="py-3 text-gray-900">
                  <Typography variant="small" color="blue-gray">
                    {dt.full_name}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="opacity-70"
                  >
                    {dt.emails[0].pmail_address}
                  </Typography>
                </td>
                <td className="py-3 text-gray-900">
                  <Typography variant="small" color="blue-gray">
                    {dt.usdu_school}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="opacity-70 italic"
                  >
                    {dt.usdu_field_study}
                  </Typography>
                </td>
                <td className="py-3 text-gray-900">
                  <Typography variant="small" color="blue-gray">
                    Lulus {dt.usdu_graduate_year}
                  </Typography>
                </td>
                <td className="py-3 text-gray-900">
                  <Typography variant="small" color="blue-gray">
                    {dt.phones[0]?.uspo_number}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="opacity-70"
                  >
                    {dt.phones[1]?.uspo_number}
                  </Typography>
                </td>
                <td className="py-3 text-gray-900">
                  <Typography variant="small" color="blue-gray">
                    {dt.prog_title}
                  </Typography>
                </td>
                <td className="py-3 text-gray-900">
                  <Typography variant="small" color="blue-gray">
                    {dt.join_date}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="opacity-70 italic"
                  >
                    {selectRoute === 'contract legal'
                      ? `${dt.prap_test_score}, ${dt.prap_status}`
                      : selectRoute === 'disqualified'
                      ? `${dt.prap_test_score}, failed`
                      : `${dt.parog_progress_name}`}
                  </Typography>
                </td>
                <td className="py-3 text-gray-900">
                  <div className="w-full">
                    <Menu as="div" className="relative inline-block text-left ">
                      <div>
                        <Menu.Button
                          onClick={() => setIdProgress(dt.parog_id)}
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
                                {route === 'filtering test' ? (
                                  <>
                                    <Input
                                      label="Score Filtering Test"
                                      type="number"
                                      onChange={(e: any) =>
                                        setGrade(e.target.value)
                                      }
                                    />
                                    <Input
                                      label={
                                        grade < 25
                                          ? 'failed'
                                          : grade >= 25 && grade < 50
                                          ? 'recommendation'
                                          : 'passed'
                                      }
                                      className={
                                        grade < 25
                                          ? 'disabled:bg-red-100 disabled:text-red-800'
                                          : grade >= 25 && grade < 50
                                          ? 'disabled:bg-orange-100 disabled:text-orange-800'
                                          : 'disabled:bg-green-100 disabled:text-green-800'
                                      }
                                      value={
                                        grade < 25
                                          ? 'failed'
                                          : grade >= 25 && grade < 50
                                          ? 'recommendation'
                                          : 'passed'
                                      }
                                      disabled
                                    />
                                    <Textarea
                                      label="Review"
                                      onChange={(e: any) =>
                                        setReview(e.target.value)
                                      }
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        dispatch(
                                          editPrapReq({
                                            userid: dt.user_entity_id,
                                            progid: dt.prog_entity_id,
                                            prap_test_score: grade,
                                            prap_review: review,
                                            prap_status:
                                              grade < 25
                                                ? 'failed'
                                                : grade >= 25 && grade < 50
                                                ? 'recommendation'
                                                : 'passed',
                                            parog_progress_name:
                                              grade < 25
                                                ? 'disqualified'
                                                : 'contract legal',
                                            parog_id: dt.parog_id,
                                          })
                                        )
                                      }
                                    >
                                      Submit
                                    </Button>
                                  </>
                                ) : route === 'disqualified' ||
                                  route === 'not responding' ? (
                                  <>
                                    <Select
                                      onChange={(e: any) => setPrapstatus(e)}
                                      label="Set Status"
                                    >
                                      <Option value="recommendation">
                                        Recommendation
                                      </Option>
                                    </Select>
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        dispatch(
                                          editPrapReq({
                                            userid: dt.user_entity_id,
                                            progid: dt.prog_entity_id,
                                            prap_test_score: dt.prap_test_score,
                                            prap_review: dt.prap_review,
                                            prap_status: prapstatus,
                                            parog_progress_name:
                                              'contract legal',
                                            parog_id: dt.parog_id,
                                          })
                                        )
                                      }
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
                                      onClick={() =>
                                        dispatch(
                                          editParogReq({
                                            id: idProgress,
                                            parog_progress_name: status,
                                          })
                                        )
                                      }
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
      <div className="flex justify-center">
        <div className="flex items-center gap-4">
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-2"
            // onClick={prev}
            // disabled={active === 1}
          >
            <AiOutlineArrowLeft strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-5">
            <IconButton>1</IconButton>
            <IconButton>2</IconButton>
            <IconButton>3</IconButton>
            <IconButton>4</IconButton>
            <IconButton>5</IconButton>
          </div>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-2"
            // onClick={next}
            // disabled={active === 5}
          >
            Next
            <AiOutlineArrowRight strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
