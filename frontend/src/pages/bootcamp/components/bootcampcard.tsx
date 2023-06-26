import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
    Rating,
  } from "@material-tailwind/react";
import Link from "next/link";
import { HiStar } from "react-icons/hi";
   
  export default function Card3({item}:any) {
    // console.log(props);
    return (
      <Card className="max-w-[24rem] overflow-hidden shadow-none">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none hover:scale-105 transition-transform"
        >
            <Link href='/bootcamp/details'>
                <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="ui/ux review check"
            />
            </Link>
        </CardHeader>
        <CardBody className="px-0">
          <Typography variant="h5" color="blue-gray">
            {item.judul}
          </Typography>
          <Typography variant="small" color="gray" className="my-1 font-normal">
            {item.deskripsi} <br />{item.durasi} <br />{item.pembelajaran}
          </Typography>
          <div className="flex items-center">
            <Typography color="blue-gray" variant="small" className="font-medium mr-2">
                4.0
            </Typography>
            <HiStar className="text-yellow-700"/>
            <HiStar className="text-yellow-700"/>
            <HiStar className="text-yellow-700"/>
            <HiStar className="text-yellow-700"/>
            <HiStar/>
            <Typography color="blue-gray" variant="small" className="font-medium mr-2">
                (34)
            </Typography>
          </div>
        </CardBody>
      </Card>
    );
  }