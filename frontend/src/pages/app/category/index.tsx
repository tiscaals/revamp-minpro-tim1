import React, { useEffect, useState } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { TiDeleteOutline } from 'react-icons/ti';
import { BsPencil } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { reqCat, reqDelCat } from '@/redux/actions/actionReducer';
import BreadcrumbsSlice from '../shared/breadcrumbs';
import AddCategory from './addCategory';
import EditCategory from './editCategory';
import Swal from 'sweetalert2';

const Category = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataCat, setDataCat] = useState('');
  const [listEdit, setListEdit] = useState('');
  const { category, message, refresh } = useSelector((state : any) => state.catReducer);
  const dispatch = useDispatch();
console.log(category)

const handleDelete = async (id : number) => {
  console.log(id)
  
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
      dispatch(reqDelCat(id))
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

  useEffect(() => {
  const a = async()=>{

    dispatch(reqCat());
  } 
  a()
  }, [refresh]);

  return (
    <>
      <BreadcrumbsSlice />

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light border">
                <thead className="border-b border-b-gray-900 font-medium dark:border-neutral-500 dark:bg-neutral-600 bg-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Category Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Parent Category
                    </th>
                    <th scope="col" className="px-6 py-4 text-right">
                      <div className="flex justify-end">
                        <button
                          className="flex items-center"
                          onClick={() => {
                            setDataCat(category);
                            setIsAdd(true);
                          }}
                        >
                          <GrAddCircle className="mr-1" />
                          <span className="text-sm">Add</span>
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category && category[0]?.map((cat :any, index :any) => (
                    <tr
                      key={cat.cat_id}
                      className={index % 2 === 0 ? "bg-neutral-100 dark:bg-neutral-700" : "bg-white dark:bg-neutral-600"}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{cat.cate_name}</td>
                      <td className="whitespace-nowrap px-6 py-4">{cat.parent_name}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <div className="flex items-center justify-end">
                          <BsPencil className="mr-1 " />
                          <span className="mr-4 font-bold">
                            <button onClick={() => {
                            setDataCat(cat );
                            setListEdit(category)
                            setIsEdit(true);
                          }}>Edit</button> 
                            </span>
                          <TiDeleteOutline className="mr-1" />
                          <span className="font-bold">
                          <button onClick={()=>handleDelete(cat.cate_id)}
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
      </div>
      {isEdit ? (
        <EditCategory show={isEdit} closeModal={() => setIsEdit(false)} data={dataCat} list={listEdit}/>
      ) : (
        ''
      )}
      {isAdd?(
        <AddCategory show={isAdd} closeModal={()=>setIsAdd(false)} data={dataCat} />
      ):('')}
    </>
  );
};

export default Category;
