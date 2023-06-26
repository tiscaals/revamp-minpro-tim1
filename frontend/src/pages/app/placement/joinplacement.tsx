import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
// import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { GrSearch } from 'react-icons/gr';

import { useRouter } from 'next/router';
import {
  reqaccountmanager,
  reqjobtype,
  reqsearchclient,
  reqtalents,
  reqtalentsemp,
  reqdepartment,
} from '../../redux/hr-schema/action/actionReducer';

const JoinPlacement = (props: any) => {
  let { placement, client, jobType, AM, message, status, refresh } =
    useSelector((state: any) => state.hrReducers);
  const { department } = useSelector((state: any) => state.empReducers);

  let dispatch = useDispatch();
  let router = useRouter();

  type FormValue = {
    emp_entity_id: number;
    emp_emp_number: string;
    emp_birth_date: Date;
    emp_type: string;
    emp_joro_id: number;
    emp_emp_entity_id: number;
    edhi_dept_id: number;
    ecco_entity_id: number;
    ecco_contract_no: string;
    ecco_contract_date: Date;
    ecco_start_date: Date;
    ecco_end_date: Date;
    ecco_notes: Text;
    ecco_modified_date: Date;
    ecco_media_link: string;
    ecco_joty_id: number;
    ecco_account_manager: number;
    ecco_clit_id: number;
    ecco_status: string;
    talent_status: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValue>();

  const handleRegistration = async (data: any) => {
    register;
    dispatch(reqtalentsemp(data));
    console.log('ini data', data);
    console.log('ini props', props);
  };

  useEffect(() => {
    dispatch(reqsearchclient());
    dispatch(reqjobtype());
    dispatch(reqaccountmanager());
    dispatch(reqdepartment());
  }, [refresh]);

  const [start_date, setStart_date] = useState('');
  const [end_date, seteEndDate] = useState('');


  const formStartDate = (yyyy: any, mm: any, dd: any) => {
    // register('ecco_start_date');
    if (mm < 10) {
      const inputDate = yyyy + '-0' + mm + '-' + dd;
      setStart_date(inputDate);
      // setValue('ecco_start_date', inputDate);
    } else {
      const inputDate = yyyy + '-' + mm + '-' + dd;
      setStart_date(inputDate);
      // setValue('ecco_start_date', inputDate);

    }
  };

  const formEndContractDate = (yyyy: any, mm: any, dd: any) => {
    // register('ecco_end_date');
    if (mm < 10) {
      const inputDate = yyyy + '-0' + mm + '-' + dd;
      seteEndDate(inputDate);
      // setValue('ecco_end_date', inputDate);
    } else {
      const inputDate = yyyy + '-' + mm + '-' + dd;
      seteEndDate(inputDate);
      // setValue('ecco_end_date', inputDate);
    }
  };

  const handleForm = (event: any) => {
    // let employees = {
    //   accounting: []
    // };
    event.preventDefault();
    // console.log('isiform',event)
    // console.log('data',event.target[1].value)
    // console.log('nama',event.target.dept_id.value)
    // arr.push('dephi_id''1')
    const employee = {
      'emp_entity_id': props.data.user_entity_id,
      'emp_emp_number': event.target.emp_number.value,
      'emp_birth_date': props.data.user_birth_date,
      'emp_hire_date': start_date,
      'emp_end_contract': end_date,
      'emp_type': event.target.emp_type.value,
      'emp_joro_id': event.target.job_role.value,
      'emp_emp_entity_id': 1,
      "edhi_dept_id: ": event.target.dept_id.value,
      'ecco_contract_no': event.target.contract_no.value,
      'ecco_notes': event.target.notes.value,
      'ecco_media_link': 'tanda tanya',
      'ecco_joty_id': event.target.job_type.value,
      'ecco_account_manager': event.target.am.value,
      'ecco_clit_id': clientID,
      'ecco_status': event.target.ecco_status.value,
      'talent_status': event.target.talent_status.value

    }

    console.log("EMPLOYEEEEE", employee)
    dispatch(reqtalentsemp(employee))
  }

  const [clientName, setClientName] = useState('');
  const [clientID, setClientID] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData]: any = useState([]);

  const [contractDate, setContractDate] = useState('');

  const handleSearchChange = () => {
    setIsSearching(true);

    // register('emp_entity_id');
    // setValue('emp_entity_id', props.data.user_entity_id);
    // register('emp_birth_date');
    // setValue('emp_birth_date', props.data.user_birth_date);
    // console.log('emp_birth_date', props.data.user_birth_date);
    // register('emp_emp_entity_id');
    // setValue('emp_emp_entity_id', 1);
    // register('ecco_media_link');
    // setValue('ecco_media_link', 'media_link');

    const filtered = client.filter((item: any) => {
      const clitName = item.clit_name?.toLowerCase() ?? '';
      return clitName.includes(searchValue.toLowerCase());
    });

    setFilteredData(filtered);
    if (filteredData.length > 0) {
      setClientName(filtered[0].clit_name);
      setClientID(filtered[0].clit_id);
      console.log('clientID', clientID);
      // register('ecco_clit_id');
      // setValue('ecco_clit_id', clientID);
    }

    // console.log('client ID', clientID);
    // console.log('client name', clientName);
  };

  const handleChange = (e: any) => {
    setSearchValue(e.target.value);

  };

  const displayData = isSearching ? filteredData : client;

  return (
    <div>
      <Transition appear show={props.show} as={Fragment}>
        <Dialog as="div" className="relative z-10" static onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md relative transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-sms font-semibold text-light-blue-900 leading-6"
                  ></Dialog.Title>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label className="block text-sm font-semibold leading-6 text-gray-900">
                        Client Search
                      </label>
                      <div className="mt-2.5">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <GrSearch className="w-5 h-5 text-gray-500"></GrSearch>
                          </div>
                          <input
                            type="search"
                            id="default-search"
                            className="w-full p-3 pl-10 text-sm rounded-lg text-gray-900 border border-gray-300 "
                            placeholder="Client Name..."
                            defaultValue={searchValue}
                            onChange={handleChange}
                            required
                          />
                          <button
                            type="submit"
                            onClick={() => handleSearchChange()}
                            className="text-white absolute right-1 bottom-2 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-4 py-2"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* <form onSubmit={handleSubmit(handleRegistration)}> */}

                    <form onSubmit={handleForm}>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                          Client Name
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-6"
                            value={clientName}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                          Department
                        </label>
                        <div className="mt-2.5">
                          <select
                            // value={selectedDepartment}
                            // {...register('edhi_dept_id')}
                            // onChange={handleSelectChange}
                            name='dept_id' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          >
                            {(department || []).map((dp: any, index: any) => (
                              <option key={dp.dept_id} value={dp.dept_id}>
                                {dp.dept_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                          Contract No
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            // name=""
                            // id=""
                            // {...register('ecco_contract_no')}
                            //   autoComplete="given-name" 
                            name='contract_no'
                            className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-6"
                            placeholder="Contract No"
                          />
                        </div>
                      </div>

                      <div className="grid-col-2 gap-4 flex mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                          Periode
                        </label>
                        {/* '0'+event.month.number */}
                        <DatePicker
                          // value={startDate}
                          onChange={(event: any) =>
                            formStartDate(
                              event.year,
                              event.month.number,
                              event.day
                            )
                          }
                          style={{
                            textAlign: 'center',
                            height: '40px',
                            width: '110px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            padding: '3px 10px',
                          }}
                          placeholder="Start Date"
                          className="rmdp-mobile"
                          mobileLabels={{
                            OK: 'Accept',
                            CANCEL: 'Close',
                          }}
                        />
                        <DatePicker
                          onChange={(event: any) =>
                            formEndContractDate(
                              event.year,
                              event.month.number,
                              event.day
                            )
                          }
                          style={{
                            textAlign: 'center',
                            height: '40px',
                            width: '110px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            padding: '3px 10px',
                          }}
                          placeholder="End Date"
                          className="rmdp-mobile"
                          mobileLabels={{
                            OK: 'Accept',
                            CANCEL: 'Close',
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                          Job Type
                        </label>
                        <select name='job_type'
                          // {...register('ecco_joty_id')}
                          className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-6"
                        >
                          {(jobType || []).map((djt: any) => (
                            <option key={djt.joty_id} value={djt.joty_id}>
                              {djt.joty_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4 grid gap-3 grid-cols-3">
                        <div>
                          <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Position
                          </label>
                          <input
                            type="text"
                            // name=""
                            // id=""
                            // {...register('emp_joro_id')}
                            //   autoComplete="given-name"
                            name='job_role' className="mt-2.5 w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-6"
                            placeholder="Input ID"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold leading-6 text-gray-900">
                            EMP Code
                          </label>
                          <input
                            type="text"
                            // name="contactNo"
                            // id=""
                            // {...register('emp_emp_number')}
                            //   autoComplete="given-name"
                            name='emp_number' className="mt-2.5 w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-6"
                            placeholder="Input ID"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold leading-6 text-gray-900">
                            EMP Type
                          </label>
                          <select
                            // value={selectedType}
                            // {...register('emp_type')}
                            // onChange={handleSelectChange}
                            name='emp_type' className="mt-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          >
                            <option value={'internal'}>Internal</option>
                            <option value={'outsource'}>Outsource</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4 grid gap-3 grid-cols-2">
                        <div>
                          <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Working Type
                          </label>
                          <select
                            // value={selectedType}
                            // {...register('ecco_status')}
                            // onChange={handleSelectChange}
                            name='ecco_status' className="mt-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          >
                            <option value={'onsite'}>Onsite</option>
                            <option value={'online'}>Online</option>
                            <option value={'hybrid'}>Hybrid</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold leading-6 text-gray-900">
                            Talent Status
                          </label>
                          <select
                            // value={selectedType}
                            // {...register('talent_status')}
                            // onChange={handleSelectChange}
                            name='talent_status' className="mt-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          >
                            <option value={'idle'}>Idle</option>
                            <option value={'placement'}>Placement</option>
                            <option value={'trial'}>Trial</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                          Created By
                        </label>
                        <select
                          // {...register('ecco_account_manager')}
                          name='am' className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-6"
                        >
                          {(AM || []).map((da: any) => (
                            <option key={da.emp_joro_id} value={da.emp_joro_id}>
                              {da.emp_emp_number}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                          Notes
                        </label>
                        <textarea
                          id="message"
                          // {...register('ecco_notes')}
                          name='notes' className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write your thoughts here..."
                        ></textarea>
                      </div>

                      <div className="flex-row space-x-4 mt-4 text-right">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Change Status
                        </button>
                        <button
                          onClick={props.closeModal}
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default JoinPlacement;
