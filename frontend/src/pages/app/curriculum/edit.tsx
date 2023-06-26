import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { reqCat } from '@/pages/redux/master-ade-schema/actions/actionReducer';
import { useRouter } from 'next/router';
import {
  currById,
  getAllCurrReq,
  getAlltable,
  getInstructor,
  getSectionMerge,
  updateCurrReq,
  viewSectionUp,
} from '../../redux/curriculum-schema/action/actionReducer';
import ContentLink from '../../contentlink';
import {
  Input,
  Select,
  Option,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Card,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import codexlogo from '../../../../public/defaultPhoto.png';
import { AiOutlinePlus } from 'react-icons/ai';
import { Viewer } from '@react-pdf-viewer/core';
import ModalSection from './modals/showModalSection';
import ModalSectionDetail from './modals/showModalSectDetail';


const EditCurr = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // let { getAll, refreshAll } = useSelector(
  //   (state: any) => state.getAllReducers
  // );
  // console.log('object', getAll);

  let { getCurrById, refreshCurr } = useSelector(
    (state: any) => state.curriculumReducers
  );

  let { category, refresh } = useSelector((state: any) => state.CatReduce);

  let { instructor, refereshIns } = useSelector(
    (state: any) => state.InstructorReducers
  );

  let { sectionUp, refreshSectUp } = useSelector(
    (state: any) => state.SectionUpReducers
  );

  // console.log("hai",sectionUp);

  type FormValues = {
    prog_entity_id: number;
    headline: string;
    title: string;
    price: string;
    image: any;
    payment_type: string;
    learning_type: string;
    cate_id: number;
    duration: number;
    duration_type: string;
    language: string;
    tag_skill: string;
    score: number;
    total_trainee: number;
    total_batch: number;
    item_learning: string;
    description: string;
    created_by: number;
    curr_number: string;
    status: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });

  const { id }: any = router.query;

  // console.log('object', id);

  const [loadedData, setLoadedData]: any = useState(null);
  const [loadedDatas, setLoadedDatas]: any = useState(null);

  // useEffect(() => {
  // dispatch(getAllCategory());
  // dispatch(getAlltable(71));
  // }, [refreshCat, loadedData]);
  // }, [refreshCat, loadedData]);

  // useEffect(() => {
  // dispatch({ type: 'RESET_STATE' });
  // dispatch(getAllCurrReq());
  // if (router.isReady) {
  //   console.log(id);
  // dispatch(getAlltable(id));
  // }
  // }, [refresh]);

  const [isSelect, setIsSelect] = useState('');
  const [isSelectLearning, setIsSelectLearning] = useState('');
  const [isSelectLanguage, setIsSelectLanguage] = useState('');
  const [isSelectDuration, setIsSelectDuration] = useState('');
  const [IsSelectCategory, setIsSelectCategory] = useState('');
  const [IsSelectType, setIsSelectType] = useState('');
  const [open, setOpen] = useState(null);
  const [opens, setOpens] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [sectionTitle, setSectionTitle] = useState('');
  const [navbarTitles, setNavbarTitles] = useState<string[]>([]);
  const [data, setData] = useState('');

  const handleOpens = (items: any) => {
    setSelectedFile(items);
    setOpens(!opens);
  };

  const handleOpen = (index: any) => {
    setOpen(index === open ? null : index);
  };
  const handleNavbarTitle = (e: any) => {
    setSectionTitle(e.target.value);
  };

  const handleAddSection = () => {
    setNavbarTitles([...navbarTitles, sectionTitle]);
    // setShowModal(false);
    setSectionTitle('');
  };

  useEffect(() => {
    dispatch(currById(id));
    // dispatch(getAlltable(id));
    dispatch(reqCat());
    // dispatch(getSectionMerge());
    dispatch(getInstructor());
    dispatch(viewSectionUp(id));
  }, [id, refresh, refereshIns, refreshSectUp]);

  useEffect(() => {
    if (router.isReady) {
      setLoadedData(getCurrById);
      setLoadedDatas(sectionUp);
      setIsSelect(loadedData?.payment_type);
      setIsSelectLearning(loadedData?.prog_learning_type);
      setIsSelectLanguage(loadedData?.prog_language);
      setIsSelectDuration(loadedData?.prog_duration);
      setIsSelectCategory(loadedData?.prog_cate_id);
    }

    // setLoadedData(getAll);
  }, [getCurrById, sectionUp, router.isReady]);

  console.log('object', loadedData);
  console.log('satu', loadedDatas);

  // console.log('sect', sectionUp);

  // console.log('select', isSelect);

  const handleRegistrationProgram = async (data: any) => {
    // console.log(data, 'p');
    const formData = new FormData();
    formData.append('headline', data.headline);
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('image', data.image[0]);
    formData.append('prog_type', IsSelectType);
    formData.append('payment_type', isSelect);
    formData.append('learning_type', isSelectLearning);
    formData.append('cate_id', IsSelectCategory);
    formData.append('duration', data.duration);
    formData.append('duration_type', isSelectDuration);
    formData.append('languages', isSelectLanguage);
    formData.append('total_trainee', data.total_trainee);
    formData.append('total_batch', data.total_batch);
    formData.append('score', data.score);
    formData.append('status', data.status ? 'publish' : 'draft');
    formData.append('tag_skill', data.tag_skill);
    formData.append('item_learning', data.item_learning);
    formData.append('description', data.description);
    // router.push('/curriculum');
    // console.log('form data : ', ...formData);
    // if (router.isReady) {
    //   dispatch(updateCurrReq(id, formData));
    // }
    // console.log(selectedImage);
  };

  function Icon({ id, open }: any) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? 'rotate-180' : ''
        } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }

  if (loadedData) {
    return (
      <ContentLink title="Edit Curriculum" isilink="/app/curriculum" button="Back">
        <div>
          <form onSubmit={handleSubmit(handleRegistrationProgram)}>
            <div className="lg:grid lg:grid-cols-2">
              <section className="pt-4 pb-10">
                <div className="container">
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-2/2">
                      <div>
                        <input
                          hidden
                          defaultValue={loadedData?.prog_entity_id}
                          {...register('prog_entity_id')}
                        ></input>
                      </div>
                      {/* headline */}
                      <div className="pad-input my-4">
                        <h1 className="text-format">Headline</h1>
                        <Input
                          id="outlined-basic"
                          placeholder="Headline"
                          defaultValue={loadedData?.prog_headline}
                          {...register('headline')}
                          variant="outlined"
                          className="w-full"
                          size="md"
                        />
                      </div>
                      {/* title */}
                      <div className="pad-input my-4">
                        <h1 className="text-format">Title</h1>
                        <Input
                          id="outlined-basic"
                          placeholder="Title"
                          defaultValue={loadedData?.prog_title}
                          {...register('title')}
                          variant="outlined"
                          className="w-full"
                          size="md"
                        />
                      </div>
                      {/* payment type & learning type */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h1 className="text-format">Payment Type</h1>
                          <Select
                            value={isSelect}
                            onChange={(e: any) => setIsSelect(e.target.value)}
                          >
                            <Option value="regular">regular</Option>
                            <Option value="pay">pay</Option>
                          </Select>
                        </div>
                        <div>
                          <h1 className="text-format">Learning Type</h1>
                          <Select
                            value={loadedData?.prog_learning_type}
                            onChange={(e: any) => setIsSelectLearning(e)}
                          >
                            <Option value="online">online</Option>
                            <Option value="offline">offline</Option>
                          </Select>
                        </div>
                      </div>
                      {/* category & language */}
                      <div className="pad-input grid grid-cols-2 gap-4">
                        <div>
                          <h1 className="text-format">Language</h1>
                          <Select
                            onChange={(e: any) => setIsSelectLanguage(e)}
                            value={loadedData?.prog_language}
                          >
                            <Option value="english">english</Option>
                            <Option value="bahasa">bahasa</Option>
                          </Select>
                        </div>
                        <div>
                          <h1 className="text-format">Category</h1>
                          <Select
                            value={loadedData?.prog_cate_id}
                            onChange={(e: any) => setIsSelectCategory(e)}
                          >
                            {category.map((option: any) => (
                              <Option
                                key={option.cate_id}
                                value={option.cate_id}
                              >
                                {option.cate_name}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                      {/* duration in month */}
                      <div className="pad-input grid grid-cols-2 gap-4">
                        {/* <div className="pad-input grid grid-cols-3 gap-4"> */}
                        {/* <div className="my-4 flex items-start gap-4"> */}
                        <div>
                          <h1 className="text-format">Duration</h1>
                          <Input
                            id="outlined-basic"
                            type="number"
                            placeholder="Duration"
                            defaultValue={loadedData?.prog_duration}
                            {...register('duration')}
                            size="md"
                            className="w-full text-sm py-1 px-2"
                          />
                        </div>
                        <div>
                          <h1 className="text-format">Duration Type</h1>
                          <Select
                            placeholder="Duration Type"
                            onChange={(e: any) => setIsSelectDuration(e)}
                            value={loadedData?.prog_duration_type}
                          >
                            <Option value="days">days</Option>
                            <Option value="week">week</Option>
                            <Option value="month">month</Option>
                          </Select>
                        </div>
                        {/* </div> */}
                      </div>
                      {/* total batch & total trainee */}
                      <div className="pad-input grid grid-cols-2 gap-4">
                        <div>
                          <h1 className="text-format">Total Trainee</h1>
                          <Input
                            id="outlined-basic"
                            type="number"
                            placeholder="Total Trainee"
                            defaultValue={loadedData?.prog_total_trainee}
                            {...register('total_trainee')}
                            size="md"
                            className="w-full text-sm py-1 px-2"
                          />
                        </div>
                        <div>
                          <h1 className="text-format">Total Batchs</h1>
                          <Input
                            id="outlined-basic"
                            type="number"
                            placeholder="Total Batchs"
                            defaultValue={loadedData?.total_batch}
                            {...register('total_batch')}
                            size="md"
                            className="w-full text-sm py-1 px-2"
                          />
                        </div>
                      </div>
                      {/* status */}
                      <div className="pad-input grid grid-cols-2 gap-4">
                        <div>
                          <h1 className="text-format">Status</h1>
                          <Select
                            //   value={status}
                            //   onChange={handleStatusChange}
                            placeholder="Status"
                            value={loadedData?.prog_status}
                          >
                            <Option value="publish">publish</Option>
                            <Option value="draft">draft</Option>
                          </Select>
                        </div>
                        <div>
                          <h1 className="text-format">Score</h1>
                          <Input
                            id="outlined-basic"
                            type="number"
                            placeholder="Score"
                            defaultValue={loadedData?.prog_score}
                            {...register('score')}
                            size="md"
                            className="w-full text-sm py-1 px-2"
                          />
                        </div>
                      </div>
                      {/* type */}
                      <div className="pad-input grid grid-cols-2 gap-4">
                        <div>
                          <h1 className="text-format">Type</h1>
                          <Select
                            onChange={(e: any) => setIsSelectType(e)}
                            placeholder="Type"
                            value={loadedData?.prog_type}
                          >
                            <Option value="bootcamp">Bootcamp</Option>
                            <Option value="course">Course</Option>
                          </Select>
                        </div>
                      </div>
                      {/* price */}
                      <div className="pad-input grid grid-cols-1 gap-4">
                        <div>
                          <h1 className="text-format">Price</h1>
                          <Input
                            id="outlined-basic"
                            placeholder="Price"
                            defaultValue={loadedData?.prog_price}
                            {...register('price')}
                            variant="outlined"
                            className="w-full"
                            size="md"
                            // defaultValue={'Rp. '}
                          />
                        </div>
                      </div>
                      {/* tag skill */}
                      <div className="pad-input">
                        <h1 className="text-format">Tag Skill</h1>
                        <Input
                          id="outlined-basic"
                          placeholder="Tag Skill"
                          defaultValue={loadedData?.prog_tag_skill}
                          {...register('tag_skill')}
                          variant="outlined"
                          className="w-full"
                          size="md"
                        />
                      </div>
                      {/* instructor */}
                      <div className="pb-2 lg:pb-0 lg:pl-4">
                        <h1 className="text-format">Instructor</h1>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <MagnifyingGlassIcon className="h-4 w-4" />
                          </div>
                          <input
                            type="text"
                            id="simple-search"
                            className=" text-sm rounded-lg block w-full pl-8 p-2.5 ring-1 lg:w-[17rem] "
                            placeholder="instructor"
                            // value={searchValue}
                            // onChange={e => handleSearchChange(e)}
                          />
                          {/* {users && (
                          <div>
                            <h2>
                              {users.user_first_name} {users.user_last_name}
                            </h2>
                            <img
                              src={users.user_photo}
                              alt="Instructor Photo"
                            />
                            <button>Save</button>
                          </div>
                        )} */}
                        </div>
                      </div>
                      {/* what will you learn */}
                      <div className="pad-input">
                        <h1 className="text-format">What Will You Learn</h1>
                        <Input
                          id="outlined-basic"
                          placeholder="Tag Skill"
                          defaultValue={loadedData?.pred_item_learning}
                          {...register('item_learning')}
                          variant="outlined"
                          className="w-full"
                          size="md"
                        />
                      </div>
                      {/* description */}
                      <div className="pad-input">
                        <div className="pad-input">
                          <h1 className="text-format">Description</h1>
                          <Input
                            id="outlined-basic"
                            placeholder="Description"
                            defaultValue={loadedData?.pred_description}
                            {...register('description')}
                            variant="outlined"
                            className="w-full"
                            size="md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="lg:ml-20 pb-10 lg:pt-4">
                <div className="container">
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/2">
                      <div className="pad-input">
                        <h1 className="text-format">Curriculum Register No</h1>
                        <Input
                          id="outlined-basic"
                          // value={get_currNum}
                          // placeholder="Headline"
                          defaultValue={loadedData?.prog_curr_regis}
                          {...register('curr_number')}
                          variant="outlined"
                          className="w-full"
                          size="md"
                        />
                      </div>
                      <div className="w-full pl-[33px] justify-center lg:pl-0">
                        <div className="pb-10">
                          <Image
                            //   src={selectedImage || codexlogo}
                            defaultValue={`http://localhost:7300/image/${loadedData?.sedm_filelink}`}
                            src={codexlogo}
                            alt="gambar"
                            height={300}
                            width={300}
                            className="pb-6"
                          ></Image>

                          <div className="flex items-center">
                            <button
                              className="px-2 py-[1.5px] w-24 text-center border border-black bg-gray-400 bg-opacity-20 mr-5 hover:bg-gray-300"
                              // onClick={handleRemoveImage}
                              type="button"
                            >
                              Remove
                            </button>
                            <input
                              type="file"
                              // enctype="multipart/form-data"
                              // accept="image/*"
                              {...register('image')}
                              // onChange={handleImageChange}
                              // ref={fileInputRef}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="flex-row space-x-4 mt-4 text-left">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Save
              </button>
              <button
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
          <section className="my-8">
            <div>
              <h1 className="text-format text-left">
                Materi (Add Section & Sub Section Materi)
              </h1>
              <div className="text-right">
                <IconButton onClick={() => setShowModal(true)}>
                  <AiOutlinePlus />
                </IconButton>
              </div>
            </div>
            {showModal && (
              <ModalSection
                setShowModal={setShowModal}
                handleNavbarTitle={handleNavbarTitle}
                handleAddSection={handleAddSection}
              ></ModalSection>
            )}
            {loadedDatas?.map((item: any, index: any) => (
              <Accordion
                key={item.sect_prog_entity_id}
                open={open === index}
                className="text-right"
                icon={
                  <>
                    <Icon id={1} open={open} />
                  </>
                }
              >
                <AccordionHeader onClick={() => handleOpen(index)}>
                  <div>{item.sect_title}</div>
                  <div className="absolute top-4 right-20 text-lg">
                    {item.sect_total_minute >= 60
                      ? `${Math.floor(item.sect_total_minute / 60)} Jam`
                      : `${item.sect_total_minute} Minutes`}
                  </div>
                </AccordionHeader>
                <div className="absolute top-5 right-10 text-lg cursor-pointer">
                  <AiOutlinePlus
                    onClick={() => {
                      handleOpen(null);
                      setShowModals(true);
                    }}
                  />
                </div>

                {item.sectionDetail.map((detailItem: any) => (
                  <AccordionBody
                  // key={index}
                  // onClick={() => handleOpens(detailItem)}
                  >
                    <Card className="bg-gray-100  shadow-none text-start flex justify-between flex-row">
                      <button
                        onClick={() => handleOpens(detailItem)}
                        className="text-blue-800 underline cursor-pointer"
                      >
                        {detailItem.secd_title}
                      </button>
                      <div>{detailItem.secd_minute}</div>
                    </Card>
                    <Dialog size="xl" open={opens} handler={handleOpens}>
                      <DialogHeader>{detailItem.secd_title}</DialogHeader>
                      <DialogBody>
                        {selectedFile?.sedm_filetype === 'image' && (
                          // {selectedFile?.sedm_filelink}
                          <img
                            src={`http://localhost:7300/images/curriculum-images/${selectedFile?.sedm_filelink}`}
                            // src="http://localhost:7300/image/Lyx6jYltNKNEaSG9ehYuJg==_signature_c8pes0jimgc75c4dvk.png"
                            alt={selectedFile?.filename}
                            className="w-64 h-64"
                          />
                        )}
                        {selectedFile?.sedm_filetype === 'text' && (
                          <Viewer
                            fileUrl={`http://localhost:7300/files/curriculum-media/${selectedFile?.sedm_filelink}`}
                            // alt={detailItem.filename}
                            // className="w-64 h-64"
                          />
                        )}
                      </DialogBody>
                      {/* <Document></Document> */}
                    </Dialog>
                  </AccordionBody>
                ))}
              </Accordion>
            ))}
            {showModals && (
              <ModalSectionDetail
                setShowModals={setShowModals}
                data={data}
              ></ModalSectionDetail>
            )}
          </section>
        </div>
      </ContentLink>
    );
  }
};

export default EditCurr;
