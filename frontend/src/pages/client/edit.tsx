import React, { useEffect, useRef, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import ContentLink from "../contentlink";
import { useDispatch, useSelector } from "react-redux";
import { doRequestGetCity, doRequestGetIndustry } from "../redux/master-schema/action/actionReducer";
import { doRequestGetClientById, doRequestGetEmprange, doRequestUpdateClient } from "../redux/jobhire-schema/action/actionReducer";
import { useRouter } from "next/router";
import { Button } from "@material-tailwind/react";

const EditClient = () => {

  const dispatch = useDispatch()

  const { industry ,refreshIndu } = useSelector((state: any) => state.IndustryReducers);

  const { emp_range } = useSelector((state: any) => state.EmprangeReducers);

  const { city } = useSelector((state: any) => state.CityReducers);
  
  const { client_detail } = useSelector((state: any) => state.ClientReducers);

  const router = useRouter();
  const [loadedData,setLoadedData]:any=useState(null)

  useEffect(() => {
    dispatch({type:"RESET_STATE"});
    dispatch(doRequestGetIndustry());
    dispatch(doRequestGetEmprange());
    dispatch(doRequestGetCity());

  if(router.isReady){
    const { clit_id }: any = router.query;
    dispatch(doRequestGetClientById(clit_id))
  }
  }, [refreshIndu, router]);


  useEffect(() => {
    // console.log("CLIENT DETAIL", client_detail);
    setLoadedData(client_detail)
    // console.log("LOADED DATA",loadedData);
  }, [client_detail]);
  
  // console.log('aaaa',city)
  // console.log('emprange',emp_range)
  // console.log('aaa',industry)

  type FormValues = {
    clit_name: string;
    addr_line1: string;
    addr_line2: string;
    clit_indu_code: string;
    clit_about : string;
    clit_emra_id : number;
    addr_spatial_location : string;
    addr_postal_code : string;
    addr_city_id:number;
    clit_id:number,

  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleRegistration = async (data: any) => {
    console.log(data);
    dispatch(doRequestUpdateClient(data))
    router.push('/client')
  };

  // console.log('TESTNEW',loadedData)

  if(loadedData){

  return (
    <ContentLink title="Update Client" isilink="/client" button="Back">
      <div className="bg-white rounded-lg pt-4 mb-10">
        <form onSubmit={handleSubmit(handleRegistration)}>
          {/* Input Form Start */}
          <section>
              <div className="flex flex-wrap">
                <div className="lg:w-1/2 mx-auto">
                  <div>
                    <input hidden {...register("clit_id")} defaultValue={loadedData.clit_id}></input>
                  </div>
                  {/* Client Name */}
                  <div className="my-4">
                    <h1 className="my-2 font-semibold">Client Name</h1>
                    <TextField
                      id="outlined-basic"
                      defaultValue={loadedData.clit_name}
                      {...register("clit_name")}
                      variant="outlined"
                      className="w-full"
                      size="small"
                    />
                  </div>

                  {/* Address 1 */}
                  <div className="my-4">
                    <h1 className="my-2 font-semibold">Address Line 1</h1>
                    <TextField
                      id="outlined-basic"
                      placeholder="Address Line 1"
                      defaultValue={loadedData.addr_line1}
                      {...register("addr_line1")}
                      variant="outlined"
                      className="w-full"
                      size="small"
                    />
                  </div>
                  {/* Address 2 */}
                  <div className="my-4">
                    <h1 className="my-2 font-semibold">Address Line 2</h1>
                    <TextField
                      id="outlined-basic"
                      placeholder="Address Line 2"
                      defaultValue={loadedData.addr_line2}
                      {...register("addr_line2")}
                      variant="outlined"
                      className="w-full"
                      size="small"
                    />
                  </div>

                  {/* Spatial Location */}
                  <div className="my-4">
                    <h1 className="my-2 font-semibold">Spatial Location</h1>
                    <TextField
                      id="outlined-basic"
                      placeholder="Spatial Location"
                      defaultValue={loadedData.addr_spatial_location}
                      {...register("addr_spatial_location")}
                      variant="outlined"
                      className="w-full"
                      size="small"
                    />
                  </div>

                  {/* City */}
                  <div className="my-4">
                      <h1 className="my-2 font-semibold">City</h1>
                      <TextField
                        id="outlined"
                        select
                        label='Choose City'
                        className="w-full"
                        defaultValue={loadedData.city_id}
                      
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
                  <div className="my-4">
                    <h1 className="my-2 font-semibold">Postal Code</h1>
                    <TextField
                      id="outlined-basic"
                      type="number"
                      placeholder="Postal Code"
                      defaultValue={loadedData.addr_postal_code}
                      {...register("addr_postal_code")}
                      variant="outlined"
                      className="w-full"
                      size="small"
                    />
                  </div>
                  

                  {/* Industri Type  */}
                  <div className="my-4">
                      <h1 className="my-2 font-semibold">Industry Type</h1>
                      <TextField
                        id="outlined"
                        select
                        label='Choose Type'
                        className="w-full"
                        defaultValue={loadedData.indu_code}
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

                  <div className="my-4">
                      <h1 className="my-2 font-semibold">Employee Range</h1>
                      <TextField
                        id="outlined"
                        select
                        label='Choose Range'
                        className="w-full"
                        defaultValue={loadedData.emra_id}
                        {...register("clit_emra_id")}
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
                  <div className="my-4">
                    <h1 className="my-2 font-semibold">About</h1>
                  
                    <TextField
                      id="outlined-multiline-static"
                      multiline
                      rows={4}
                      placeholder="About"
                      defaultValue={loadedData.clit_about}
                      className="w-full"
                      {...register("clit_about")}
                    />
                  </div>
                </div>
              </div>
          </section>
          {/* Input Form End*/}

          {/* Button */}
          <section>
            <div className="flex flex-wrap">
              <div className="w-1/2 mb-10 mx-auto">
                <Button fullWidth type="submit">
                  Save
                </Button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </ContentLink>
  );
  };
}
export default EditClient;
