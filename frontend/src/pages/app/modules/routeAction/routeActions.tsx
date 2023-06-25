import { reqDelRouteAction, reqUpdateDisplayRouteAction } from '@/redux/actions/actionReducer'
import React, { useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import { GrAddCircle } from 'react-icons/gr'
import { TiDeleteOutline } from 'react-icons/ti'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import AddRA from './addRouteActions'
import EditRA from './editRouteActions'
import { useForm } from 'react-hook-form'

const RouteActions = (props : any) => {


  const dispatch = useDispatch();

  const handleRegistration = (roac_id :any, roac_display : any) => {
    const updatedDisplay = roac_display === '1' ? '0' : '1'; // Mengubah nilai display dari 1 ke 0 atau sebaliknya
  
    const editNilai = {
      roac_id: roac_id,
      roac_display: updatedDisplay,
    };
  
    dispatch(reqUpdateDisplayRouteAction(editNilai));
  };
  
    
    
    
  
const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState('');
  const handleDelete = async (data : number) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
  
      if (result.isConfirmed) {
        dispatch(reqDelRouteAction(data))
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      } else {
        Swal.fire(
          'Cancelled',
          'Your file is safe.',
          'info'
        );
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      Swal.fire(
        'Error!',
        'Failed to delete data. Please try again.',
        'error'
      );
    }
  };
  console.log('props.routeActions', props.routeActions)
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
          <div className='border font-bold text-lg'>Route Actions</div>
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b bg-white-100 font-medium dark:border-neutral-500 dark:bg-neutral-600 bg-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Route Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Module Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Display
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Order By
                  </th>
                  <th scope="col" className="px-6 py-4 text-right">
                <div className="flex justify-end">
                    <button className="flex items-center"
                    onClick={()=>setIsAdd(true)}>
                    <GrAddCircle className="mr-1"></GrAddCircle>
                    <span className="text-sm">Add</span>
                    </button>
                </div>
                </th>
                </tr>
              </thead>
              <tbody>
                {props.routeActions?.map((roac : any, index :any) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-neutral-100 dark:bg-neutral-700" : "bg-white dark:bg-neutral-600"}
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{roac.roac_name}</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{roac.roac_module_name}</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                  <input
                    className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:bg-blue-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-blue-500 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-blue-500 dark:checked:after:bg-blue-500 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    defaultChecked={roac.roac_display === '1' ? true : false}
                    onChange={() => handleRegistration(roac.roac_id, roac.roac_display)}

                    />
                </td>

                  

                    <td className="whitespace-nowrap px-6 py-4 font-medium">{roac.roac_orderby}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="flex items-center justify-end">
                    <BsPencil className="mr-1" />
                          <span className="mr-4 font-bold">
                            <button onClick={() => {
                            setData(roac);
                            setIsEdit(true);
                          }}>Edit</button> 
                            </span>
                          <TiDeleteOutline className="mr-1" />
                          <span className="font-bold">
                          <button onClick={()=>handleDelete(roac.roac_id)}
                          >Delete</button> 
                            </span>
                    </div>
                    </td>
                  </tr>
                 ))} 
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isAdd?(
        <AddRA show={isAdd} closeModal={()=>setIsAdd(false)} dataModule={props.module}/>
      ):('')}
      {isEdit?(
        <EditRA show={isEdit} closeModal={()=>setIsEdit(false)} data={data} dataModule={props.module}/>
      ):('')}
    </div>
  )
}

export default RouteActions
