import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSectReq } from '../redux/curriculum-schema/action/actionReducer';
import { useForm } from 'react-hook-form';

const ModalSection = ({
  setShowModal,
  handleNavbarTitle,
  handleAddSection,
}: any) => {
  const dispatch = useDispatch();
  type FormValues = {
    sect_title: string;
    description: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  //   const [showModal, setShowModal] = useState(false);
  const handleCancel = () => {
    setShowModal(false);
  };

  const [createdSectionId, setCreatedSectionId] = useState(null);
  console.log('id',setCreatedSectionId);

  const handleRegistrationSection = (data: any) => {
    // console.log('data', data);
    // console.log('form data', ...formData);
    // dispatch(addSectReq(formData))
    dispatch(addSectReq(data));
    // const sectionId = data.sect_id;
    // setCreatedSectionId(sectionId);
    handleCancel();
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded-lg z-10">
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Add Section
              </h3>
              <div className="mt-2">
                <form
                  onSubmit={handleSubmit(handleRegistrationSection)}
                  onReset={handleCancel}
                >
                  <div className="max-w-xl bg-white py-6 px-3 m-auto w-full mt-6">
                    <div className="grid grid-cols-1 gap-4 max-w-xl -auto">
                      <div className="col-span-1">
                        <input
                          type="text"
                          {...register('sect_title')}
                          onChange={handleNavbarTitle}
                          className="border-solid rounded-lg border-gray-400 border-2 p-3 md:text-md w-full"
                          placeholder="Section Title"
                        />
                      </div>
                      <div className="col-span-1">
                        <input
                          type="text"
                          {...register('description')}
                          className="border-solid rounded-lg border-gray-400 border-2 p-3 md:text-md w-full"
                          placeholder="Section Description"
                        />
                      </div>
                      <div className="flex-row space-x-4 mt-4 text-right"></div>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleAddSection}
                      >
                        Add
                      </button>
                      <button
                        type="reset"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSection;
