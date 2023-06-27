import React, { useEffect, useState } from 'react';
import Navigation from './components/navbar';
import BootcampCard from './components/card';
import Material from './components/material';
import CardLearn from './components/card2';
import jwt, { JwtPayload } from 'jsonwebtoken';
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
import { addCartReq } from '../redux/sales-schema/action/actionReducer';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

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
  const [decoded, setDecoded] = useState<any>()
    const dispatch = useDispatch();
    const router = useRouter();
    const {id, price} = router.query;
    const handleInsertCartItems = () => {
        const createCartItem = {
            p_cait_quantity: 1,
            p_cait_unit_price: price,
            p_cait_user_entity_id: decoded?.user_entity_id,
            p_cait_prog_entity_id: id
        };
        dispatch(addCartReq(createCartItem));
        toast.success('Item berhasil ditambahkan ke keranjang!', {
            position: toast.POSITION.BOTTOM_RIGHT,
            // tambahkan opsi lain yang sesuai dengan kebutuhan Anda
          });
    }

    const token = Cookies.get('access_token')

    useEffect(()=>{
      if(token && id){
        try {
          setDecoded(jwt.decode(token) as JwtPayload)
        } catch (error) {
          console.log(error)
        }
      }else{
        console.log('token not found')
      }
    },[id])

    console.log(decoded);

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
          <br />
          <Instructor />
          <br />
          <div className='flex flex-col lg:flex-row gap-8'>
            <Testi />
            <Testi />
            <Testi />
          </div>
        </div>
        <Card
          color="blue"
          variant="gradient"
          className="w-full h-fit max-w-[20rem] p-8 "
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
              Testimoni 
            </Typography>
            {/* <video className="h-full w-full rounded-lg" controls>
              <source src="https://www.youtube.com/watch?v=7cFusMKX-Bs&t=9s" type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
            <iframe src='https://www.youtube.com/embed/tgbNymZ7vqY'>
            </iframe>
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
            onClick={()=>router.push({
              pathname:'/bootcamp/apply',
              query: {
                id: id
              }
            })}
              size="lg"
              color="white"
              className="text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
              ripple={false}
              fullWidth={true}
            >
              Apply Bootcamp
            </Button>
            <Button
              size="sm"
              color="white"
              variant="text"
              className="mt-2"
              ripple={false}
              fullWidth={true}
              onClick={handleInsertCartItems}
            >
              <p className='font-bold'>Add to cart</p>
              <p className='font-thin text-xs  '>Rp. {price}</p>
            </Button>
              <ToastContainer />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
