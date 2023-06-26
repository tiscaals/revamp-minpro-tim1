import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from '@material-tailwind/react';
import { StarIcon } from '@heroicons/react/24/solid';

export default function Testi() {
  return (
    <Card color="transparent" shadow={false} className="w-full max-w-[26rem] bg-gray-100 p-8">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex flex-col text-center items-center gap-4 pt-0 pb-8"
      >
        <Avatar
          size="lg"
          variant="circular"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="candice wu"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="">
            <Typography variant="h5" color="blue-gray">
              Candice Wu
            </Typography>
          </div>
          <Typography color="blue-gray" variant="small">Frontend Lead @ Google</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <div className="flex justify-center gap-0 mb-3">
          <StarIcon className="h-5 w-5 text-yellow-700" />
          <StarIcon className="h-5 w-5 text-yellow-700" />
          <StarIcon className="h-5 w-5 text-yellow-700" />
          <StarIcon className="h-5 w-5 text-yellow-700" />
          <StarIcon className="h-5 w-5 text-yellow-700" />
        </div>
        <Typography className="text-center">
          &quot;I use them as a aaa freelancer! And its really
          affordable !!!&quot;
        </Typography>
      </CardBody>
    </Card>
  );
}
