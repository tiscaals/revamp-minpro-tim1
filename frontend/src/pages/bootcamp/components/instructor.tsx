import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { BsFacebook, BsLinkedin, BsTwitter, BsYoutube } from 'react-icons/bs';

export default function Instructor() {
  return (
    <Card className="lg:flex flex-col lg:flex-row mt-6 shadow-none">
      <CardHeader color="blue-gray" className="relative my-auto">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="img-blur-shadow"
          // layout="contain"
          className='h-full w-auto bg-contain'
        />
      </CardHeader>
      <CardBody className="">
        <Typography variant="small" color="blue-gray" className="mb-1">
          Instructor
        </Typography>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Kang Dian
        </Typography>
        <Typography variant="paragraph">
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.
        </Typography>
        <div className='mt-5 mb-3 flex gap-4'>
          <BsFacebook className='w-4 h-4 text-light-blue-800'/>
          <BsLinkedin className='w-4 h-4 text-blue-800'/>
          <BsTwitter className='w-4 h-4 text-blue-300'/>
          <BsYoutube className='w-4 h-4 text-red-600'/>
        </div>
      </CardBody>
    </Card>
  );
}
