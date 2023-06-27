import { PaperClipIcon } from '@heroicons/react/20/solid'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
// import Content1 from '@/components/shared/content1';
import { useDispatch, useSelector } from 'react-redux';
import { reqfindemployee } from '../../redux/hr-schema/action/actionReducer';
// import EditEmployee from './edit-employee';
import { AiOutlinePaperClip } from 'react-icons/ai'
import { Button, Card, CardBody, CardHeader, Input, Typography, ButtonGroup, CardFooter } from '@material-tailwind/react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { FaUserPlus } from 'react-icons/fa';
import Link from 'next/link';
const profile:string = 'http://localhost:3003/profile/'

const DetailEmployee = (props: any) => {
    let { findEmp, refresh } = useSelector((state: any) => state.empReducers)
    const dispatch = useDispatch()

    const [editEmployee, setEditEmployee] = useState(false)

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        dispatch(reqfindemployee(id))
        console.log('dataEmployee', findEmp);
        console.log(id)

    }, [refresh, router.isReady]
    )
   
    useEffect(() => {
        console.log('dataEmployee', findEmp);

    }, [findEmp]
    )

    return (
        <div>
            <Card className=" h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Employee Detail
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Personal details and history.
                            </Typography>
                        </div>
                        <div className='mt-5 grid grid-cols-9 gap-4'>
                            <img src={`${profile}${findEmp.user_photo}`} alt="profile" className='h-20 w-20 object-cover object-center rounded-full' />

                            <div className='items-center'>
                                <h1>{'@' + findEmp?.user_name}</h1>
                                <h1>{findEmp?.uspo_number}</h1>
                                <h1>{findEmp?.pmail_address}</h1>
                            </div>
                            <div className='col-end-10 col-span-3 text-center '>
                                <div className='grid grid-cols-2 justify-between divide-x-2 border-2 rounded-lg border-blue-400 divide-blue-400 drop-shadow-md hover:shadow-blue-400 '>
                                    <Link href={{
                                        pathname: '/app/employee/department-history',
                                        query: {
                                            id: findEmp?.user_entity_id
                                        }
                                    }}
                                        className='text-blue-700 text-sm font-medium sm:py-5 py-3 hover:text-blue-900'
                                    >Department History</Link>
                                    <Link href={{
                                        pathname: '/app/employee/salary-history',
                                        query: {
                                            id: findEmp?.user_entity_id
                                        }
                                    }}
                                        className='text-blue-700 text-sm font-medium py-3 sm:py-5 hover:text-blue-900'
                                    >Salary History</Link>
                                </div>

                            </div>
                        </div>
                    </div>

                </CardHeader>
                <CardBody>


                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{findEmp?.user_first_name + ' ' + findEmp?.user_last_name}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Employee Code</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 uppercase">{findEmp?.emp_emp_number}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Employee Type</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{findEmp?.emp_type}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Department</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{findEmp?.dept_name}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Notes</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    ya mana tau ada gitu
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div className="flex w-0 flex-1 items-center">
                                                <AiOutlinePaperClip className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                                                    <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    Download
                                                </a>
                                            </div>
                                        </li>
                                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div className="flex w-0 flex-1 items-center">
                                                <AiOutlinePaperClip className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                                                    <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    Download
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <CardFooter>

                        <button
                            onClick={() => router.push('/app/employee')}
                            className='bg-blue-500 rounded-lg text-sm text-white font-medium absolute p-3 px-5 right-5 bottom-2'>Close</button>
                    </CardFooter>
                </CardBody>
            </Card>
        </div>
    )
}

export default DetailEmployee