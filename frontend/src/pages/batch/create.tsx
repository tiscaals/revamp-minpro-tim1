import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import {
  Input,
  Button,
  Avatar,
  Select,
  Option,
  Textarea,
  Typography,
  Alert,
} from '@material-tailwind/react';
import {
  HiPlusSm,
  HiMinusSm,
  HiOutlineCalendar,
  HiChevronDown,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBatchReq,
  getAllProgramsReq,
  getAllRecStudentReq,
  getAllTrainersReq,
} from '../redux/bootcamp-schema/action/actionReducer';
import { useRouter } from 'next/router';

export default function CreateBatch() {
  const date = new Date();
  const dispatch = useDispatch();
  const router = useRouter();

  const { programs } = useSelector((state: any) => state.programReducers);
  const {message} = useSelector((state:any)=> state.batchReducers);
  const { trainers } = useSelector((state: any) => state.trainerReducers);
  const { recstudents } = useSelector((state: any) => state.studentReducers);

  const [checked, setChecked] = useState<any>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<any>();
  const [selectedCoTrainer, setSelectedCoTrainer] = useState<any>();
  const [selTechno, setSelTechno] = useState<any>();
  const [batchType, setBatchType] = useState<string>('');
  const [isAlert, setIsAlert] = useState(false)
  const [counter,setCounter] = useState(5)

  const [filterStudents, setFilterStudents] = useState<any>({
    month_number: date.getMonth(),
    month: date.toLocaleString('default', { month: 'long' }),
    year: date.getFullYear().toString(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    data.batch_status = 'open';

    //PIC diambil dari user yang login (recruiter)
    data.batch_pic_id = 1;

    let newTrainer = {
      tpro_emp_entity_id: data.trainer.emp_entity_id,
    };

    let newCoTrainer = {
      tpro_emp_entity_id: data.cotrainer.emp_entity_id,
    };

    let newTrainee = [];

    for (let i in checked) {
      newTrainee.push({
        user_id: checked[i].user_id,
      });
    }
    const newObj = {
      batch: data,
      trainee: newTrainee,
      instructors: [newTrainer, newCoTrainer],
    };

    dispatch(addBatchReq(newObj));
    setIsAlert(true)
  };

  const activate = (item: any, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setChecked([...checked, item]);
    } else {
      setChecked(checked.filter((it: any) => it.user_id !== item.user_id));
    }
  };

  const years: number[] = [];
  const months: any = [];

  for (let i = 0; i < 12; i++) {
    years.push(date.getFullYear() + i);

    const dateMonth = new Date(2000, i, 1);
    const monthName = dateMonth.toLocaleString('default', { month: 'long' });
    const monthNumber = i;

    months.push({ monthName, monthNumber });
  }

  const filteredStudents = recstudents?.filter((student: any) => {
    const dateObj = new Date(student.join_date);

    const month: any = dateObj.getMonth();
    const year: any = dateObj.getFullYear();

    return month == filterStudents.month_number && year == filterStudents.year;
  });

  useEffect(() => {
    dispatch(getAllTrainersReq());
    dispatch(getAllProgramsReq());
    dispatch(getAllRecStudentReq(selTechno));

    setValue('batch_entity_id', selTechno);
    setValue('batch_type', batchType);
    setValue('trainer', selectedTrainer);
    setValue('cotrainer', selectedCoTrainer);

    if(isAlert){
      const timer = setTimeout(()=>{
        setIsAlert(false)
      },4000)

      return () => {
        clearTimeout(timer);
      };
    }

  }, [selTechno, batchType, selectedTrainer, selectedCoTrainer,isAlert]);

  return (
    <div className="w-full bg-white rounded-md p-10 mx-auto ">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <button type='button' onClick={()=>setIsAlert(true)}>on</button> */}
        {
          isAlert?
          <Alert className='mb-4'>{message} redirecting in: {counter}</Alert>:
          ''
        }
        <div className="flex justify-between">
          <Typography variant="h5" color="blue-gray">
            Create Batch
          </Typography>
        </div>
        <br />
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-5">
          <div className="lg:w-3/4 flex flex-col gap-5 lg:border-r-2 lg:pr-10 border-gray-200">
            <Typography color="gray" className="font-normal mb-5">
              General Information
            </Typography>
            <div>
              <Input
                label="Batch Name"
                {...register('batch_name', { required: true })}
                error={errors.batch_name ? true : false}
              />
              {errors.batch_name && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex lg:flex-row flex-col gap-5">
              <div className="w-1/2">
                <Select
                  inputProps={{
                    ...register('batch_entity_id', { required: true }),
                  }}
                  error={errors.batch_entity_id ? true : false}
                  onChange={setSelTechno}
                  label="Technology"
                >
                  {(programs || []).map((item: any) => (
                    <Option
                      key={item.prog_entity_id}
                      value={item.prog_entity_id}
                    >
                      {item.prog_title}
                    </Option>
                  ))}
                </Select>
                {errors.batch_entity_id && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              <div className="w-1/2">
                <Select
                  inputProps={{ ...register('batch_type', { required: true }) }}
                  onChange={setBatchType}
                  label="Type"
                  error={errors.batch_type ? true : false}
                >
                  <Option key="offline" value="offline">
                    Offline
                  </Option>
                  <Option key="online" value="online">
                    Online
                  </Option>
                  <Option key="corporate" value="corporate">
                    Corporate
                  </Option>
                </Select>
                {errors.batch_type && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="lg:flex justify-between gap-5">
              <div className="w-full">
                <Textarea
                  label="Description"
                  {...register('batch_description', { required: true })}
                  error={errors.batch_description}
                />
                {errors.batch_description && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="lg:w-1/4">
            <Typography color="gray" className="font-normal mb-5">
              Estimated Range Date
            </Typography>
            <div>
              <span className="text-sm mr-2 grid content-center">From</span>
              <div>
                <input
                  type="date"
                  {...register('batch_start_date', { required: true })}
                  className={`appearance-none border ${
                    errors.batch_start_date
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 text-red-500'
                      : 'border-blue-gray-200 focus:ring-light-blue-500 focus:border-light-blue-500 text-gray-600'
                  } rounded-md px-4 py-2 w-full text-sm focus:outline-none focus:ring-1`}
                />
                {errors.batch_start_date && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="mb-5">
              <span className="text-sm mr-2 grid content-center">To</span>
              <div>
                <input
                  type="date"
                  {...register('batch_end_date', { required: true })}
                  className={`appearance-none border ${
                    errors.batch_start_date
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 text-red-500'
                      : 'border-blue-gray-200 focus:ring-light-blue-500 focus:border-light-blue-500 text-gray-600'
                  } rounded-md px-4 py-2 w-full text-sm focus:outline-none focus:ring-1`}
                />
                {errors.batch_end_date && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <br />
        <Typography color="gray" className="font-normal mb-1 mt-3">
          Select Trainer and Co-Trainer
        </Typography>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 mt-5 ">
          <div className="lg:w-1/2">
            <div>
              <Select
                onChange={setSelectedTrainer}
                label="Trainer"
                inputProps={{ ...register('trainer', { required: true }) }}
                error={errors.trainer ? true : false}
              >
                {(trainers || []).map((item: any) => (
                  <Option key={item.emp_entity_id} value={item}>
                    {item.user_first_name}
                  </Option>
                ))}
              </Select>
              {errors.trainer && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div>
              <Select
                onChange={setSelectedCoTrainer}
                label="Co-Trainer"
                inputProps={{ ...register('cotrainer', { required: true }) }}
                error={errors.cotrainer ? true : false}
              >
                {(trainers || []).map((item: any) => (
                  <Option value={item}>{item.user_first_name}</Option>
                ))}
              </Select>
              {errors.cotrainer && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>
        </div>

        <Typography color="gray" className="font-normal mb-2 mt-10">
          Recommended Bootcamp Members
        </Typography>
        <div className="flex justify-end my-10 gap-7 text-gray-800">
          <select
            onChange={e =>
              setFilterStudents({
                ...filterStudents,
                month_number: e.target.value,
              })
            }
            className="pr-2"
          >
            {months.map((month: any) => (
              <option
                selected={month.monthNumber === filterStudents.month_number}
                key={month.monthNumber}
                value={month.monthNumber}
              >
                {' '}
                {month.monthName}{' '}
              </option>
            ))}
          </select>
          <select
            onChange={e =>
              setFilterStudents({ ...filterStudents, year: e.target.value })
            }
            className="pr-2"
          >
            {years.map((year: string | number) => (
              <option
                selected={year === filterStudents.year}
                key={year}
                value={year}
              >
                {' '}
                {year}{' '}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 justify-start ">
          {filteredStudents ? (
            filteredStudents.map((item: any, index: number) => (
              <div className="my-3" key={item.user_id}>
                <label
                  className={`flex justify-between content-center w-auto cursor-pointer rounded-lg py-3 px-4 font-semibold text-sm ${
                    checked.find((i: any) => i.user_id === item.user_id)
                      ? 'bg-light-blue-500 border border-light-blue-500 transition-all duration-300 text-white shadow-lg shadow-light-blue-200'
                      : 'bg-white border border-gray-`300 text-light-blue-400 hover:scale-105 transition-transform ease-in-out'
                  }`}
                >
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10" src={item.user_photo} />
                    <div>
                      <div>{item.user_first_name}</div>
                      <div className="font-normal text-light-blue-200">
                        {item.user_last_name}
                      </div>
                    </div>
                  </div>
                  <input
                    className="hidden"
                    type="checkbox"
                    onChange={e => activate(item, e)}
                  />
                  {checked.find((i: any) => i.user_id === item.user_id) ? (
                    <div className="text-xl grid content-center">
                      {' '}
                      <HiMinusSm />{' '}
                    </div>
                  ) : (
                    <div className="text-xl grid content-center">
                      {' '}
                      <HiPlusSm />{' '}
                    </div>
                  )}
                  {/* {
                    checked.map(check=>(
                      check.
                    ))
                  } */}
                </label>
              </div>
            ))
          ) : (
            <div className=" flex justify-items-center mx-auto text-center text-sm ">
              <p className="bg-red-100 px-12 py-2 rounded-md text-red-900">
                Belum ada orang yang mendaftar program terpilih <br /> Coba
                ganti program
              </p>
            </div>
          )}
        </div>
        <div className="flex w-full justify-center mt-5">
          <Button type="submit" className="w-1/4">
            submit
          </Button>
        </div>
      </form>
    </div>
  );
}
