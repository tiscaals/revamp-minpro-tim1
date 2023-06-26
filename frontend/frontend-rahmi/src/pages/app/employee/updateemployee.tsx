import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { format } from "date-fns";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { reqdepartment, reqmasterjoro, requpdateemployee } from "../../redux/hr-schema/action/actionReducer";
import DatePicker from "react-multi-date-picker";
// import { doRequestGetFilterDepartment, doRequestGetFilterJobRole, doRequestUpdate } from "@/redux/hr-schema/action/actionReducer";


const EditEmployee = (props: any) => {
    const dispatch = useDispatch()

    const { department, joro, message, refresh } = useSelector((state: any) => state.empReducers)

    useEffect(() => {
        // dispatch(doRequestGetFilterDepartment())
        // dispatch(doRequestGetFilterJobRole())
        dispatch(reqdepartment())
        dispatch(reqmasterjoro())

        register('emp_entity_id')
        setValue('emp_entity_id', props.data.user_entity_id)
    }, [refresh]
    )

    type FormValues = {
        emp_entity_id: number
        emp_hire_date: string
        emp_end_contract: string
        emp_joro_id: number
        edhi_dept_id: number
        emp_type: string
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormValues>();


    const handleRegistration = async (data: any) => {

        register
        console.log(data);

        dispatch(requpdateemployee(data))

        // dispatch(doRequestUpdate(data))
        // dispatch(doRequestCreateEmployeeInternal(isiData))
    }

    const [hire_date, sethire_date] = useState('');
    const [endContract, seteEndContarc] = useState('');

    const formHireDate = (yyyy: any, mm: any, dd: any) => {
        register("emp_hire_date")
        if (mm < 10) {
            // console.log(yyyy+'/0'+mm+'/'+dd)
            const inputDate = yyyy + '-0' + mm + '-' + dd;
            sethire_date(inputDate);
            setValue('emp_hire_date', inputDate)
        } else {
            const inputDate = yyyy + '-' + mm + '-' + dd;
            sethire_date(inputDate);
            setValue('emp_hire_date', inputDate)
        }
    };

    const formEndContractDate = (yyyy: any, mm: any, dd: any) => {
        register("emp_end_contract")
        if (mm < 10) {
            // console.log(yyyy+'/0'+mm+'/'+dd)
            const inputDate = yyyy + '-0' + mm + '-' + dd;
            seteEndContarc(inputDate);
            setValue('emp_end_contract', inputDate)
        } else {
            const inputDate = yyyy + '-' + mm + '-' + dd;
            seteEndContarc(inputDate);
            setValue('emp_end_contract', inputDate)
        }
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
                                <Dialog.Panel className="w-full max-w-xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                    </Dialog.Title>
                                    <div className="mt-6 w-full">
                                        <form onSubmit={handleSubmit(handleRegistration)}>
                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                <div className="w-full px-3">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                        Job Role
                                                    </label>
                                                    <select {...register('emp_joro_id')} name="emp_joro_id" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                        {joro.map((dt: any, index: any) => {
                                                            let jobRole = [];

                                                            if (dt.joro_name === props.data.joro_name) {
                                                                jobRole.push
                                                                    (
                                                                        <option selected key={dt.joro_id} value={dt.joro_id}>
                                                                            {dt.joro_name}
                                                                        </option>
                                                                    )
                                                            }
                                                            else {
                                                                jobRole.push
                                                                    (
                                                                        <option key={dt.joro_id} value={dt.joro_id}>
                                                                            {dt.joro_name}
                                                                        </option>

                                                                    )
                                                            }
                                                            return jobRole
                                                        }

                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                <div className="w-full px-3">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                        Department
                                                    </label>

                                                    <select
                                                        {...register('edhi_dept_id')} name="edhi_dept_id" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                        {department.map((dt: any, index: any) => {
                                                            let dept = [];

                                                            if (dt.dept_name === props.data.dept_name) {
                                                                dept.push
                                                                    (
                                                                        <option selected key={dt.dept_id} value={dt.dept_id}>
                                                                            {dt.dept_name}
                                                                        </option>
                                                                    )
                                                            }
                                                            else {
                                                                dept.push
                                                                    (
                                                                        <option key={dt.dept_id} value={dt.dept_id}>
                                                                            {dt.dept_name}
                                                                        </option>

                                                                    )
                                                            }
                                                            return dept
                                                        }

                                                        )}
                                                    </select></div>
                                            </div>
                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                <div className="w-full px-3">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                        Start Contract
                                                    </label>
                                                    <div className="flex">

                                                        <div className="grid-col-2 gap-4 flex mt-9">
                                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                Start Date
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
                                                                className="rmdp-ep-popper-shadow"
                                                            />

                                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                End Date
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
                                                                className="rmdp-ep-popper-shadow"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap -mx-3">
                                                <div className="w-full px-3">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                        Type
                                                    </label>
                                                    <select {...register('emp_type')} name="emp_type" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                        <option value={'internal'}>Internal</option>
                                                        <option value={'outsource'}>Outsource</option>
                                                    </select>
                                                </div>

                                                <div className=" mt-12 right-8 text-sm">
                                                    <button className="uppercase p-3 rounded-lg mr-5 bg-blue-400 hover:bg-blue-800 text-white">Update</button>

                                                    <button onClick={props.closeModal} className="uppercase p-3 rounded-lg bg-blue-400 hover:bg-blue-800 text-white">Cancel</button>
                                                </div>
                                            </div>


                                        </form>






                                    </div>


                                </Dialog.Panel>

                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )


}

export default EditEmployee