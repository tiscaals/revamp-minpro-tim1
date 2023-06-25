
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { reqdepthistory, reqfindemployee } from "../../redux/hr-schema/action/actionReducer";

import { Button, Card, CardBody, CardHeader, Input, Typography, ButtonGroup, CardFooter } from '@material-tailwind/react';
import Link from "next/link";

const DepartmentHistory = (props: any) => {

    const dispatch = useDispatch()

    const { findEmp, depthis, message, refresh } = useSelector((state: any) => state.empReducers)

    const [editEmployee, setEditEmployee] = useState(false)



    const {query, isReady} = useRouter()
    const router = useRouter()

    const { id } = router.query

    useEffect(() => {

        if(router.isReady){
            console.log(router.query)
            const {id} :any = router.query
            dispatch(reqfindemployee(id))
            dispatch(reqdepthistory(id))

        }
        console.log("ID", id);
        console.log('dataNamaDepartment', depthis)


    }, [router.isReady]
    )

    if (!id) {
        return (
            <div className="relative flex min-h-screen flex-col justify-center items-center">
                Loading
            </div>
        )
    }

    const TABLE_HEAD = ["Department", "Start Date", "End Date"]

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
                            <img src={findEmp.user_photo} alt="profile" className='h-20 w-20 object-cover object-center rounded-full' />

                            <div className='items-center'>
                                <h1>{'@' + findEmp.user_name}</h1>
                                <h1>{findEmp.uspo_number}</h1>
                                <h1>{findEmp.pmail_address}</h1>
                            </div>
                            <div className='col-end-10 col-span-3 p-4 text-center '>
                                <div className='grid grid-cols-2 justify-between divide-x-2 border-2 rounded-lg border-blue-400 divide-blue-400 drop-shadow-md hover:shadow-blue-400 '>
                                    <Link href={{
                                        pathname: '/employee/department-history',
                                        query: {
                                            id: findEmp.user_entity_id
                                        }
                                    }}
                                        className='text-blue-700 text-sm font-medium py-5 hover:text-blue-900'
                                    >Department History</Link>
                                    <Link href={{
                                        pathname: '/employee/salary-history',
                                        query: {
                                            id: findEmp.user_entity_id
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
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map(head => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {(depthis || []).map((dt: any, index: any) => {
                                const isLast = index === depthis.length - 1;
                                const classes = isLast
                                    ? 'p-4'
                                    : 'p-4 border-b border-blue-gray-50';
                                return (
                                    <tr key={dt.id}>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal capitalize"
                                                >
                                                    {dt.dept_name}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal uppercase"
                                                >
                                                    {dt.edhi_start_date}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal capitalize"
                                            >
                                                {dt.edhi_end_date}
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <CardFooter>

                        <button
                            onClick={() => router.push('/employee')}
                            className='bg-blue-500 rounded-lg text-sm text-white font-medium absolute p-3 px-5 right-5 bottom-2'>Close</button>
                    </CardFooter>
                </CardBody>
            </Card>
        </div>
    )
}

export default DepartmentHistory