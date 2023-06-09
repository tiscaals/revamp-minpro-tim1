import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Input,
  Button,
} from '@material-tailwind/react';

const trainees = [
  {
    name: 'John Doe',
    avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=John+Doe',
    score: 80,
    status: 'running',
  },
  {
    name: 'Jane Smith',
    avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Jane+Smith',
    score: 95,
    status: 'passed',
  },
  {
    name: 'Michael Johnson',
    avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Michael+Johnson',
    score: 70,
    status: 'resign',
  },
  {
    name: 'Emily Davis',
    avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Emily+Davis',
    score: 87,
    status: 'running',
  },
  {
    name: 'Sarah Brown',
    avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Sarah+Brown',
    score: 65,
    status: 'resign',
  },
  {
    name: 'David Wilson',
    avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=David+Wilson',
    score: 92,
    status: 'passed',
  },
  {
    name: 'Olivia Martinez',
    avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Olivia+Martinez',
    score: 78,
    status: 'running',
  },
  {
    name: 'Daniel Taylor',
    avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Daniel+Taylor',
    score: 83,
    status: 'running',
  },
  {
    name: 'Sophia Anderson',
    avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Sophia+Anderson',
    score: 91,
    status: 'passed',
  },
  {
    name: 'Matthew Thomas',
    avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Matthew+Thomas',
    score: 75,
    status: 'running',
  },
  {
    name: 'Isabella Garcia',
    avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Isabella+Garcia',
    score: 68,
    status: 'resign',
  },
  {
    name: 'Ethan Martinez',
    avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Ethan+Martinez',
    score: 89,
    status: 'running',
  },
  {
    name: 'Ava Thompson',
    avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=Ava+Thompson',
    score: 82,
    status: 'passed',
  },
  {
    name: 'James Rodriguez',
    avatar: 'https://dummyimage.com/200x200/000000/ffffff&text=James+Rodriguez',
    score: 73,
    status: 'running',
  },
];

export default function evaluation() {
  return (
    <div className="bg-white rounded-md">
      <div className="flex justify-between mb-5 p-4">
        <p className="grid content-center">
          Batch#3, Bootcamp .Net Framework Evaluation
        </p>
        <Button>Back</Button>
      </div>
      <div className="grid lg:grid-cols-5 gap-5">
        {trainees.map(item => (
          <Card className="shadow-none">
            <CardHeader floated={false} className="h-32">
              <img src={item.avatar} alt="profile-picture" />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {item.name}
              </Typography>
              <Typography color="blue" className="font-medium" textGradient>
                {item.status}
              </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
              <Tooltip content="Like">
                <Typography
                  as="a"
                  href="#facebook"
                  variant="lead"
                  color="blue"
                  textGradient
                >
                  <i className="fab fa-facebook" />
                </Typography>
              </Tooltip>
              <Tooltip content="Follow">
                <Typography
                  as="a"
                  href="#twitter"
                  variant="lead"
                  color="light-blue"
                  textGradient
                >
                  <i className="fab fa-twitter" />
                </Typography>
              </Tooltip>
              <Tooltip content="Follow">
                <Typography
                  as="a"
                  href="#instagram"
                  variant="lead"
                  color="purple"
                  textGradient
                >
                  <i className="fab fa-instagram" />
                </Typography>
              </Tooltip>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
