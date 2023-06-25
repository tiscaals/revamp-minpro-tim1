import React, { Fragment, useState } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { reqUpdateCat } from '@/redux/actions/actionReducer';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const EditCategory = (props: any) => {
  const dispatch = useDispatch();
console.log('asw',props.list[0])
// console.log('cat',props.data)
  type FormValues = {
    cate_id: number;
    cate_name: string;
    cate_cate_id: number;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleRegistration = async (data: FormValues) => {
    console.log('ini',data);
    dispatch(reqUpdateCat(data));
    props.closeModal()
  };

  const [selected, setSelected] = useState('');


  return (
    <div>
      <Transition appear show={props.show} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto z-50"
          onClose={() => null}
        >
          <div className="min-h-screen flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                <Dialog.Title
                  as="h3"
                  className=" pt-3 text-center text-lg leading-6 text-gray-700 font-bold"
                >
                  Edit Category
                </Dialog.Title>
                <form className="space-y-6" onSubmit={handleSubmit(handleRegistration)}>
                <div className="w-2/3">
                      <input
                        type="hidden"
                        defaultValue={props.data.cate_id}
                        {...register('cate_id')}
                      />
                    </div>
                  <div className="flex items-center">
                    <label
                      className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                      htmlFor="inline-full-name"
                    >
                      Category Name
                    </label>
                    <div className="w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="text"
                        defaultValue={props.data.cate_name}
                        {...register('cate_name')}
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label
                      className="text-gray-500 font-bold md:text-right flex-shrink-0 w-1/3 pr-2"
                      htmlFor="inline-password"
                    >
                      Parent Category
                    </label>
                    <div className="w-2/3">
                    <select {...register('cate_cate_id')} className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900'>
                    <option value="">-- Pilih --</option> {/* Empty string to represent null */}
                    {props.list[0]?.map((ct: any) => (
                      <option key={ct.cate_id} value={ct.cate_id} >
                        {ct.cate_name}
                      </option>
                    ))}
                  </select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="mr-4 shadow bg-teal-600 hover:bg-teal-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="button"
                      onClick={() => props.closeModal()}
                    >
                      Cancel
                    </button>
                    <button
                      className="shadow bg-teal-600 hover:bg-teal-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EditCategory;
