import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCurrReq,
  getCurrnumber,
  viewSection,
  viewSectionDetail,
} from '../redux/curriculum-schema/action/actionReducer';
import ContentLink from '../contentlink';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  IconButton,
  Input,
  Option,
  Select,
} from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import codexlogo from '../../images/codexlogo.png';
import { getAllCategory } from '../redux/master-schema/action/actionReducer';
import { AiOutlinePlus } from 'react-icons/ai';
import { getUsers } from '../redux/users-schema/action/actionReducer';
import ModalSection from '../components/showModalSection';
import ModalSectionDetail from '../components/showModalSectDetail';

const NewCurr = () => {
  let { users } = useSelector((state: any) => state.UsersReducers);
  // console.log('users: ', users);

  let { get_currNum, refresh } = useSelector(
    (state: any) => state.curriculumReducers
  );
  // console.log('curr', get_currNum);

  let { category } = useSelector((state: any) => state.CategoryReducers);
  // console.log('category', category);

  let { section, refreshSect } = useSelector(
    (state: any) => state.SectionReducers
  );
  // console.log('section: ', section);

  let { sectionDetail, refreshSectDetail } = useSelector(
    (state: any) => state.SectionDetailReducers
  );
  // console.log('sectionDetail: ', sectionDetail);

  const dispatch = useDispatch();
  type FormValues = {
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

  useEffect(() => {
    dispatch(getCurrnumber());
    dispatch(getAllCategory());
    dispatch(getUsers());
    dispatch(viewSection());
    dispatch(viewSectionDetail());
    // dispatch()
    // setValue("")
    // setTimeout(() => {
    //   dispatch(getAllCurrReq());
    // }, 1000);
  }, [refresh, refreshSect, refreshSectDetail]);

  const [selectedImage, setSelectedImage]: any = useState(null);
  const [isImageSelected, setIsImageSelected]: any = useState(false);
  const [status, setStatus] = useState('');
  // console.log('status :', status);

  const handleStatusChange = (e: any) => {
    setStatus(e);
  };

  const fileInputRef: any = useRef(null);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e: any) {
      setSelectedImage(e.target.result);
    };

    reader.readAsDataURL(file);
    setSelectedImage(file);
    setIsImageSelected(true);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setIsImageSelected(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [isSelect, setIsSelect] = useState('');
  const [isSelectLearning, setIsSelectLearning] = useState('');
  const [isSelectLanguage, setIsSelectLanguage] = useState('');
  const [isSelectDuration, setIsSelectDuration] = useState('');
  const [IsSelectCategory, setIsSelectCategory] = useState('');
  const [IsSelectType, setIsSelectType] = useState('');

  // console.log('learning type:', isSelectLearning);
  // console.log('language type:', isSelectLanguage);
  // console.log('duration type:', isSelectDuration);
  // console.log('category', IsSelectCategory);

  // console.log('payment type:', isSelect);
  const handleRegistrationProgram = async (data: any) => {
    // console.log(data);
    const formData = new FormData();
    formData.append('headline', data.headline);
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('image', data.image[0]);
    formData.append('type', IsSelectType);
    formData.append('payment_type', isSelect);
    formData.append('learning_type', isSelectLearning);
    formData.append('cate_id', IsSelectCategory);
    formData.append('duration', data.duration);
    formData.append('duration_type', isSelectDuration);
    formData.append('language', isSelectLanguage);
    formData.append('total_trainee', data.total_trainee);
    formData.append('total_batch', data.total_batch);
    formData.append('prog_score', data.score);
    formData.append('status', data.status ? 'publish' : 'draft');
    formData.append('prog_curr_regis', data.curr_number);
    formData.append('tag_skill', data.tag_skill);
    formData.append('item_learning', data.item_learning);
    formData.append('description', data.description);

    dispatch(addCurrReq(formData));
    // console.log('form data : ', ...formData);
    // console.log(selectedImage);
  };

  const [open, setOpen] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [sectionTitle, setSectionTitle] = useState('');
  const [navbarTitles, setNavbarTitles] = useState<string[]>([]);
  const [data, setData] = useState('');

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
  const registOptions = {
    headline: { required: 'Headline is required' },
    title: { required: 'Title is required' },
    price: { required: 'Price is required' },
    image: { required: 'Image is required' },
    payment_type: { required: 'Payment type is required' },
    learning_type: { required: 'Learning type is required' },
    cate_id: { required: 'cate_id is required' },
    duration: { required: 'duration is required' },
    duration_type: { required: 'duration_type is required' },
    language: { required: 'language is required' },
    tag_skill: { required: 'tag_skill is required' },
    score: { required: 'score is required' },
    item_learning: { required: 'what will you learn is required' },
    description: { required: 'description is required' },
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

  return (
    <ContentLink title="Create Curriculum" isilink="/curriculum" button="Back">
      <div>
        <form onSubmit={handleSubmit(handleRegistrationProgram)}>
          <div className="lg:grid lg:grid-cols-2">
            <section className="pt-4 pb-10">
              <div className="container">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-2/2">
                    {/* headline */}
                    <div className="pad-input my-4">
                      <h1 className="text-format">Headline</h1>
                      <Input
                        id="outlined-basic"
                        placeholder="Headline"
                        {...register('headline', registOptions.headline)}
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
                        {...register('title', registOptions.title)}
                        variant="outlined"
                        className="w-full"
                        size="md"
                      />
                    </div>
                    {/* payment type & learning type */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h1 className="text-format">Payment Type</h1>
                        <Select onChange={(e: any) => setIsSelect(e)}>
                          <Option value="regular">regular</Option>
                          <Option value="pay">pay</Option>
                        </Select>
                      </div>
                      <div>
                        <h1 className="text-format">Learning Type</h1>
                        <Select onChange={(e: any) => setIsSelectLearning(e)}>
                          <Option value="online">online</Option>
                          <Option value="offline">offline</Option>
                        </Select>
                      </div>
                    </div>
                    {/* category & language */}
                    <div className="pad-input grid grid-cols-2 gap-4">
                      <div>
                        <h1 className="text-format">Language</h1>
                        <Select onChange={(e: any) => setIsSelectLanguage(e)}>
                          <Option value="english">english</Option>
                          <Option value="bahasa">bahasa</Option>
                        </Select>
                      </div>
                      <div>
                        <h1 className="text-format">Category</h1>
                        <Select onChange={(e: any) => setIsSelectCategory(e)}>
                          {category.map((option: any) => (
                            <Option key={option.cate_id} value={option.cate_id}>
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
                          value={status}
                          onChange={handleStatusChange}
                          placeholder="Status"
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
                          {...register('price', registOptions.price)}
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
                        {...register('tag_skill', registOptions.tag_skill)}
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
                        {...register(
                          'item_learning',
                          registOptions.item_learning
                        )}
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
                          {...register(
                            'description',
                            registOptions.description
                          )}
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
                        value={get_currNum}
                        // placeholder="Headline"
                        {...register('curr_number')}
                        variant="outlined"
                        className="w-full"
                        size="md"
                      />
                    </div>
                    <div className="w-full pl-[33px] justify-center lg:pl-0">
                      <div className="pb-10">
                        <Image
                          src={selectedImage || codexlogo}
                          // src={codexlogo}
                          alt="gambar"
                          height={300}
                          width={300}
                          className="pb-6"
                        ></Image>

                        <div className="flex items-center">
                          <button
                            className="px-2 py-[1.5px] w-24 text-center border border-black bg-gray-400 bg-opacity-20 mr-5 hover:bg-gray-300"
                            onClick={handleRemoveImage}
                            type="button"
                          >
                            Remove
                          </button>
                          <input
                            type="file"
                            // enctype="multipart/form-data"
                            // accept="image/*"
                            {...register('image')}
                            onChange={handleImageChange}
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
        {/* section & sub section */}
        <div className="lg:grid lg:grid-cols-2">
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
            {section.map((item: any, index: any) => (
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
                <AccordionHeader
                  onClick={() => handleOpen(index)}
                  // className=" bg-red-500"
                >
                  <div>{item.sect_title}</div>
                </AccordionHeader>
                <div className="absolute top-5 right-10 text-lg cursor-pointer">
                  <AiOutlinePlus
                    onClick={() => {
                      handleOpen(null);
                      setShowModals(true);
                      setData(item);
                    }}
                  />
                </div>
                <AccordionBody>
                {sectionDetail.map((detailItem: any) => {
                  if (detailItem.secd_sect_id === item.sect_id) {
                    return(
                      <div key={detailItem.secd_id}>
                        <div>{detailItem.secd_title}</div>
                      </div>
                    )

                    }
                  })}
                  </AccordionBody>
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
        {/* <div className="flex-row space-x-4 mt-4 text-left">
          <button
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
        </div> */}
      </div>
    </ContentLink>
  );
};

export default NewCurr;
