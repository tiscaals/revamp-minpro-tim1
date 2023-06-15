import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CKEditor from "../../shared/komponen/editor";
import imgDefault from "../../../../public/imageTest/img.png";
import Image from "next/image";
import ToggleSwitch from "../../shared/komponen/switch";
import Button from "../../shared/komponen/button";
import { useForm } from "react-hook-form";
import Content1 from "../../shared/content1";
import { useRouter } from "next/router";
// import {CKEditor} from "@ckeditor/ckeditor5-react";
// import CKEditor from 'react-ckeditor-component';
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const industry_type = [
  {
    id: 1,
    label: "Telecomunication",
  },
  {
    id: 2,
    label: "Retail",
  },
  {
    id: 3,
    label: "Bank",
  },
  {
    id: 4,
    label: "Oil & Gas",
  },
  {
    id: 5,
    label: "Ecommerce",
  },
  {
    id: 6,
    label: "Manufacture",
  },
];

const spec_role = [
  { id: 1, label: "Software Engineer" },
  { id: 2, label: "Marketing" },
  { id: 3, label: "Sales" },
];

const work_type = [
  { id: 1, label: "Full-Time" },
  { id: 2, label: "Contact" },
  { id: 3, label: "Permanent" },
  { id: 4, label: "Part-Time" },
  { id: 5, label: "Freelance" },
];

const edu_type = [
  { id: 1, label: "SMK" },
  { id: 2, label: "Diploma 3/4" },
  { id: 3, label: "S1/S2/S3" },
];

const client = [
  { id: 1, label: "Astra" },
  { id: 2, label: "Google" },
  { id: 3, label: "Amazon" },
  { id: 4, label: "Sinarmas" },
  { id: 5, label: "Code Id" },
];

const JobEdit = () => {
  type FormValues = {
    title: string;
    min_salary: string;
    max_salary: string;
    min_experience: string;
    max_experience: string;
    primary_skill: string;
    secondary_skill: string;
    industry_type: string;
    specification_role: string;
    working_type: string;
    education: string;
    benefit: string;
    client: string;
    location: string;
    publish: boolean;
    remote: boolean;
    close: boolean;
    description: string;
    image: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  /* fungsi untuk switch publish dan remote start*/
  const [isPublishChecked, setIsPublishChecked] = useState(true);
  const [isRemoteChecked, setIsRemoteChecked] = useState(true);
  const [isCloseChecked, setIsCloseChecked] = useState(false);

  const handlePublishToggle = () => {
    setIsPublishChecked(!isPublishChecked);
  };
  const handleRemoteToggle = () => {
    setIsRemoteChecked(!isRemoteChecked);
  };
  const handleCloseToggle = () => {
    setIsCloseChecked(!isCloseChecked);
  };
  /* fungsi untuk switch publish dan remote end*/

  const [StartDate, setStartDate] = useState(null);
  const [EndDate, setEndDate] = useState(null);

  /* fungsi untuk ganti foto dan hapus foto start */
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
  /* fungsi untuk ganti foto dan hapus foto end */

  //   const handleStartDateChange = (date: any) => {
  //     setStartDate(date);
  //     setEndDate(null);
  //     if (date) {
  //       const formattedDate: any = format(date.$d, "dd/MM/yyyy");
  //       //   setValue("StartPeriod", formattedDate); // Set the value of "StartPeriod" field in the form
  //     }
  //   };

  const handleRegistration = async (data: any) => {
    const formData: any = new FormData();
    // formData.append("image", selectedImage);
    // formData.append("name", data.name);
    // formData.append("description", data.description);
    // formData.append("category_id", data.category_id);
    // formData.append("price", data.price);
    // formData.append("id", data.id);
    // formData.append("image", data.image[0]);
    console.log("aa", ...formData);
    console.log(data);
  };
  const router = useRouter();
  
  const { id }: any = router.query;
  return (
    <Content1 title="Edit Posting Job" path='/app/jobs' button="Back" >
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
                          // onChange={handleStartDateChange}
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
                          // onChange={handleStartDateChange}
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
                  </div>

                  {/* Industri Type & Specification Role */}
                  <div className="pad-input grid grid-cols-2 gap-4">
                    <div>
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
                    </div>
                    <div>
                      <h1 className="text-format">Specification Role</h1>
                      <TextField
                        id="outlined"
                        select
                        className="w-full"
                        defaultValue={spec_role[0].label}
                        {...register("specification_role")}
                        size="small"
                      >
                        {spec_role.map((option) => (
                          <MenuItem key={option.id} value={option.label}>
                            {option.label}
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
                        className="w-full"
                        defaultValue={work_type[0].label}
                        {...register("working_type")}
                        size="small"
                      >
                        {work_type.map((option) => (
                          <MenuItem key={option.id} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div>
                      <h1 className="text-format">Education</h1>
                      <TextField
                        id="outlined"
                        select
                        className="w-full"
                        defaultValue={edu_type[0].label}
                        {...register("education")}
                        size="small"
                      >
                        {edu_type.map((option) => (
                          <MenuItem key={option.id} value={option.label}>
                            {option.label}
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
                  </div>
                  {/* Search Client */}
                  <div className="pad-input">
                    <h1 className="text-format">Client</h1>
                    <Autocomplete
                      freeSolo
                      id="free-solo-2-demo"
                      size="small"
                      disableClearable
                      options={client.map((option) => option.label)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Client"
                          {...register("client")}
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
                        />
                      )}
                    />
                  </div>
                  {/* Location */}
                  <div className="pad-input">
                    <h1 className="text-format">Location City</h1>
                    <TextField
                      id="outlined-basic"
                      placeholder="Location"
                      {...register("location")}
                      variant="outlined"
                      className="w-full"
                      size="small"
                    />
                  </div>
                  {/* Description */}
                  <div className="pad-input">
                    <h1 className="text-format">Description</h1>
                    <CKEditor />
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
                      disabled
                      defaultValue="JOB-20120"
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
                        <h1 className="pr-[75px]">Publish</h1>
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
                        <h1 className="pr-[49px]">Remotely ?</h1>
                        <label className="relative inline-flex items-center mb-4 cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            {...register("remote")}
                            checked={isRemoteChecked}
                            onChange={handleRemoteToggle}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className=" flex">
                        <h1 className="pr-[29px]">Close Hiring ?</h1>
                        <label className="relative inline-flex items-center mb-4 cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            {...register("close")}
                            checked={isCloseChecked}
                            onChange={handleCloseToggle}
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

export default JobEdit;
