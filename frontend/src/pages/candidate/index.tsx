import React, { Fragment } from 'react';
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

export default function Candidates() {
  const data = [
    {
      label: 'Apply',
      value: 'html',
      desc: `Isi dari Apply Candidates`,
    },
    {
      label: 'Filtering Test',
      value: 'react',
      desc: `Isi dari Filtering Test Candidates`,
    },
    {
      label: 'Contract',
      value: 'vue',
      desc: `Isi dari Contract Candidates`,
    },
    {
      label: 'Disqualified',
      value: 'angular',
      desc: `Isi dari Disqualified Candidates`,
    },
    {
      label: 'Not Responding',
      value: 'svelte',
      desc: `Isi dari Not Responding Candidates`,
    },
  ];

  const columns = [
    { name: '#No' },
    { name: 'image' },
    { name: 'name' },
    { name: 'university' },
    { name: 'tahun lulus' },
    { name: 'aksi' },
  ];

  const trainees = [
    {
      image:
        'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
      name: 'John Doe',
      university: 'Univ Code X Academy',
      lulus: '2021',
    },
    {
      image:
        'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg',
      name: 'Jane Smith',
      university: 'Univ Code X Academy',
      lulus: '2021',
    },
    {
      image:
        'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg',
      name: 'Michael Johnson',
      university: 'Univ Code X Academy',
      lulus: '2021',
    },
    // {
    //   name: 'Emily Davis',
    //   avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Emily+Davis',
    //   score: 87,
    //   status: 'running',
    // },
    // {
    //   name: 'Sarah Brown',
    //   avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Sarah+Brown',
    //   score: 65,
    //   status: 'resign',
    // },
    // {
    //   name: 'David Wilson',
    //   avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=David+Wilson',
    //   score: 92,
    //   status: 'passed',
    // },
    // {
    //   name: 'Olivia Martinez',
    //   avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Olivia+Martinez',
    //   score: 78,
    //   status: 'running',
    // },
    // {
    //   name: 'Daniel Taylor',
    //   avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Daniel+Taylor',
    //   score: 83,
    //   status: 'running',
    // },
    // {
    //   name: 'Sophia Anderson',
    //   avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Sophia+Anderson',
    //   score: 91,
    //   status: 'passed',
    // },
    // {
    //   name: 'Matthew Thomas',
    //   avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Matthew+Thomas',
    //   score: 75,
    //   status: 'running',
    // },
    // {
    //   name: 'Isabella Garcia',
    //   avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Isabella+Garcia',
    //   score: 68,
    //   status: 'resign',
    // },
    // {
    //   name: 'Ethan Martinez',
    //   avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Ethan+Martinez',
    //   score: 89,
    //   status: 'running',
    // },
    // {
    //   name: 'Ava Thompson',
    //   avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Ava+Thompson',
    //   score: 82,
    //   status: 'passed',
    // },
    // {
    //   name: 'James Rodriguez',
    //   avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=James+Rodriguez',
    //   score: 73,
    //   status: 'running',
    // },
  ];

  return (
    <div>
      <div className="my-4">
        <p className="text-gray-700 text-2xl font-bold">Candidates</p>
      </div>
      <Tabs value="html">
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
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
      <table className="min-w-full table-fixed ">
        <thead>
          <tr className="border-t border-gray-200 bg-light-blue-500 ">
            {(columns || []).map(col => (
              <th className="pl-3 pr-3 py-2 text-left text-xs font-medium text-black-500 uppercase tracking-winder">
                <span className="">{col.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y-8 divide-gray-100">
          {(trainees || []).map((dt: any, index: any) => (
            <tr key={dt.id}>
              <td className="pl-3 py-3 text-gray-900">{index + 1}</td>
              <td className="py-3 text-gray-900">
                <Avatar src={dt.image} />
              </td>
              <td className="py-3 text-gray-900">{dt.name}</td>
              <td className="py-3 text-gray-900">{dt.university}</td>
              <td className="py-3 text-gray-900">{dt.lulus}</td>
              <td className="py-3 text-gray-900">
                <div className="w-full">
                  <Menu as="div" className="relative inline-block text-left ">
                    <div>
                      <Menu.Button
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
                      <Menu.Items className="z-10 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-4">
                        <div className="px-1 py-1">
                          <h1 className="relative">
                            Switch Status
                            <span className="after:content after:block after:h-1 after:bg-black after:absolute after:bottom-0 after:left-0 after:w-full"></span>
                          </h1>
                          <br />
                          <h1>Kadidat {dt.name}</h1>
                          <br />
                          {/* <h1>Score Filtering Test :</h1> */}
                          <div className="flex justify-center">
                            <div className="w-72">
                              <Input
                                label="Score Filtering Test"
                                type="number"
                              />
                              <br />
                              <Select label="Set Status" >
                              <Option className="text-black">Ready Test</Option>
                              <Option className="text-black">Passed</Option>
                              <Option className="text-black">Contracted</Option>
                              <Option className="text-black">
                                Recommendation
                              </Option>
                            </Select>
                            <br />
                            <Textarea label="Review" />
                            </div>
                          </div>
                          <br />
                          <div className="flex flex-col w-max gap-4">
                            <ButtonGroup>
                              <Button className="text-black">Cancel</Button>
                              <Button className="text-black">Submit</Button>
                            </ButtonGroup>
                          </div>

                          {/* <Menu.Item>
                  {({ active }) => (
                    <Link
                    href={{ 
                      pathname:`user/editUser`,
                      query: {
                        id: dt.id,
                        username: dt.username,
                        password: dt.password,
                        firstname: dt.firstname,
                        lastname: dt.lastname
                      } 
                    }}
                    //  onClick={()=>goToEdit(dt)}
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <BsPencilFill
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <BsPencil
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Edit
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button 
                    // onClick={()=>{setIsHapus(dt)}}
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <BsTrashFill
                          className="mr-2 h-5 w-5 text-violet-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <BsTrash
                          className="mr-2 h-5 w-5 text-violet-400"
                          aria-hidden="true"
                        />
                      )}
                      Delete
                    </button>
                  )}
                </Menu.Item> */}
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
