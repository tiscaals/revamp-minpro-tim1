import Content1 from "@/pages/shared/content1";
import { Autocomplete, Button, FormControl, Grid, InputLabel, Menu, MenuItem, Select, SelectChangeEvent, TextField, duration } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import logo from '../../../../../public/logo3.jpg';
import Image from "next/image";
import Materi from "../materi";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getEmployee, reqCreateCurriculum, reqGetCurrNum, reqGetCurriclum, reqGetIdCurriculum, reqUpdateCurriculum } from '../../../redux/curriculumSchema/action/actionReducer';
import { reqGetMaster } from "@/pages/redux/masterScehma/action/actionReducer";
import { Select as SelectAntd } from 'antd'

interface userEmployee {
  userEmployee: userEmployeeDetail[],
  refresh?: boolean
}

interface userEmployeeDetail {
  emp_entity_id?: number
  user_name: string
  user_photo: string
}
interface FormValues{
    prog_entity_id: number,
    headline: string,
    title: string
    prog_type: string,
    // prog_rating : number,
    learning_type: string,
    total_trainee: number,
    image: any,
    price: number,
    language: string,
    duration: number,
    duration_type: string,
    tag_skill: string,
    // prog_city_entity_id: number,
    category: number,
    create_by: number,
    status: string,
    type_payment: string,
    batch_total: number,
    item_learning: string,
    // pred_item_include: string,
    // pred_requirement: string,
    description: string,
    min_score: number,
    // pred_target_level: string
    curr_number: string
}

const Edit = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
  
    let { curriculum } = useSelector((state: any) => state.curriculumReducer);
    let { userEmployee, refresh: blok }: userEmployee = useSelector((state: any) => state.curriculumReducer)
    let { master, refresh } = useSelector((state: any) => state.masterReducer)

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedPhoto, setSelectedPhoto] = useState(logo.src);
    const [curriculumSelected, setcurriculumSelected] = useState<any>(null);
    useEffect(() => {
        const nameImage = userEmployee?.find((item) => item.emp_entity_id === (id));
        setSelectedImage(nameImage?.user_photo ?? null);
        const curriculumSelect = curriculum?.find((item: any) => item.prog_entity_id === parseInt(id as string));
        setcurriculumSelected(curriculumSelect);
      }, [blok, id]);
  
    useEffect(() => {
     dispatch(getEmployee())
      dispatch(reqGetMaster());
      dispatch(reqGetIdCurriculum(id));
    }, [blok, id]);
  
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<FormValues>();
  
    const handlePhotoSelection = (event: any) => {
      const fileList = event.target.files;
      const reader = new FileReader();
  
      reader.onload = function (e: any) {
        setSelectedPhoto(e.target.result);
      };
  
      if (fileList && fileList.length > 0) {
        reader.readAsDataURL(fileList[0]);
      }
    };
  
    const handleRemoveImage = () => {
      setSelectedPhoto(logo.src);
    };
  
    const handleRegister = async (data: FormValues) => {
      const formData = new FormData();
      formData.append('prog_entity_id', String(data.prog_entity_id));
      formData.append('prog_headline', data.headline);
      formData.append('prog_title', data.title);
      formData.append('prog_learning_type', data.learning_type);
      formData.append('prog_total_trainee', String(data.total_trainee));
      formData.append('image', data.image[0]);
      let type = data.image[0]?.type;
      let imageType = type?.split("/")[1];
      formData.append("image_type", imageType);
      formData.append("image_size", data.image[0]?.size);
      formData.append('prog_price', String(data.price));
      formData.append('prog_language', data.language);
      formData.append('prog_duration', String(data.duration));
      formData.append('prog_duration_type', data.duration_type);
      formData.append('prog_tag_skill', data.tag_skill);
      formData.append('prog_cate_id', String(data.category));
      formData.append('payment_type', String(data.type_payment));
      formData.append('total_batch', String(data.batch_total));
      formData.append('prog_min_score', String(data.min_score));
      formData.append('item_learning', data.item_learning);
      formData.append('description', data.description);
      formData.append('curr_number', data.curr_number);
      formData.append('prog_status', data.status ? "publish" : "draft");
      formData.append('prog_create_by', String(data.create_by))
      // String(data.create_by));
    //   formData.append('item_include', item_include);
    //   formData.append('requirement', requirement);
    //   formData.append('target_level', target_level);
      formData.append('prog_type', data.prog_type);
      dispatch(reqUpdateCurriculum(formData));
    };

    if (curriculumSelected) {
        return (
            <Content1 title="UPDATE CURICULUM" fungsi1={() => router.back()} namafungsi1="BACK">
                <div>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className="lg:grid lg:grid-cols-2">
                            <section className="pt-4 pb-10">
                                <div className="container">
                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-2/2">
                                            <div>
                                                <input
                                                    hidden
                                                    defaultValue={curriculumSelected?.prog_entity_id}
                                                    {...register('prog_entity_id')}
                                                ></input>
                                            </div>
                                            {/* headline */}
                                            <div className="pad-input">
                                                <h1 className="text-format">Headline</h1>
                                                <TextField
                                                    id="outlined-basic"
                                                    placeholder="Headline"
                                                    defaultValue={curriculumSelected?.prog_headline}
                                                    {...register('headline')}
                                                    variant="outlined"
                                                    className="w-full"
                                                // size="md"
                                                />
                                            </div>
                                            {/* title */}
                                            <div className="pad-input">
                                                <h1 className="text-format">Title</h1>
                                                <TextField
                                                    id="outlined-basic"
                                                    placeholder="Title"
                                                    defaultValue={curriculumSelected?.prog_title}
                                                    {...register('title')}
                                                    variant="outlined"
                                                    className="w-full"
                                                // size="md"
                                                />
                                            </div>
                                            {/* payment type & learning type */}
                                            <div className="grid grid-cols-2 gap-6 my-4">
                                                <div>
                                                    <TextField
                                                        className="text-format w-full"
                                                        select
                                                        label="Payment Type"
                                                        defaultValue={curriculumSelected?.payment_type}
                                                        {...register("type_payment")}
                                                    // className="w-full"
                                                    >
                                                        {/* <Select onChange={(e: any) => setIsSelect(e)}> */}
                                                        {/* <Select className="w-full" onChange={(e: any) => setIsSelect(e)}> */}
                                                        <MenuItem value="regular">regular</MenuItem>
                                                        <MenuItem value="pay">pay</MenuItem>
                                                        {/* </Select> */}
                                                    </TextField>
                                                </div>
                                                <div>
                                                    <TextField className="text-format w-full"
                                                        select
                                                        label="Learning Type"
                                                        defaultValue={curriculumSelected?.prog_learning_type}
                                                        {...register("learning_type")}>
                                                        {/* <Select onChange={(e: any) => setIsSelectLearning(e)}> */}
                                                        {/* <Select className="w-full" onChange={(e: any) => setIsSelectLearning(e)}> */}
                                                        <MenuItem value="online">online</MenuItem>
                                                        <MenuItem value="offline">offline</MenuItem>
                                                        {/* </Select> */}
                                                    </TextField>
                                                </div>
                                            </div>
                                            {/* category & language */}
                                            <div className="pad-input grid grid-cols-2 gap-4">
                                                <div>
                                                    <TextField className="text-format w-full"
                                                        select
                                                        defaultValue={curriculumSelected?.prog_language}
                                                        label="Language"
                                                        {...register("language")}>
                                                        {/* <Select onChange={(e: any) => setIsSelectLanguage(e)}> */}
                                                        {/* <Select className="w-full" onChange={(e: any) => setIsSelectLanguage(e)}> */}
                                                        <MenuItem value="english">english</MenuItem>
                                                        <MenuItem value="bahasa">bahasa</MenuItem>
                                                        {/* </Select> */}
                                                    </TextField>
                                                </div>
                                                <div>
                                                    <TextField className="text-format w-full"
                                                        select
                                                        label="Category"
                                                        defaultValue={curriculumSelected?.prog_cate_id}
                                                        {...register("category")}>
                                                        {/* <Select onChange={(e: any) => setIsSelectCategory(e)}> */}
                                                        {(master || []).map((option: any, index: any) => (
                                                            //   <Select className="w-full">
                                                            <MenuItem
                                                                key={option.cate_id}
                                                                value={option.cate_id}
                                                            >
                                                                {option.cate_name}
                                                            </MenuItem>
                                                        )
                                                        )}
                                                    </TextField>
                                                    {/* </Select> */}
                                                </div>
                                            </div>
                                            {/* duration in month */}
                                            <div className="pad-input grid grid-cols-1 gap-4 w-full">
                                                <h1 className="text-format">Duration in Month</h1>
                                                <div className="pad-input grid grid-cols-3 gap-4 w-full">
                                                    <div className="my-4 flex items-center gap-4 w-72">
                                                        <TextField
                                                            id="outlined-basic"
                                                            type="number"
                                                            defaultValue={curriculumSelected?.prog_duration}
                                                            // placeholder="Duration"
                                                            {...register('duration')}
                                                            // size="md"
                                                            className="w-28 text-sm py-1 px-2"
                                                        />
                                                        <TextField
                                                            className="w-full"
                                                            select
                                                            defaultValue={curriculumSelected?.prog_duration_type}
                                                            {...register("duration_type")}
                                                        // placeholder="Duration Type"
                                                        // onChange={(e: any) => setIsSelectDuration(e)}
                                                        >
                                                            <MenuItem value="days">days</MenuItem>
                                                            <MenuItem value="week">week</MenuItem>
                                                            <MenuItem value="month">month</MenuItem>
                                                        </TextField>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* total batch & total trainee */}
                                            <div className="pad-input grid grid-cols-2 gap-4">
                                                <div>
                                                    <h1 className="text-format">Total Trainee</h1>
                                                    <TextField
                                                        id="outlined-basic"
                                                        type="number"
                                                        placeholder="Total Trainee"
                                                        defaultValue={curriculumSelected?.prog_total_trainee}
                                                        {...register('total_trainee')}
                                                        //   size="md"
                                                        className="w-full text-sm py-1 px-2"
                                                    />
                                                </div>
                                                <div>
                                                    <h1 className="text-format">Total Batchs</h1>
                                                    <TextField
                                                        id="outlined-basic"
                                                        type="number"
                                                        placeholder="Total Batchs"
                                                        defaultValue={curriculumSelected?.total_batch}
                                                        {...register('batch_total')}
                                                        //   size="md"
                                                        className="w-full text-sm py-1 px-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* price */}
                                            <div className="pad-input grid grid-cols-1 gap-4">
                                                <div>
                                                    <h1 className="text-format">Price</h1>
                                                    <TextField
                                                        id="outlined-basic"
                                                        placeholder="Price"
                                                        defaultValue={curriculumSelected?.prog_price}
                                                        {...register('price')}
                                                        variant="outlined"
                                                        className="w-full"
                                                    //   size="md"
                                                    />
                                                </div>
                                            </div>
                                            {/* tag skill */}
                                            <div className="pad-input my-4">
                                                {/* <h1 className="text-format">Tag Skill</h1> */}
                                                <TextField
                                                    id="outlined-basic"
                                                    placeholder="Tag Skill"
                                                    defaultValue={curriculumSelected?.prog_tag_skill}
                                                    {...register('tag_skill')}
                                                    variant="outlined"
                                                    className="w-full"
                                                // size="md"
                                                />
                                            </div>
                                            <div className="pad-input my-4">
                                                {/* <h1 className="text-format">Tag Skill</h1> */}
                                                <TextField
                                                    className="text-format w-full"
                                                    select
                                                    label="Type"
                                                    defaultValue={curriculumSelected?.prog_type}
                                                    {...register("prog_type")}
                                                >
                                                    <MenuItem value="bootcamp">Bootcamp</MenuItem>
                                                    <MenuItem value="course">Course</MenuItem>
                                                </TextField>
                                            </div>
                                            <div className="pad-input grid grid-cols-2 gap-4">
                                                <div>
                                                    <h1 className="text-format">Min Scoring</h1>
                                                    <TextField
                                                        id="outlined-basic"
                                                        type="number"
                                                        placeholder="Min Scoring"
                                                        defaultValue={curriculumSelected?.prog_min_score}
                                                        {...register('min_score')}
                                                        //   size="md"
                                                        className="w-full text-sm py-1 px-2"
                                                    />
                                                </div>
                                                <div>
                                                    <h1 className="text-format">Status</h1>
                                                    <TextField
                                                        id="outlined-basic"
                                                        select
                                                        placeholder="Status"
                                                        defaultValue={curriculumSelected?.prog_status}
                                                        {...register('status')}
                                                        className="w-full text-sm py-1 px-2"
                                                    //   size="md"
                                                    >
                                                        <MenuItem value="draft">draft</MenuItem>
                                                        <MenuItem value="publish">publish</MenuItem>
                                                    </TextField>
                                                </div>
                                            </div>
                                            {/* instructor */}
                                            <div className="pb-2 lg:pb-0 lg:pl-4">
                                                <h1 className="text-format">Instructor</h1>
                                                <SelectAntd
                                                    showSearch
                                                    placeholder="Instructor"
                                                    optionFilterProp="children"
                                                    defaultValue={curriculumSelected?.user_name}
                                                    options={userEmployee?.map((item) => ({
                                                        value: item.emp_entity_id,
                                                        label: item.user_name,
                                                    }))}
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    style={{ width: '200px' }}
                                                    onChange={(value) => {
                                                        // setSelectedId(value);
                                                        setValue('create_by', value); // Menggunakan setValue untuk mengatur nilai create_by
                                                    }}
                                                />
                                                <input
                                                    type="hidden"
                                                    {...register('create_by')} // Menggunakan register untuk menghubungkan create_by dengan formulir
                                                />
                                                <Image src={process.env.imageUser + `/${selectedImage}`} width={100} height={100} quality={100} alt="image" />

                                            </div>
                                            {/* what will you learn */}
                                            <div className="pad-input">
                                                <h1 className="text-format">What Will You Learn</h1>
                                                <TextField
                                                    id="outlined-basic"
                                                    placeholder="Tag Skill"
                                                    defaultValue={curriculumSelected?.pred_item_learning}
                                                    {...register('item_learning')}
                                                    variant="outlined"
                                                    className="w-full"
                                                // size="md"
                                                />
                                            </div>
                                            {/* description */}
                                            <div className="pad-input">
                                                <div className="pad-input">
                                                    <h1 className="text-format">Description</h1>
                                                    <TextField
                                                        id="outlined-basic"
                                                        placeholder="Description"
                                                        defaultValue={curriculumSelected?.pred_description}
                                                        {...register('description')}
                                                        variant="outlined"
                                                        className="w-full"
                                                    //   size="md"
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
                                                <TextField
                                                    id="outlined-basic"
                                                    // value={currnum}
                                                    // placeholder="Headline"
                                                    defaultValue={curriculumSelected?.prog_regis_id}
                                                    {...register('curr_number')}
                                                    variant="outlined"
                                                    className="w-full"
                                                // size="md"
                                                />
                                            </div>
                                            <div className="w-full pl-[33px] justify-center lg:pl-0">
                                                <div className="pb-10">
                                                    <img
                                                        src={selectedPhoto}
                                                        //   src={logo}
                                                        alt="gambar"
                                                        height={300}
                                                        width={300}
                                                        className="pb-6"
                                                    ></img>

                                                    <div className="flex items-center">
                                                        <button
                                                            className="px-2 py-[1.5px] w-24 text-center border border-black bg-gray-400 bg-opacity-20 mr-5 hover:bg-gray-300"
                                                            onClick={handleRemoveImage}
                                                            type="button"
                                                        >
                                                            Remove
                                                        </button>
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            defaultValue={curriculumSelected?.image}
                                                            {...register('image')}
                                                            onChange={handlePhotoSelection}
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
                        <section>
                            <div className="flex-row space-x-4 mt-4 text-left">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </section>


                    </form>
                </div>
                {/* {materi ? <Materi /> : ''} */}
            </Content1>
        );
        
    }
};

export default Edit