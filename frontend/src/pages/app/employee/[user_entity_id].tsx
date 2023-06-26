import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  reqdataemployee,
  reqdepartment,
  reqmasterjoro,
  reqsearchusers,
  reqtalentsJob,
  requsersroles,
} from '../../redux/hr-schema/action/actionReducer';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import DatePicker from 'react-multi-date-picker';
// import format from 'date-fns/format';

const CreateEmployee = (props: any) => {
  const [hire_date, sethire_date] = useState('');
  const [endContract, seteEndContarc] = useState('');
  let router = useRouter();
  const { user_entity_id } = router.query;
  // console.log(user_entity_id);
  const dispatch = useDispatch();
  const { employee, department, joro, users, talejob, message, refresh } = useSelector(
    (state: any) => state.empReducers
  );

  useEffect(() => {
    dispatch(reqsearchusers());
    dispatch(requsersroles());
    dispatch(reqdepartment());
    dispatch(reqmasterjoro());
    dispatch(reqtalentsJob())
  }, [refresh, user_entity_id]);

  const [dataEmployee,setDataEmployee] = useState([])

  useEffect(() => {
    const datax:any = [
      ...employee,...talejob
    ]
    setDataEmployee(datax)
  }, [employee, talejob]);

  const formHireDate = (yyyy: any, mm: any, dd: any) => {
    register("emp_hire_date")
    if (mm < 10) {
      // console.log(yyyy+'/0'+mm+'/'+dd)
      const inputDate = yyyy + '-0' + mm + '-' + dd;
      sethire_date(inputDate);
      setValue('emp_hire_date',inputDate)
    } else {
      const inputDate = yyyy + '-' + mm + '-' + dd;
      sethire_date(inputDate);
      setValue('emp_hire_date',inputDate)
    }
  };

  const formEndContractDate = (yyyy: any, mm: any, dd: any) => {
    register("emp_end_contract")
    if (mm < 10) {
      // console.log(yyyy+'/0'+mm+'/'+dd)
      const inputDate = yyyy + '-0' + mm + '-' + dd;
      seteEndContarc(inputDate);
      setValue('emp_end_contract',inputDate)
    } else {
      const inputDate = yyyy + '-' + mm + '-' + dd;
      seteEndContarc(inputDate);
      setValue('emp_end_contract',inputDate)
    }
  };

  type FormValues = {
    emp_entity_id: number;
    emp_emp_number: string;
    emp_national_id: string;
    emp_birth_date: Date;
    emp_marital_status: string;
    emp_gender: string;
    emp_hire_date: string;
    emp_end_contract: string;
    emp_salaried_flag: string;
    emp_vacation_hours: number;
    emp_sickleave_hours: number;
    emp_current_flag: number;
    emp_type: string;
    emp_joro_id: number;
    emp_emp_entity_id: number;
    user_role: number;
    edhi_dept_id: number;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const handleRegistration = async (data: any) => {
    register

    console.log('isidata',data)

    dispatch(reqdataemployee(data));

    router.push('/employee');
  };

  const filteredEmployee = user_entity_id
    ? dataEmployee?.filter((de: any) => de.user_entity_id == user_entity_id)
    : dataEmployee;
    

  if (!user_entity_id && dataEmployee.length === 0) {
    return <div>Loading....</div>;
  }

  const registerOptions = {
    // emp_entity_id :
    // emp_emp_number: { required: 'Employee Code is Required' },
    // emp_national_id: { required: 'Employee National ID is Required' },
    // emp_birth_date: { required: 'Birth Date is Required' },
    // emp_marital_status char;
    // emp_gender char;
    // emp_hire_date: { required: 'Hire Date is Required' },
    // emp_end_contract: { required: 'End Contract Date is Required' },
    // emp_salaried_flag char;
    // emp_vacation_hours: { required: 'Vacation Hours is Required' },
    // emp_sickleave_hours: { required: 'Sikleave Hours is Required' },
    // emp_current_flag smallint;
    // emp_type VARCHAR(15);
    // emp_joro_id int;
    // emp_emp_entity_id int;
    // user_role int; (ini update dari hasil current_role)
    // edhi_dept_id int;
  };

  return (
    <>
      <form className="py-5" onSubmit={handleSubmit(handleRegistration)}>
        {(filteredEmployee || []).map((df: any, index: any) => (
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                User Entity ID
              </label>
              <input
                id="emp_entity_id"
                {...register('emp_entity_id', { value: df.user_entity_id })}
                className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder={df.user_entity_id}
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                id="Name"
                className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={`${df.user_first_name} ${df.user_last_name}`}
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Birth Date
              </label>
              <input
                id="emp_birth_date"
                {...register('emp_birth_date', { value: df.user_birth_date })}
                // {...register('emp_birth_date')}

                className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={df.user_birth_date}
                // {employee[0].user_birth_date}
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                User Role
              </label>
              <select
                {...register('user_role')}
                className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                {(users || []).map((du: any, index: any) => (
                  <option key={du.role_id} value={du.role_id}>
                    {du.role_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={df.uspo_number}
                // {employee[0].uspo_number}
                disabled
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="url"
                id="website"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={df.pmail_address}
                // {employee[0].pmail_address}
                disabled
              />
            </div>
          </div>
        ))}
        <div className="border-t-2 border-t-gray-200 grid gap-6 mb-6 md:grid-cols-2">
          <div className="">
            <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Employee Code
            </label>
            <input
              type="text"
              id="emp_emp_number"
              {...register('emp_emp_number')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="emp_emp_number"
            />
          </div>
          <div className="">
            <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
              KTP
            </label>
            <input
              type="text"
              id="emp_national_id"
              {...register('emp_national_id')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="emp_national_id"
            />
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Marital Status
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              // value={selectedMaritalStat}
              {...register('emp_marital_status')}
              // onChange={handleSelectChange}
            >
              <option value={'M'}>Married</option>
              <option value={'S'}>Single</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Gender
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              // value={selectedMaritalStat}
              {...register('emp_gender')}
              // onChange={handleSelectChange}
            >
              <option value={'M'}>Male</option>
              <option value={'F'}>Female</option>
            </select>
          </div>
          <div className="grid-col-2 gap-4 flex mt-9">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Hire Date
            </label>
            {/* '0'+event.month.number */}
            <DatePicker
              // value={startDate}
              onChange={(event: any) =>
                formHireDate(event.year, event.month.number, event.day)
              }
              style={{
                textAlign: 'center',
                height: '40px',
                width: '110px',
                borderRadius: '8px',
                fontSize: '14px',
                padding: '3px 10px',
              }}
              placeholder="date"
              className="rmdp-mobile"
              mobileLabels={{
                OK: 'Accept',
                CANCEL: 'Close',
              }}
            />

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              End Contract Date
            </label>
            <DatePicker
              onChange={(event: any) =>
                formEndContractDate(event.year, event.month.number, event.day)
              }
              style={{
                textAlign: 'center',
                height: '40px',
                width: '110px',
                borderRadius: '8px',
                fontSize: '14px',
                padding: '3px 10px',
              }}
              placeholder="date"
              className="rmdp-mobile"
              mobileLabels={{
                OK: 'Accept',
                CANCEL: 'Close',
              }}
            />
          </div>
          <div className="">
            <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
              Salaried Flag
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              // value={selectedSalaried}
              {...register('emp_salaried_flag')}
              // onChange={handleSelectChange}
            >
              <option value={'0'}>Hourly</option>
              <option value={'1'}>Salaried</option>
            </select>
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Vacation Hours
            </label>
            <input
              type="number"
              id=""
              {...register('emp_vacation_hours')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="cuti"
              // required
            />
          </div>
          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sickleave Hours
            </label>
            <input
              type="number"
              id=""
              {...register('emp_sickleave_hours')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="cuti"
              // required
            />
          </div>
          <div className="">
            <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
              Current Flag
            </label>
            <select
              // value={selectedCurrent}
              {...register('emp_current_flag')}
              // onChange={handleSelectChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value={'0'}>Inactive</option>
              <option value={'1'}>Active</option>
            </select>
          </div>
          <div className="">
            <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
              Employee Type
            </label>
            <select
              // value={selectedType}
              {...register('emp_type')}
              // onChange={handleSelectChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value={'internal'}>Internal</option>
              <option value={'outsource'}>Outsource</option>
            </select>
          </div>
          <div className="">
            <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
              Job Role
            </label>
            <select
              // value={selectedJoro}
              {...register('emp_joro_id')}
              // onChange={handleSelectChange}
              className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {(joro || []).map((dj: any, index: any) => (
                <option key={dj.joro_id} value={dj.joro_id}>
                  {dj.joro_name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
              Department
            </label>
            <select
              // value={selectedDepartment}
              {...register('edhi_dept_id')}
              // onChange={handleSelectChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {(department || []).map((dp: any, index: any) => (
                <option key={dp.dept_id} value={dp.dept_id}>
                  {dp.dept_name}
                </option>
              ))}
            </select>
            {/* <input {...register('emp_emp_entity_id', { value: 1 })} type="text" hidden /> */}
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateEmployee;
