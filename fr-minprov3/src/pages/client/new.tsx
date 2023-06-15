import React, { useEffect, useRef, useState } from "react";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Content1 from "../shared/content1";
import { useDispatch, useSelector } from "react-redux";
import { doRequestGetCity, doRequestGetIndustry } from "../redux/MasterSchema/action/actionReducer";
import { doRequestGetEmprange } from "../redux/JobhireSchema/action/actionreducer";

const NewClient = () => {

  const dispatch = useDispatch()

  let { industry ,refreshIndu } = useSelector(
    (state: any) => state.IndustryReducers
  );

  let { emp_range } = useSelector(
    (state: any) => state.EmprangeReducers
  );

  let { city } = useSelector(
    (state: any) => state.CityReducers
  );



  useEffect(() => {
    dispatch(doRequestGetIndustry());
    dispatch(doRequestGetEmprange());
    dispatch(doRequestGetCity());
  }, [refreshIndu]);
  
  // console.log('aaaa',city)
  // console.log('emprange',emp_range)
  // console.log('aaa',industry)

  type FormValues = {
    clit_name: string;
    addr_line1: string;
    addr_line2: string;
    clit_indu_code: string;
    clit_about : string;
    emra_id : number;
    addr_spatial_location : string;
    addr_postal_code : string;
    addr_city_id:string;

  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleRegistration = async (data: any) => {
    console.log(data);
  };
  return (
    <Content1 title="Tambah Client" path="/client" button="Back">
      <div>
        <form onSubmit={handleSubmit(handleRegistration)}>
          <div className="lg:grid lg:grid-cols-2">
            {/* Input Form Start*/}
            <section className="pt-4 pb-10">
              <div className="container">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-2/2">
                    {/* Client Name */}
                    <div className="pad-input">
                      <h1 className="text-format">Client Name</h1>
                      <TextField
                        id="outlined-basic"
                        placeholder="Client Name"
                        {...register("clit_name")}
                        variant="outlined"
                        className="w-full"
                        size="small"
                      />
                    </div>

                    {/* Address 1 */}
                    <div className="pad-input">
                      <h1 className="text-format">Address Line 1</h1>
                      <TextField
                        id="outlined-basic"
                        placeholder="Address Line 1"
                        {...register("addr_line1")}
                        variant="outlined"
                        className="w-full"
                        size="small"
                      />
                    </div>
                    {/* Address 2 */}
                    <div className="pad-input">
                      <h1 className="text-format">Address Line 2</h1>
                      <TextField
                        id="outlined-basic"
                        placeholder="Address Line 2"
                        {...register("addr_line2")}
                        variant="outlined"
                        className="w-full"
                        size="small"
                      />
                    </div>

                    {/* Spatial Location */}
                    <div className="pad-input">
                      <h1 className="text-format">Spatial Location</h1>
                      <TextField
                        id="outlined-basic"
                        placeholder="Spatial Location"
                        {...register("addr_spatial_location")}
                        variant="outlined"
                        className="w-full"
                        size="small"
                      />
                    </div>

                    {/* City */}
                    <div className="pad-input ">
                        <h1 className="text-format">City</h1>
                        <TextField
                          id="outlined"
                          select
                          label='Choose City'
                          className="w-full"
                        
                          {...register("addr_city_id")}
                          size="small"
                        >
                          {city.map((option:any) => (
                            <MenuItem key={option.city_id} value={option.city_id}>
                              {option.city_name}
                            </MenuItem>
                          ))}
                        </TextField>
                    </div>

                    {/* Postal Code */}
                    <div className="pad-input">
                      <h1 className="text-format">Postal Code</h1>
                      <TextField
                        id="outlined-basic"
                        type="number"
                        placeholder="Postal Code"
                        {...register("addr_postal_code")}
                        variant="outlined"
                        className="w-full"
                        size="small"
                      />
                    </div>
                    

                    {/* Industri Type  */}
                    <div className="pad-input ">
                        <h1 className="text-format">Industry Type</h1>
                        <TextField
                          id="outlined"
                          select
                          label='Choose Type'
                          className="w-full"
                        
                          {...register("clit_indu_code")}
                          size="small"
                        >
                          {industry.map((option:any) => (
                            <MenuItem key={option.indu_code} value={option.indu_code}>
                              {option.indu_name}
                            </MenuItem>
                          ))}
                        </TextField>
                    </div>

                    {/* Employee Range */}

                    <div className="pad-input ">
                        <h1 className="text-format">Employee Range</h1>
                        <TextField
                          id="outlined"
                          select
                          label='Choose Range'
                          className="w-full"
                        
                          {...register("emra_id")}
                          size="small"
                        >
                          {emp_range.map((option:any) => (
                            <MenuItem key={option.emra_id} value={option.emra_id}>
                              {option.emra_range_min} - {option.emra_range_max}
                            </MenuItem>
                          ))}
                        </TextField>
                    </div>

                    {/* About */}
                    <div className="pad-input">
                      <h1 className="text-format">About</h1>
                    
                      <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        placeholder="About"
                        className="w-full"
                        {...register("clit_about")}
                      />
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

export default NewClient;
