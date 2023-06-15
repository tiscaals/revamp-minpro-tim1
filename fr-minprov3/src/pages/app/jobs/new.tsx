import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CKEditor from "../../shared/komponen/editor";
import imgDefault from "../../../../public/imageTest/img.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Content1 from "../../shared/content1";
import { useDispatch, useSelector } from "react-redux";
import { doRequestGetClient, doRequestGetCurnumber } from "@/pages/redux/JobhireSchema/action/actionreducer";
import dayjs from "dayjs";
import { doRequestGetEducation, doRequestGetJobrole, doRequestGetWorktype } from "@/pages/redux/MasterSchema/action/actionReducer";
// import {CKEditor} from "@ckeditor/ckeditor5-react";
// import CKEditor from 'react-ckeditor-component';
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const JobCreate = () => {
  
    /*`````````` koneksi ke backend  ``````````````*/
    const dispatch = useDispatch();
  
    let { cur_number, job_post, message, status, refresh } = useSelector(
      (state: any) => state.JobPostReducers
    );
  
    let { education ,refreshEdu} = useSelector(
      (state: any) => state.EducationReducers
    );
  
    let { work_type } = useSelector(
      (state: any) => state.WorktypeReducers
    );
  
    let { job_role } = useSelector(
      (state: any) => state.JobroleReducers
    );
  
    let { client } = useSelector(
      (state: any) => state.ClientReducers
    );
  
      // console.log('client',client)
      // console.log('work',work_type)
      // console.log('jobrole',job_role)
    // console.log('Newedu',education[0]?.edu_code)
    // console.log('new',job_post)
    // console.log('new2',cur_number)
    
  
  type FormValues = {
    title: string;
    min_salary: string;
    max_salary: string;
    min_experience: string;
    max_experience: string;
    primary_skill: string;
    secondary_skill: string;
    specification_role: string;
    working_type: string;
    education: string;
    benefit: string;
    client: string;
    location: string;
    publish: boolean;
    remote: boolean;
    description: string;
    image: string;
    jopo_number: string;
    start_date: string;
    end_date: string;
    test: string;
    close_hiring:string;
  };
  
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

 
  const propsData = {
    options: client,
    getOptionLabel: (option:any) => option.clit_name,
  };
  
  /*`````````````` fungsi untuk switch publish ,remote, hiring start ````````````````*/
  
  const [isPublishChecked, setIsPublishChecked] = useState(true);
  const [isRemoteChecked, setIsRemoteChecked] = useState(true);
  const [isHiringChecked, setIsHiringChecked] = useState(true);
  

  const handlePublishToggle = () => {
    setIsPublishChecked(!isPublishChecked);
    
  };
  const handleRemoteToggle = () => {
    setIsRemoteChecked(!isRemoteChecked);
  };
  
  const handleHiringToggle = () => {
    setIsHiringChecked(isHiringChecked);
  };
  
  /*```````````` fungsi untuk switch publish ,remote, hiring end ``````````````*/
  useEffect(() => {
    dispatch(doRequestGetCurnumber());
    dispatch(doRequestGetEducation());
    dispatch(doRequestGetWorktype());
    dispatch(doRequestGetJobrole());
    dispatch(doRequestGetClient ());
    setValue('jopo_number',cur_number)
  }, [refresh]);

  /*````````````` fungsi untuk ganti foto dan hapus foto start ``````````````*/
  
  const [selectedImage, setSelectedImage]: any = useState(null);
  const [isImageSelected, setIsImageSelected]: any = useState(false);
  
  const fileInputRef: any = useRef(null);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setIsImageSelected(true);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setIsImageSelected(false);
    // fileInputRef.current.value = null;
  };
  /*```````````` fungsi untuk ganti foto dan hapus foto end ````````````*/

  /*````````````````` fungsi handle date start `````````````````````*/

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
    setEndDate(null);
    if (date) {
      const formattedDate: any = format(date.$d, "dd-MM-yyyy");
      setValue("start_date", formattedDate); // Set the value of "StartPeriod" field in the form
    }
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
    if (date) {
      const formattedDate: any = format(date.$d, "dd-MM-yyyy");
      setValue("end_date", formattedDate); // Set the value of "StartPeriod" field in the form
    }
  };

  const isEndDateDisabled = !startDate;
  const minEndDate = startDate ? dayjs(startDate).add(1, "day") : null;

  /*``````````````` fungsi handle date end`````````````````` */

  const handleRegistration = async (data: any) => {
    const formData: any = new FormData();
    formData.append("jopo_title", data.title);
    formData.append("jopo_start_date", data.start_date);
    formData.append("jopo_end_date", data.end_date);
    formData.append("jopo_min_salary", data.min_salary);
    formData.append("jopo_max_salary", data.max_salary);
    formData.append("jopo_min_experience", data.min_experience);
    formData.append("jopo_max_experience", data.max_experience);
    formData.append("jopo_primary_skill", data.primary_skill);
    formData.append("jopo_secondary_skill", data.secondary_skill);
    formData.append("jopo_joro_id", data.specification_role);
    formData.append("jopo_work_code", data.working_type);
    formData.append("jopo_edu_code", data.education);
    formData.append("jopo_benefit", data.benefit);
    formData.append("jopo_clit_id", data.client.clit_id);
    formData.append("jopo_description", data.description);
    formData.append("jopho_fileimage",data.image[0]?.name)
    formData.append("jopho_filesize",data.image[0]?.size)
    formData.append("jopho_type",data.image[0]?.type)

    formData.append("jopo_status", data.publish? "publish":"draft");
    formData.append("jopo_joty_id", data.remote? 1:0);
    formData.append("jopo_open", data.close_hiring? 1:0);
    
  
    console.log("aa", ...formData);
    console.log(data);
  };


  const registerOptions = {
    title: { required: "Title is required" },
    min_salary: { required: "Min Salary is required" },
    max_salary: { required: "Max Salary is required" },
    min_experience: { required: "Min Experience is required" },
    max_experience: { required: "Max Experience required" },
    primary_skill: { required: "Primary Skill is required" },
    secondary_skill: { required: "Secondary Skill is required" },
    specification_role: { required: "Specification Role is required" },
    education: { required: "Education is required" },
    benefit: { required: "Benefit is required" },
    client: { required: "Client is required" },
    location: { required: "Location is required" },
    start_date: { required: "Start Date is required" },
    end_date: { required: "End Date is required" },
  };

  return (
    <Content1 title="Posting Job" path="/app/jobs" button="Back">
      <div>
        <form onSubmit={handleSubmit(handleRegistration)}>
          <div className="lg:grid lg:grid-cols-2">
            {/* Input Form Start*/}
            <section className="pt-4 pb-10">
              <div className="container">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-2/2">
                    {/* Title */}
                    <div className="pad-input">
                      <h1 className="text-format">Title</h1>
                      <TextField
                        id="outlined-basic"
                        placeholder="Title"
                        {...register("title")}
                        variant="outlined"
                        className="w-full"
                        size="small"
                      />
                      {/* <p className="px-2 text-red-800">
                        {errors?.title && errors.title.message}
                      </p> */}
                    </div>
                    {/* Date */}
                    <div className="pad-input">
                      <h1 className="text-format">Periode Posting</h1>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className="grid grid-cols-2 w-full gap-4">
                          <DatePicker
                            slotProps={{
                              actionBar: {
                                actions: ["clear"],
                              },
                            }}
                            format="DD/MM/YYYY"
                            label="Mulai"
                            className="w-full"
                            onChange={handleStartDateChange}
                          />

                          <DatePicker
                            slotProps={{
                              actionBar: {
                                actions: ["clear"],
                              },
                            }}
                            format="DD/MM/YYYY"
                            label="Selesai"
                            className="w-full"
                            minDate={minEndDate}
                            disabled={isEndDateDisabled}
                            onChange={handleEndDateChange}
                          />
                        </div>
                      </LocalizationProvider>
                    </div>
                    {/* Salary & Experience */}
                    <div className="pad-input grid grid-cols-2 gap-4">
                      <div>
                        <h1 className="text-format">Min Salary</h1>
                        <TextField
                          id="outlined-basic"
                          type="number"
                          placeholder="Min Salary"
                          {...register("min_salary")}
                          variant="outlined"
                          className="w-full"
                          size="small"
                          inputProps={{
                            min: 1,
                          }}
                        />
                        {/* <p className="px-2 text-red-800">
                          {errors?.min_salary && errors.min_salary.message}
                        </p> */}
                      </div>
                      <div>
                        <h1 className="text-format">Max Salary</h1>
                        <TextField
                          id="outlined-basic"
                          type="number"
                          placeholder="Max Salary"
                          {...register("max_salary")}
                          variant="outlined"
                          className="w-full"
                          size="small"
                          inputProps={{
                            min: 1,
                          }}
                        />
                        {/* <p className="px-2 text-red-800">
                          {errors?.max_salary && errors.max_salary.message}
                        </p> */}
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="pad-input grid grid-cols-2 gap-4">
                      <div>
                        <h1 className="text-format">Min Eperience</h1>
                        <TextField
                          id="outlined-basic"
                          type="number"
                          placeholder="Min"
                          {...register("min_experience")}
                          size="small"
                          className="w-full"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            min: 1,
                          }}
                        />
                        {/* <p className="px-2 text-red-800">
                          {errors?.min_experience &&
                            errors.min_experience.message}
                        </p> */}
                      </div>
                      <div>
                        <h1 className="text-format">Max Eperience</h1>
                        <TextField
                          id="outlined-basic"
                          type="number"
                          placeholder="Max"
                          {...register("max_experience")}
                          size="small"
                          className="w-full"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            min: 1,
                          }}
                        />
                        {/* <p className="px-2 text-red-800">
                          {errors?.max_experience &&
                            errors.max_experience.message}
                        </p> */}
                      </div>
                    </div>
                    {/* Primary Skill */}
                    <div className="pad-input">
                      <h1 className="text-format">Primary Skill</h1>
                      <TextField
                        id="outlined-basic"
                        placeholder="Java, Springboot, Oracle, Pl/Sql"
                        {...register("primary_skill")}
                        variant="outlined"
                        className="w-full"
                        size="small"
                      />
                      {/* <p className="px-2 text-red-800">
                        {errors?.primary_skill && errors.primary_skill.message}
                      </p> */}
                    </div>
                    {/* Secondary Skill */}
                    <div className="pad-input">
                      <h1 className="text-format">Secondary Skill</h1>
                      <TextField
                        id="outlined-basic"
                        placeholder="SDLC,HTML/CSS,Javascript"
                        {...register("secondary_skill")}
                        variant="outlined"
                        className="w-full"
                        size="small"
                      />
                      {/* <p className="px-2 text-red-800">
                        {errors?.secondary_skill &&
                          errors.secondary_skill.message}
                      </p> */}
                    </div>

                    {/* Industri Type & Specification Role */}
                    <div className="pad-input ">
                      {/* <div>
                      <h1 className="text-format">Industry Type</h1>
                      <TextField
                        id="outlined"
                        select
                        className="w-full"
                        defaultValue={industry_type[0].label}
                        {...register("industry_type")}
                        size="small"
                      >
                        {industry_type.map((option) => (
                          <MenuItem key={option.id} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div> */}

                      <div>
                        <h1 className="text-format">Specification Role</h1>
                        <TextField
                          id="outlined"
                          select
                          label="Choose Role"
                          className="w-full"
                          {...register("specification_role")}
                          size="small"
                        >
                          {job_role.map((option:any) => (
                            <MenuItem key={option.joro_id} value={option.joro_id}>
                              {option.joro_name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>
                    {/* Working Type & Education */}
                    <div className="pad-input grid grid-cols-2 gap-4">
                      <div>
                        <h1 className="text-format">Working Type</h1>
                        <TextField
                          id="outlined"
                          select
                          label='Choose Type'
                          className="w-full"
                          {...register("working_type")}
                          size="small"
                        >
                          {work_type.map((option:any) => (
                            <MenuItem key={option.woty_code} value={option.woty_code}>
                              {option.woty_name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <div>
                        <h1 className="text-format">Education</h1>
                        <TextField
                          id="outlined"
                          select
                          label="Choose Education"
                          className="w-full"
                          {...register("education")}
                          size="small"
                          >
                          {education.map((option:any) => (
                            <MenuItem key={option.edu_code} value={option.edu_code}>
                              {option.edu_name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>

                    {/* Benefit */}
                    <div className="pad-input">
                      <h1 className="text-format">Benefit</h1>
                      <TextField
                        id="outlined-basic"
                        placeholder="THR,BPJS,Bonus"
                        {...register("benefit")}
                        variant="outlined"
                        className="w-full"
                        size="small"
                      />
                      {/* <p className="px-2 text-red-800">
                        {errors?.benefit && errors.benefit.message}
                      </p> */}
                    </div>

                    {/* Search Client */}
                    <div className="pad-input">
                      <h1 className="text-format">Client</h1>
                      <Autocomplete
                        {...propsData}
                        autoComplete
                        id="free-solo-2-demo"
                        size="small"
                        includeInputInList
                        onChange={(event: any, value: any) => {
                          register("client", { value: value });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Client"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  <SearchIcon color="action" />
                                  {params.InputProps.startAdornment}
                                </>
                              ),
                              type: "search",
                            }}
                            {...register("test", registerOptions.client)}
                          />
                        )}
                      />
                      {/* <p className="px-2 text-red-800">
                        {errors?.client && errors.client.message}
                      </p> */}
                    </div>
                    {/* Description */}
                    <div className="pad-input">
                      <h1 className="text-format">Description</h1>
                      {/* <CKEditor /> */}
                      <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        placeholder="Description"
                        className="w-full"
                        {...register("description")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Input Form End*/}

            {/* Upload Logo Start */}
            <section className="lg:ml-20 pb-10 lg:pt-4">
              <div className="container">
                <div className="flex flex-wrap ">
                  <div className="w-full lg:w-1/2">
                    <div className="pad-input">
                      <h1 className="text-format">Posting Number</h1>
                      <TextField
                        id="outlined-basic"
                        value={cur_number}
                        {...register("jopo_number")}
                        variant="outlined"
                        className="w-full bg-slate-300 opacity-80 lg:w-[18.7rem]"
                        size="small"
                      />
                    </div>
                    <div className="w-full pl-[33px] justify-center lg:pl-0">
                      <div className="pb-10">
                        <Image
                          src={selectedImage || imgDefault}
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
                            accept="image/*"
                            {...register("image")}
                            // onChange={handleImageChange}
                            // ref={fileInputRef}
                          ></input>
                        </div>
                      </div>
                      {/* Switch Publish & Remote */}
                      <div className="items-center">
                        <div className="flex">
                          <h1 className="pr-14 ">Publish</h1>
                          <label className="relative inline-flex items-center mb-4 cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              {...register("publish")}
                              checked={isPublishChecked}
                              onChange={handlePublishToggle}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className=" flex">
                          <h1 className="pr-[29px]">Remotely ?</h1>
                          <label className="relative inline-flex items-center mb-4 cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              {...register("remote")}
                              checked={isRemoteChecked }
                              onChange={handleRemoteToggle}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="hidden">
                          <h1 className="pr-14 ">Close Hiring ?</h1>
                          <label className="relative inline-flex items-center mb-4 cursor-pointer">
                            <input
                              type="checkbox"
                              
                              className="sr-only peer"
                              {...register("close_hiring")}
                              checked={isHiringChecked }
                              onChange={handleHiringToggle}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Upload Logo End */}
          </div>

          <section>
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="bg-white h-[60px] border-t-2 shadow-gray-200 shadow-inner">
                  <div className=" flex pt-3.5 justify-center lg:justify-start">
                    <button type="submit" className="button-foot">
                      Save
                    </button>
                    <button type="button" className="button-foot">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </Content1>
  );
};

export default JobCreate;
