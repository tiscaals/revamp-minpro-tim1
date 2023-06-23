import React from 'react';
import Navigation from './components/navbar';
import BootcampCard from './components/card';
import Material from './components/material';
import CardLearn from './components/card2';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import Instructor from './components/instructor';
import Testi from './components/testimonials';
import { RiWhatsappFill } from 'react-icons/ri';
import { HiCalendar, HiLocationMarker } from 'react-icons/hi';

const dataCurriculum = {
  name: 'Nodejs Fullstack',
  description:
    'Dalam pelajaran ini, akan dipelajari empat framework yang populer dalam pengembangan web, yaitu Express.js, Nest.js, React.js, dan Next.js. Express.js adalah framework web yang terkenal karena kecepatan dan kesederhanaannya dalam membangun aplikasi web menggunakan Node.js',
  totalTalent: 190,
  totalBatch: 12,
  duration: 3,
  //end date?
  currentBatch: '2023-06-06',
};

const whatWillYouLearn = [
  'HTML',
  'CSS',
  'JavaScript',
  'Node.js',
  'Express.js',
  'Database (SQL atau NoSQL)',
  'RESTful API Development',
  'Authentication and Authorization',
  'Reactjs',
  'Nestjs',
  'MVC Architecture',
  'Asynchronous Programming',
  'Error Handling',
  'Deployment and Hosting',
  'Testing and Debugging',
  'Version Control (e.g., Git)',
];

export default function index() {
  return (
    <div className="">
      <Navigation />
      <br />
      <div className="flex lg:flex-row flex-col max-w-screen-xl mx-auto">
        <div className="lg:w-4/6">
          <BootcampCard
            dataCurriculum={dataCurriculum}
            whatWillYouLearn={whatWillYouLearn}
          />
          <CardLearn whattolearn={whatWillYouLearn} />
          <Material />
          <Card className="mt-6 shadow-none">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Description
              </Typography>
              <Typography>
                Ini bedanya sama deskripsi diatas apa yaaaaaaaaaaaaaaa
                lurrrrrrrrrrrr tolong diisi aja gatau ahhhhhh uhhhhhhh
                hmmmmmmmmmmmmmmmmmmm
              </Typography>
            </CardBody>
          </Card>
          <br />
          <Instructor />
          <br />
          <Testi />
        </div>
        <Card
          color="blue"
          variant="gradient"
          className="w-full h-fit max-w-[20rem] p-8"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
          >
            <Typography
              variant="small"
              color="white"
              className="font-normal uppercase"
            >
              Testimoni Alumni
            </Typography>
            <video className="h-full w-full rounded-lg" controls>
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  {/* <CheckIcon strokeWidth={2} className="h-3 w-3" /> */}
                </span>
                <Typography className="font-normal">5 team members</Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  {/* <CheckIcon strokeWidth={2} className="h-3 w-3" /> */}
                </span>
                <Typography className="font-normal">200+ components</Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  {/* <CheckIcon strokeWidth={2} className="h-3 w-3" /> */}
                </span>
                <Typography className="font-normal">
                  40+ built-in pages
                </Typography>
              </li>
            </ul>
          </CardBody>
          <CardFooter className="mt-12 p-0">
            <Button
              size="lg"
              color="white"
              className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
              ripple={false}
              fullWidth={true}
            >
              Apply Bootcamp
            </Button>
            <Button
              size="lg"
              color="white"
              variant="outlined"
              className=" hover:scale-[1.02] focus:scale-[1.02] active:scale-100 mt-3"
              ripple={false}
              fullWidth={true}
            >
              Add to cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
