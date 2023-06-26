import React, { useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import { GrAddCircle } from 'react-icons/gr'
import { TiDeleteOutline } from 'react-icons/ti'
import AddCity from './addCity'
import EditCity from './editCity'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { reqDelCity } from '@/pages/redux/master-ade-schema/actions/actionReducer'

const City = (props : any) => {
  console.log(props)

  const [isDataProv , setIsDataProv] = useState('')
  const [isDataCity , setIsDataCity] = useState('')
  const [isEdit , setIsEdit] = useState(false)
  const[isAdd , setIsAdd]= useState(false)
  const dispatch = useDispatch();
  const handleDelete = async (data : string) => {
    console.log('1',{data})
    
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
        dispatch(reqDelCity(data))
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
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
          <div className='border font-bold text-lg'>City</div>
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b bg-white-100 font-medium dark:border-neutral-500 dark:bg-neutral-600 bg-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    City Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Province
                  </th>
                  <th scope="col" className="px-6 py-4 text-right">

                  
                <div className="flex justify-end pr-7 ">
                    <button className="flex items-center shadow w-auto bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold  px-4 py-2 rounded"
                    onClick={()=>{setIsAdd(true); setIsDataProv(props.prov)}}>
                    <GrAddCircle className="mr-1"></GrAddCircle>
                    <span className="text-sm">Add</span>
                    </button>
                      </div>

                </th>
                </tr>
              </thead>
              <tbody>
                {props.city && props.city[0]?.map((city : any, index : any) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-neutral-100 dark:bg-neutral-700" : "bg-white dark:bg-neutral-600"}
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{city.city_name}</td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{city.prov_name}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">


                    <div className="flex justify-end">
                                  <div className='pt-2 shadow w-auto bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold px-3 rounded-md'>
                                    <div className="flex items-center">
                                      <BsPencil className="mr-1" />
                                      <span className="font-bold">
                                    <button 
                                      onClick={() => {
                                        setIsDataProv(props.prov);
                            setIsDataCity(city);
                            setIsEdit(true);
                                      }}
                                  >
                            Edit
                          </button> 
                        </span>
                      </div>
                    </div>
                  <span className='px-0.5'></span>


                            <div className='py-2 shadow w-auto bg-red-500 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold  px-3 rounded-md'>
                            <div className="flex items-center">
                          <TiDeleteOutline className="mr-1" />
                          <span className="font-bold">
                          <button 
                           onClick={()=>handleDelete(city.city_id)}
                          >Delete</button> 
                            </span>
                            </div>
                            </div>
                        </div>

                    </td>
                  </tr>
                 ))} 
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isEdit?(
      <EditCity show={isEdit} closeModal={()=>setIsEdit(false)} dataProv={isDataProv} dataCity={isDataCity}/>
    ):('')}
    {isAdd?(
      <AddCity show={isAdd} closeModal={()=>setIsAdd(false)} dataProv={isDataProv} />
    ):('')}
    </div>
  )
}

export default City
