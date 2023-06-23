import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addSectDetailReq } from '../redux/curriculum-schema/action/actionReducer';
import { Select, Option } from '@material-tailwind/react';

const ModalSectionDetail = ({ setShowModals, data }: any) => {
  const dispatch = useDispatch();
  type FormValues = {
    sect_id: number;
    secd_title: string;
    secd_notes: string;
    secd_minutes: number;
    sedm_filelink: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleCancel = () => {
    setShowModals(false);
  };

  const [IsSelectPreview, setIsSelectPreview] = useState('');
  const [IsSelectFileType, setIsSelectFileType] = useState('');

  const handleRegistrationSectionDetail = async (data: any) => {
    // console.log(data);
    const formData = new FormData();
    formData.append('secd_title', data.secd_title);
    formData.append('preview', IsSelectPreview);
    formData.append('note', data.secd_notes);
    formData.append('minutes', data.secd_minutes);
    formData.append('filename', data.sedm_filelink[0].name);
    formData.append('filesize', data.sedm_filelink[0].size);
    formData.append('filetype', IsSelectFileType);
    formData.append('filelink', data.sedm_filelink[0]);
    console.log('form data', ...formData);
    dispatch(addSectDetailReq(data.sect_id, formData));
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
                Sub Section
              </h3>
              <div className="mt-2">
                <form onSubmit={handleSubmit(handleRegistrationSectionDetail)}>
                  <input
                    type="hidden"
                    {...register('sect_id')}
                    defaultValue={data.sect_id}
                  />
                  <div className="max-w-xl bg-white py-6 px-3 m-auto w-full mt-6">
                    <div className="grid grid-cols-1 gap-4 max-w-xl -auto">
                      <div className="col-span-1">
                        <input
                          type="text"
                          {...register('secd_title')}
                          // onChange={(e: any) => setLinkTitle(e)}
                          className="border-solid rounded-lg border-gray-400 border-2 p-3 md:text-md w-full"
                          placeholder=" Sub Section Title"
                        ></input>
                      </div>
                      <div className="col-span-1">
                        <input
                          type="text"
                          {...register('secd_notes')}
                          className="border-solid rounded-lg border-gray-400 border-2 p-3 md:text-md w-full"
                          placeholder="Sub Section Notes"
                        ></input>
                      </div>
                      <div className='"col-span-1'>
                        <input
                          type="number"
                          {...register('secd_minutes')}
                          className="border-solid rounded-lg border-gray-400 border-2 p-3 md:text-md w-full my-4"
                          placeholder="Menit"
                        />

                        <input
                          type="number"
                          {...register('secd_minutes')}
                          className="border-solid rounded-lg border-gray-400 border-2 p-3 md:text-md w-full"
                          placeholder="Detik"
                        />
                      </div>
                      {/* <div className="col-span-1">
                        <input
                          type="text"
                          {...register('sedm_filename')}
                          className="border-solid rounded-lg border-gray-400 border-2 p-3 md:text-md w-full"
                          placeholder="File Name"
                        ></input>
                      </div> */}
                      {/* <div className="col-span-1">
                        <input
                          type="text"
                          {...register('sedm_filesize')}
                          className="border-solid rounded-lg border-gray-400 border-2 p-3 md:text-md w-full"
                          placeholder="File Size"
                        ></input>
                      </div> */}
                      <div className='"col-span-1'>
                        <Select onChange={(e:any)=> setIsSelectFileType(e)}>
                          <Option value="video">Video</Option>
                          <Option value="image">Image</Option>
                          <Option value="text">Text</Option>
                          <Option value="link">Link</Option>
                        </Select>
                      </div>
                      <div className='"col-span-1'>
                        <Select onChange={(e:any)=> setIsSelectPreview(e)}>
                          <Option value="0">Yes</Option>
                          <Option value="1">No</Option>
                        </Select>
                      </div>
                      <div className="col-span-1">
                        <input
                          type="file"
                          {...register('sedm_filelink')}
                          // value={linkURL}
                          // onChange={(e: any) => setLinkURL(e)}
                          className="border-solid rounded-lg border-gray-400 border-2 p-3 md:text-md w-full"
                          placeholder="File Link"
                        ></input>
                      </div>
                      <div className="flex-row space-x-4 mt-4 text-right">
                        <button
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Save
                        </button>
                        <button
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setShowModals(false)}
                        >
                          Cancel
                        </button>
                      </div>
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

export default ModalSectionDetail;
