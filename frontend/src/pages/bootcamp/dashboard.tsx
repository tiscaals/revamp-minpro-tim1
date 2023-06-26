import React from 'react'
import Navigation from './components/navbar'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { HiArrowLongRight, HiRocketLaunch } from 'react-icons/hi2';
import { HiTicket } from 'react-icons/hi2';

export default function () {
  return (
    <div>
        <Navigation/>
        <div className='flex gap-3'>
        <Card className="mt-6 w-60">
      <CardBody>
        <HiTicket className="text-blue-500 w-12 h-12 mb-4" />
        <Typography variant="h6" color="blue-gray" className="mb-2">
          .Net framework App
        </Typography>
        <Typography variant='small'>
          Apply Date: July 12 2023 <br />
          Status: Passed <br />
          Last Progress: Waiting List
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <a href="#" className="inline-block">
          <Button size="sm" variant="text" className="flex items-center gap-2">
            Check Progress
            <HiArrowLongRight strokeWidth={2} className="w-3 h-3" />
          </Button>
        </a>
      </CardFooter>
        </Card>
        <Card className="mt-6 w-60">
      <CardBody>
        <HiTicket className="text-red-500 w-12 h-12 mb-4" />
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Nodejs App
        </Typography>
        <Typography variant='small'>
          Apply Date: July 12 2023 <br />
          Status: Failed <br />
          Last Progress: Waiting List
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <a href="#" className="inline-block">
          <Button size="sm" variant="text" color='red' className="flex items-center gap-2">
            Failed
          </Button>
        </a>
      </CardFooter>
        </Card>
        </div>
    </div>
  )
}