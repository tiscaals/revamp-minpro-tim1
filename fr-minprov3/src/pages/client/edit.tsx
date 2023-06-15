import React, { useEffect, useRef, useState } from "react";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Image from "next/image";

import { useForm } from "react-hook-form";
import Content1 from "../shared/content1";
import { useRouter } from "next/router";

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

const EditClient = () => {
  type FormValues = {
    clit_name: string;
    addr_line1: string;
    addr_line2: string;
    indu_type: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

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
  const { id, clit_name, addr_line1, addr_line2, indu_type }: any =
    router.query;

  return (
    <Content1 title="edit client" path="/client" button="Back">
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
                      <h1 className="text-format">Client Name</h1>
                      <TextField
                        id="outlined-basic"
                        defaultValue={clit_name}
                        placeholder="Client Name"
                        {...register("clit_name")}
                        variant="outlined"
                        className="w-full"
                        size="small"
                      />
                    </div>

                    {/* Primary Skill */}
                    <div className="pad-input">
                      <h1 className="text-format">Address Line 1</h1>
                      <TextField
                        id="outlined-basic"
                        placeholder="Address Line 1"
                        defaultValue={addr_line1}
                        {...register("addr_line1")}
                        variant="outlined"
                        className="w-full"
                        size="small"
                      />
                    </div>
                    {/* Secondary Skill */}
                    <div className="pad-input">
                      <h1 className="text-format">Address Line 2</h1>
                      <TextField
                        id="outlined-basic"
                        placeholder="Address Line 2"
                        defaultValue={addr_line2}
                        {...register("addr_line2")}
                        variant="outlined"
                        className="w-full"
                        size="small"
                      />
                    </div>

                    {/* Industri Type & Specification Role */}
                    <div className="pad-input ">
                      <div>
                        <h1 className="text-format">Industry Type</h1>
                        <TextField
                          id="outlined"
                          select
                          className="w-full"
                          defaultValue={indu_type}
                          {...register("indu_type")}
                          size="small"
                        >
                          {industry_type.map((option) => (
                            <MenuItem key={option.id} value={option.label}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Input Form End*/}
          </div>

          <section>
            <div className="flex flex-wrap">
              <div className="w-full mt-24">
                <div className="bg-white h-[60px]  border-t-2">
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

export default EditClient;
