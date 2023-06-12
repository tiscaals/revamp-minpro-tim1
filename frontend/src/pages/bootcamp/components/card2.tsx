import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { HiCheck } from 'react-icons/hi';

export default function CardLearn(props: any) {
  return (
    <Card className="mt-5 shadow-none">
      <CardBody>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          What you'll learn
        </Typography>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {props.whattolearn.map(item => (
            <div className="flex gap-3">
              <HiCheck className="text-light-blue-500" />
              <Typography variant="small">{item}</Typography>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
