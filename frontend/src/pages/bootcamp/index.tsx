import React from 'react';
import Navigation from './components/navbar';
import BootcampCard from './components/card';
import Material from './components/material';
import CardLearn from './components/card2';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import Instructor from './components/instructor';
import Testi from './components/testimonials';
import {RiWhatsappFill} from 'react-icons/ri'
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
                Ini bedanya sama deskripsi diatas apa yaaaaaaaaaaaaaaa lurrrrrrrrrrrr tolong diisi aja gatau ahhhhhh uhhhhhhh hmmmmmmmmmmmmmmmmmmm
              </Typography>
            </CardBody>
          </Card>
          <br />
          <Instructor/>
          <br />
          <Testi/>
        </div>
        <div className="lg:w-2/6 bg-gradient-to-br from-blue-600 to-blue-300 rounded-lg">
          <video className="p-3 w-full rounded-lg" controls>
            <source src="/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Typography className="flex gap-3 p-3 text-white text-sm">
              <HiCalendar className='text-2xl'/>
              Next batch, April 2023
          </Typography>
          <Typography className="flex gap-3 p-3 text-white text-sm">
              <HiLocationMarker className='text-2xl'/>
              Sentul, Bogor, Jawa Barat
          </Typography>
          <Typography className="flex gap-3 p-3 text-white text-sm">
              <RiWhatsappFill className='text-2xl'/>
              Next batch, April 2023
          </Typography>
          <Button className='shadow-inner shadow-white w-5/6 '>Apply Bootcamp</Button>
        </div>
      </div>
    </div>
  );
}
