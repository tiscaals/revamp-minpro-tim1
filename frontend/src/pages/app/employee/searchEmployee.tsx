import { Dialog, Transition } from '@headlessui/react';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
// import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { reqsearchusers, reqtalentsJob } from '../../redux/hr-schema/action/actionReducer';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { List, ListItem, Card } from '@material-tailwind/react';
import { useRouter } from 'next/router';
// import { Route } from 'react-router-dom';
import CreateEmployee from './[user_entity_id]';

const SearchEmployee = (props: any) => {
  const { employee, talejob, message, refresh } = useSelector(
    (state: any) => state.empReducers
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const [dataEmployee,setDataEmployee] = useState([])
  useEffect(() => {
    dispatch(reqsearchusers());
    dispatch(reqtalentsJob())
  }, [refresh]);

  useEffect(()=>{

    const datax:any = [
      ...employee,...talejob

    ]
    setDataEmployee(datax)

    console.log('isi talent job',dataEmployee)


  },[talejob,employee])

  const [inputText, setInputText] = useState(''); //tamy
  const [fullname, setFullName] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const buttonSearch = () => {
    console.log('dataaa',dataEmployee)
    const filteredData = dataEmployee.filter((data: any) => {
      // console.log('ini data',data)
      if (data.user_name === inputText) {
        setFullName(data.user_first_name + ' ' + data.user_last_name);
        return true;
      }
      return false;
    });
    setFilteredEmployees(filteredData);
  };

  const handleEmployeeClick = (employeeId: any) => {
    
    router.push(`/employee/${employeeId}`);
  };

  return (
    <>
      <Transition appear show={props.show} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="static w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <IoMdCloseCircleOutline
                    className="text-2xl absolute top-3 right-4 hover:text-red-700"
                    onClick={props.closeModal}
                  />

                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {props.talentId}
                  </Dialog.Title>
                  <div className="mt-6 w-full">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          ></path>
                        </svg>
                      </div>
                      <input
                        defaultValue={inputText}
                        onChange={handleChange}
                        type="search"
                        id="default-search"
                        className="block w-full p-4 pl-10   text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Employee..."
                        required
                      />
                      <button
                        onClick={() => buttonSearch()}
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Search
                      </button>
                    </div>

                    <div className="flex justify-between mt-10 w-full">
                      {(filteredEmployees || []).map((ds: any, index: any) => (
                        // console.log(dt.id)
                        <List
                          key={ds.user_entity_id}
                          onClick={() => {
                            handleEmployeeClick(ds.user_entity_id);
                          }}
                        >
                          {fullname}
                        </List>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SearchEmployee;
