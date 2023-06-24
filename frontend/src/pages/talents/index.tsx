import React, { useEffect, useState } from 'react';
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
import MyPaginate from '../bootcamp/components/pagination';

export default function Talents() {
  const [query, setQuery] = useState('');
  let { talents, message, refresh, status } = useSelector(
    (state: any) => state.talentsReducers
  );
  const [filter, setFilter] = useState({
    query: '',
    status: 'all',
  });

  const TABLE_HEAD = [
    'FULL NAME',
    'TECHNOLOGY',
    'BATCH',
    'PERIODE',
    'TRAINER',
    'STATUS',
    '',
  ];

  const filteredTalents =
    query === '' && filter.status === 'all'
      ? talents
      : filter.status === 'all'
      ? talents.filter((talent: any) =>
          talent.talent_fullname
            .toLowerCase()
            .replace(/\s/g, '')
            .includes(query.toLowerCase().replace(/\s/g, ''))
        )
      : 
      talents.filter(
          (talent: any) =>
            talent.talent_fullname
              .toLowerCase()
              .replace(/\s/g, '')
              .includes(query.toLowerCase().replace(/\s/g, '')) &&
            talent.talent_status === filter.status
        );

  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(filteredTalents?.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = filteredTalents?.slice(startIndex, endIndex);
  

  const dispatch = useDispatch();
  console.log(filteredTalents)

  // console.log("Test data Talents",talents);
  console.log(query);
  // console.log(filter);
  
  

  useEffect(() => {
    dispatch(getAllTalentsReq());
  }, [refresh]);

  // console.log();
  


// console.log(totalPage);



  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Talents App
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all talents
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="lg:overflow overflow-scroll">
        <div className="lg:flex gap-4 w-1/2">
          <Input
            onChange={(e: any) => setQuery(e.target.value)}
            variant="outlined"
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
          <div>
            <Select
              label="Status"
              variant="outlined"
              defaultValue={filter.status}
              onChange={(data: any) => setFilter({ ...filter, status: data })}
            >
              <Option value="all">All</Option>
              <Option value="on">On</Option>
              <Option value="idle">Idle</Option>
              <Option value="training">Training</Option>
              <Option value="trial">Trial</Option>
            </Select>
          </div>
        </div>
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
            {(filteredTalents?.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-red-300">
                  No data found
                </td>
              </tr>
            ) : (
              filteredTalents || []).map(
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
                const isLast = index === filteredTalents.length - 1;
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
            ))}
          </tbody>
        </table>
      </CardBody>
      {/* <MyPaginate
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPage={totalPage}
          variant="standard"
        /> */}
    </Card>
  );
}
