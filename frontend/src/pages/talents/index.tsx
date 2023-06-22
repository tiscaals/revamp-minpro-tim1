import React, { useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Typography,
  Select,
  Option,
  Avatar,
} from '@material-tailwind/react';
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTalentsReq } from '../redux/bootcamp-schema/action/actionReducer';

export default function Talents() {
  const TABLE_HEAD = [
    'FULL NAME',
    'TECHNOLOGY',
    'BATCH',
    'PERIODE',
    'TRAINER',
    'STATUS',
    '',
  ];

  let { talents, message, refresh, status } = useSelector(
    (state: any) => state.talentsReducers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTalentsReq());
  }, [refresh]);

  console.log('testtalents', talents);

  const TABLE_BODY = [
    {
      full_name: 'Abu Zubair',
      image:
        'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
      technology: 'NodeJS',
      batch: 'Batch#3',
      periode: 'March 18,2023 until June 18,2023',
      trainer: 'RinsLet',
      status: 'Idle',
    },
    {
      full_name: 'Boruto',
      image:
        'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
      technology: 'Java',
      batch: 'Batch#4',
      periode: 'March 18,2023 until June 18,2023',
      trainer: 'Naruto',
      status: 'Placement',
    },
    {
      full_name: 'Luffy',
      image:
        'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
      technology: '.Net',
      batch: 'Batch#4',
      periode: 'March 18,2023 until June 18,2023',
      trainer: 'Sanji',
      status: 'Trial',
    },
  ];

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Talents App
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all talents
            </Typography>
          </div>
        </div>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>Search by Category</div>
          <div className="w-full md:w-72">
            <Input
              label="talent name,technologi,trainer"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
          <div className="w-13">
            <Select label="Status">
              <Option>Idle</Option>
              <Option>Placement</Option>
              <Option>Trial</Option>
            </Select>
          </div>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4
             focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg
              text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Search
          </button>
        </div>
      </CardHeader>
      <CardBody className="lg:overflow overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{' '}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {talents.map(
              (
                {
                  talent_fullname,
                  talent_image,
                  talent_technology,
                  batch_name,
                  batch_start_date,
                  talent_trainer,
                  talent_status,
                }: any,
                index: number
              ) => {
                const isLast = index === TABLE_BODY.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={talent_fullname}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={talent_image}
                          alt={talent_fullname}
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {talent_fullname}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {talent_technology}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {batch_name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {batch_start_date}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {talent_trainer}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {talent_status}
                        </Typography>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
