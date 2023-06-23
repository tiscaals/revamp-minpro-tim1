import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
  PopoverHandler,
  PopoverContent,
  Popover,
  IconButton,
  Avatar,
  Select,
  Option,
  Textarea,
} from '@material-tailwind/react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { getAllTraineesByBatchReq } from '@/pages/redux/bootcamp-schema/action/actionReducer';
import { HiDotsVertical, HiOutlineChevronDown } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { Popover } from '@headlessui/react';

export default function evaluation() {
  const { trainees, refresh } = useSelector(
    (state: any) => state.traineeReducers
  );
  const [storeTrainees, setStoreTrainees] = useState<any>();
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(getAllTraineesByBatchReq(id));
    }
  }, [id, refresh]);

  if (trainees.length === 0) {
    return <div>loading...</div>;
  }

  // console.log(trainees);
  return (
    <div className="bg-white rounded-md">
      <div className="flex justify-between mb-5 p-4">
        <p className="grid content-center">
          {storeTrainees?.batch_name}, Bootcamp {storeTrainees?.prog_title}{' '}
          Evaluation
        </p>
        <Button>Back</Button>
      </div>
      <div className="grid lg:grid-cols-5 gap-3">
        {trainees?.map((item: any) => (
          <Card className="shadow-none">
            <CardHeader floated={false} className="h-36">
              <img
                src={item.user_photo}
                alt="profile-picture"
                className="transform hover:scale-110 transition-transform"
              />
              <div className="absolute right-0 top-0">
                <Popover
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: -160 },
                  }}
                  placement="bottom"
                >
                  <PopoverHandler>
                    <IconButton
                      variant="text"
                      className="text-white rounded-full bg-white bg-opacity-0 hover:bg-opacity-50"
                    >
                      <HiDotsVertical className="w-5 h-5" />
                    </IconButton>
                  </PopoverHandler>
                  <PopoverContent className="w-auto">
                    <div className="flex items-center gap-4 border-b border-blue-gray-50 pb-4 mb-4">
                      <Avatar src={item.user_photo} alt="candice wu" />
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          {item.full_name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {item.batr_status}
                        </Typography>
                      </div>
                    </div>
                    {/* <Button variant='text'>Evaluation</Button> */}
                    <div className="flex flex-col gap-3">
                      <Select label="Set Status">
                        <Option>Resign</Option>
                        <Option>Running</Option>
                      </Select>
                      <Textarea label="review"></Textarea>
                      <Button>Submit</Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Link href={`/batch/evaluation/${id}/${item.batr_id}`}>
                <div className="absolute h-2/3 bottom-0 text-center w-full bg-gradient-to-t from-white to-transparent grid content-end text-xs">
                  Click to Evaluate{' '}
                  <span className="flex justify-center mb-1">
                    {' '}
                    <HiOutlineChevronDown />{' '}
                  </span>
                </div>
              </Link>
            </CardHeader>
            <CardBody className="text-start">
              <Typography variant="small" color="blue-gray" className="mb-2">
                {item.full_name}
              </Typography>
              <Typography variant="small" color="blue-gray" className="mb-2">
                {`Nilai: ${
                  item.batr_total_score ? item.batr_total_score : 'Belum ada'
                }`}
              </Typography>
              <div
                className={`
              text-center rounded-md py-1
                ${
                  item.batr_status === 'running'
                    ? 'text-orange-800 bg-orange-100'
                    : item.batr_status === 'resign'
                    ? 'text-purple-800 bg-purple-100'
                    : item.batr_status === 'passed'
                    ? 'text-green-800 bg-green-100'
                    : 'text-red-800 bg-red-100'
                }
              `}
              >
                {item.batr_status}
              </div>
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
