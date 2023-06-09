import React from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
  Button, 
  IconButton
} from "@material-tailwind/react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

export default function Candidates() {
const data = [
    {
      label: "Apply",
      value: "html",
      desc: `Isi dari Apply Candidates Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    },
    {
      label: "Filtering Test",
      value: "react",
      desc: `Isi dari Filtering Test Candidates`,
    },
    {
      label: "Contract",
      value: "vue",
      desc: `Isi dari Contract Candidates`,
    },
    {
      label: "Disqualified",
      value: "angular",
      desc: `Isi dari Disqualified Candidates`,
    },
    {
      label: "Not Responding",
      value: "svelte",
      desc: `Isi dari Not Responding Candidates`,
    },
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
          <IconButton >1</IconButton>
          <IconButton >2</IconButton>
          <IconButton >3</IconButton>
          <IconButton >4</IconButton>
          <IconButton >5</IconButton>
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
    </Tabs>
    </div>
  )
}
