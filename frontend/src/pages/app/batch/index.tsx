import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  button,
  Textarea,
  Select,
  Option,
} from '@material-tailwind/react';
import {
  HiDotsVertical,
  HiFastForward,
  HiOutlineAcademicCap,
  HiPencil,
  HiTrash,
  HiX,
  HiOutlineClock,
} from 'react-icons/hi';
import { notifySuccess, notifyFailed } from '@/pages/alert';
import { BiCalendarPlus } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
const batchPhoto = 'http://localhost:3003/'
import {
  UpdateChangeStatusBatchReq,
  deleteBatchReq,
  getAllBatchesReq,
} from '../../redux/bootcamp-schema/action/actionReducer';
import { useSelector } from 'react-redux';
import MyPaginate from '../../bootcamp/components/pagination';
// import { ToastContainer, toast } from 'react-toastify';
const TABS = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Open',
    value: 'open',
  },
  {
    label: 'Running',
    value: 'running',
  },
  {
    label: 'Closed',
    value: 'closed',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Cancelled',
    value: 'cancelled',
  },
];

const TABLE_HEAD = [
  'Batch',
  'Technology',
  'Members',
  'Periode',
  'Trainer',
  'Status',
  '',
];

export default function BatchList() {
  const [query, setQuery] = useState('');
  const { batches, refresh, message } = useSelector(
    (state: any) => state.batchReducers
  );
  const [selectedBatch, setSelectedBatch] = useState<any>({
    batch_id: 0,
    batch_entity_id: 0,
    batch_reason: '',
    batch_status: '',
  });
  const dispatch = useDispatch();
  const [batchstatus, setBatchstatus] = useState();
  const [buttonSelect, setButtonSelect] = useState('');

  // console.log(batchstatus);

  const filteredBatch: any =
    buttonSelect === 'all' && query === ''
      ? batches
      : buttonSelect === 'all'
      ? batches?.filter(
          (item: any) =>
            item.batch_name
              .toLowerCase()
              .replace(/\s/g, '')
              .includes(query.toLowerCase().replace(/\s/g, '')) ||
            item.trainees.some((trainee: any) =>
              trainee.full_name
                .toLowerCase()
                .replace(/\s/g, '')
                .includes(query.toLowerCase().replace(/\s/g, ''))
            ) ||
            item.trainers.some((trainer: any) =>
              trainer.concat
                .toLowerCase()
                .replace(/\s/g, '')
                .includes(query.toLowerCase().replace(/\s/g, ''))
            )
        )
      : batches?.filter(
          (item: any) =>
            (item.batch_name
              .toLowerCase()
              .replace(/\s/g, '')
              .includes(query.toLowerCase().replace(/\s/g, '')) &&
              item.batch_status === buttonSelect) ||
            (item.trainees.some((trainee: any) =>
              trainee.full_name
                .toLowerCase()
                .replace(/\s/g, '')
                .includes(query.toLowerCase().replace(/\s/g, ''))
            ) &&
              item.batch_status === buttonSelect)
        );

  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(filteredBatch?.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = filteredBatch?.slice(startIndex, endIndex);

  const router = useRouter();
  useEffect(() => {
    dispatch(getAllBatchesReq());
  }, [buttonSelect, refresh]);

  const deleteaction = (batchid: any) => {
    dispatch(deleteBatchReq(batchid));
  };

  useEffect(() => {
    setButtonSelect('all');
    if (message) {
      setTimeout(()=>{
        notifySuccess('success',message)
      },30)
    }
  }, []);

  const changeStatusBatch = () => {
    dispatch(
      UpdateChangeStatusBatchReq({
        batch_id: selectedBatch.batch_id,
        batch_entity_id: selectedBatch.batch_entity_id,
        batch_reason: selectedBatch.batch_reason,
        batch_status: batchstatus,
        talent_status: 'idle',
      })
    );
  };

  console.log(selectedBatch);

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Batch App
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all batches
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                onClick={() => router.push('/app/batch/create')}
                className="flex items-center gap-3"
                color="blue"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Batch
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max z-0">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setButtonSelect(value)}
                  >
                    <Typography variant="small" className="px-2">
                      {label}
                    </Typography>
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                onChange={(e: any) => setQuery(e.target.value)}
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className=" overflow-auto px-0">
          <table className="mt-4 w-full min-w-max text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{' '}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-red-300">
                    No data found
                  </td>
                </tr>
              ) : (
                (currentItems || []).map(
                  (
                    {
                      batch_id,
                      batch_entity_id,
                      batch_name,
                      prog_title,
                      trainees,
                      trainers,
                      batch_status,
                      batch_start_date,
                      batch_end_date,
                    }: any,
                    index: number
                  ) => {
                    const isLast = index === filteredBatch.length - 1;
                    const classes = isLast
                      ? 'p-4'
                      : 'p-4 border-b border-blue-gray-50';

                    return (
                      <tr key={batch_id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {batch_name}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {prog_title}
                            </Typography>
                          </div>
                        </td>

                        <td className={classes}>
                          <div className="items-center">
                            <div className="flex -space-x-4 overflow-hidden">
                              {trainees.slice(0, 3).map((poto: any) => (
                                <Avatar
                                  src={poto.user_photo}
                                  size="sm"
                                  className="inline-block rounded-full ring-2 ring-white"
                                />
                              ))}
                              {trainees.length > 3 ? (
                                <Avatar
                                  src={`https://ui-avatars.com/api/?name=%2B${
                                    trainees.length - 3
                                  }&bold=true&color=757575`}
                                  alt={trainees.full_name}
                                  size="sm"
                                  className="inline-block rounded-full ring-2 ring-white"
                                />
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {batch_start_date}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {batch_end_date}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {trainers[0]?.concat}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                (co) {trainers[1]?.concat}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={batch_status ? batch_status : 'offline'}
                              color={
                                batch_status === 'open'
                                  ? 'green'
                                  : batch_status === 'running'
                                  ? 'yellow'
                                  : batch_status === 'closed'
                                  ? 'red'
                                  : batch_status === 'pending'
                                  ? 'blue'
                                  : batch_status === 'cancelled'
                                  ? 'purple'
                                  : 'indigo'
                              }
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <div>
                              <Menu.Button
                                onClick={() =>
                                  setSelectedBatch({
                                    ...selectedBatch,
                                    batch_id: batch_id,
                                    batch_entity_id: batch_entity_id,
                                  })
                                }
                              >
                                <HiDotsVertical
                                  className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
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
                              <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        disabled={
                                          batch_status !== 'open' &&
                                          batch_status !== 'pending'
                                            ? true
                                            : false
                                        }
                                        onClick={() =>
                                          router.push(
                                            `/app/batch/edit/${batch_id}`
                                          )
                                        }
                                        className={`${
                                          active
                                            ? 'bg-light-blue-500 text-white'
                                            : 'text-gray-900'
                                        } group disabled:bg-gray-200 disabled:text-gray-400  flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        <HiPencil
                                          className={`
                                        mr-2 h-5 w-5 ${
                                          active
                                            ? 'text-white'
                                            : 'text-light-blue-500'
                                        } `}
                                          aria-hidden="true"
                                          // disabled={}
                                        />
                                        Edit
                                      </button>
                                    )}
                                  </Menu.Item>
                                  {/* <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >

                                </Transition> */}
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        disabled={
                                          batch_status !== 'running'
                                            ? true
                                            : false
                                        }
                                        onClick={() =>
                                          router.push(
                                            `/app/batch/evaluation/${batch_id}`
                                          )
                                        }
                                        className={`${
                                          active
                                            ? 'bg-light-blue-500 text-white'
                                            : 'text-gray-900'
                                        } disabled:bg-gray-200 disabled:text-gray-400 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        <HiOutlineAcademicCap
                                          className={`${
                                            batch_status !== 'running'
                                              ? 'text-gray-400'
                                              : ''
                                          } mr-2 h-5 w-5 ${
                                            active
                                              ? 'text-white'
                                              : 'text-light-blue-500'
                                          }`}
                                          aria-hidden="true"
                                        />
                                        Evaluation
                                      </button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                      onClick={() => dispatch(
                                        UpdateChangeStatusBatchReq({
                                          batch_id: selectedBatch.batch_id,
                                          batch_entity_id: selectedBatch.batch_entity_id,
                                          batch_reason: selectedBatch.batch_reason,
                                          batch_status: "cancelled",
                                          talent_status: 'idle',
                                        })
                                      )}
                                        className={`${
                                          active
                                            ? 'bg-light-blue-500 text-white'
                                            : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        <HiTrash
                                          className={`mr-2 h-5 w-5 ${
                                            active
                                              ? 'text-white'
                                              : 'text-red-500'
                                          }`}
                                          aria-hidden="true"
                                        />
                                        Delete
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                                <div className="px-4 py-1">
                                  {/* <div className=''> */}
                                  <Select
                                    label="Change Status"
                                    onChange={(e: any) => setBatchstatus(e)}
                                    value={batchstatus}
                                    disabled={batch_status === 'closed' || batch_status === 'cancelled'}
                                  >
                                    <Option value="running">
                                      <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-black">
                                        <HiFastForward
                                          className={`mr-2 h-5 w-5 text-green-500`}
                                          aria-hidden="true"
                                        />
                                        Running
                                      </button>
                                    </Option>
                                    <Option value="pending">
                                      <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-black">
                                        <HiOutlineClock
                                          className={`mr-2 h-5 w-5 text-purple-500`}
                                          aria-hidden="true"
                                        />
                                        Pending
                                      </button>
                                    </Option>
                                    <Option value="extend">
                                      <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-black">
                                        <BiCalendarPlus
                                          className={`mr-2 h-5 w-5 text-pink-200`}
                                          aria-hidden="true"
                                        />
                                        Extend
                                      </button>
                                    </Option>
                                    <Option value="closed">
                                      <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-black">
                                        <HiX
                                          className={`mr-2 h-5 w-5 text-orange-500`}
                                          aria-hidden="true"
                                        />
                                        Close
                                      </button>
                                    </Option>
                                  </Select>
                                  {/* </div> */}
                                </div>
                                {batchstatus === 'pending' ||
                                batchstatus === 'extend' ? (
                                  <div className="px-4 py-1">
                                    <Textarea
                                      label="Reason"
                                      onChange={(e: any) =>
                                        setSelectedBatch({
                                          ...selectedBatch,
                                          batch_reason: e.target.value,
                                        })
                                      }
                                    ></Textarea>
                                  </div>
                                ) : (
                                  ''
                                )}
                                <div className="flex flex-col gap-3 pl-4 pr-3 py-1">
                                  <Button
                                    onClick={() => changeStatusBatch()}
                                    size="md"
                                  >
                                    Submit
                                  </Button>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </td>
                      </tr>
                    );
                  }
                )
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter>
          <MyPaginate
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPage={totalPage}
            variant="simple"
          />
        </CardFooter>
      </Card>
    </>
  );
}
