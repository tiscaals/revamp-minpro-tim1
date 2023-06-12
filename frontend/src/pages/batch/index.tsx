import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';
import { PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid';
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
  IconButton,
  Tooltip,
} from '@material-tailwind/react';
import {
  HiDotsVertical,
  HiFastForward,
  HiOutlineAcademicCap,
  HiPencil,
  HiTrash,
  HiX,
} from 'react-icons/hi';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef, useState } from 'react';

const TABS = [
  {
    label: 'All',
    value: '',
  },
  {
    label: 'Running',
    value: 'running',
  },
  {
    label: 'Closed',
    value: 'closed',
  },
];

const TABLE_HEAD = [
  'Batch',
  'Technology',
  'Members',
  'Trainer',
  'Function',
  'Status',
  'Periode',
  '',
];

const TABLE_ROWS = [
  {
    batr_name: 'Batch#1',
    batr_entity_name: 'Node JS ',
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
    name: 'John Michael',
    email: 'john@creative-tim.com',
    job: 'Manager',
    org: 'Organization',
    status: 'running',
    online: true,
    date: '18 March 2023',
  },
  {
    batr_name: 'Batch#2',
    batr_entity_name: '.Net Technology',
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg',
    name: 'Alexa Liras',
    email: 'alexa@creative-tim.com',
    job: 'Programator',
    org: 'Developer',
    status: 'closed',
    online: false,
    date: '19 April 2023',
  },
  {
    batr_name: 'Batch#3',
    batr_entity_name: 'Golang',
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg',
    name: 'Laurent Perrier',
    email: 'laurent@creative-tim.com',
    job: 'Executive',
    org: 'Projects',
    status: 'closed',
    online: false,
    date: '20 Mei 2023',
  },
];

export default function BatchList() {
  const [buttonSelect, setButtonSelect] = useState('')

  console.log(buttonSelect);

  // cnst filteredBatch = 

  const router = useRouter();
  return (
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
              onClick={() => router.push('/batch/create')}
              className="flex items-center gap-3"
              color="blue"
              size="sm"
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Batch
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value} onClick={()=>setButtonSelect(value)}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="lg:overflow overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
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
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              (
                {
                  batr_name,
                  batr_entity_name,
                  img,
                  name,
                  email,
                  job,
                  org,
                  online,
                  date,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {batr_name}
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
                          {batr_entity_name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="items-center">
                        <div className="flex -space-x-4 overflow-hidden">
                          <Avatar
                            src={img}
                            alt={name}
                            size="sm"
                            className="inline-block rounded-full ring-2 ring-white"
                          />
                          <Avatar
                            src={img}
                            alt={name}
                            size="sm"
                            className="inline-block rounded-full ring-2 ring-white"
                          />
                          <Avatar
                            src={img}
                            alt={name}
                            size="sm"
                            className="inline-block rounded-full ring-2 ring-white"
                          />
                          <Avatar
                            src={`https://ui-avatars.com/api/?name=%2B5&bold=true&color=757575`}
                            alt={name}
                            size="sm"
                            className="inline-block rounded-full ring-2 ring-white"
                          />
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
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
                          {job}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {org}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={online ? 'online' : 'offline'}
                          color={online ? 'green' : 'blue-gray'}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      {/* <Tooltip content="Edit User">
                      <IconButton variant="text" color="blue-gray">
                        <HiDotsVertical className="h-4 w-4" />
                      </IconButton>
                    </Tooltip> */}
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button>
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
                          <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? 'bg-light-blue-500 text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    <HiPencil
                                      className={`mr-2 h-5 w-5 ${
                                        active
                                          ? 'text-white'
                                          : 'text-light-blue-500'
                                      }`}
                                      aria-hidden="true"
                                    />
                                    Edit
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() =>
                                      router.push('/batch/evaluation')
                                    }
                                    className={`${
                                      active
                                        ? 'bg-light-blue-500 text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    <HiOutlineAcademicCap
                                      className={`mr-2 h-5 w-5 ${
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
                            </div>
                            <div className="px-1 py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? 'bg-light-blue-500 text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    <HiX
                                      className={`mr-2 h-5 w-5 ${
                                        active
                                          ? 'text-white'
                                          : 'text-orange-600'
                                      }`}
                                      aria-hidden="true"
                                    />
                                    Close Batch
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? 'bg-light-blue-500 text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    <HiFastForward
                                      className={`mr-2 h-5 w-5 ${
                                        active ? 'text-white' : 'text-green-500'
                                      }`}
                                      aria-hidden="true"
                                    />
                                    Run Batch
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                            <div className="px-1 py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? 'bg-light-blue-500 text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    <HiTrash
                                      className={`mr-2 h-5 w-5 ${
                                        active ? 'text-white' : 'text-red-500'
                                      }`}
                                      aria-hidden="true"
                                    />
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
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
