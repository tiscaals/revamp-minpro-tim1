import { AiOutlineEnvironment, AiOutlineFieldTime, AiOutlineSchedule, AiOutlineHistory } from 'react-icons/ai'
import { useRouter } from "next/router";
import Link from 'next/link'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { doRequestGetJobPost } from "../redux/jobhire-schema/action/actionReducer";

const CardJob = ({ currentPage, itemsPerPage, ...other }: { currentPage: number; itemsPerPage: number }) => {
  const { job_post, refresh } = useSelector((state:any) => state.JobPostReducers,);
  const dispatch = useDispatch();
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = job_post?.slice(startIndex, endIndex);

  // const filtering = {
  //   "pagination":{
  //       "limit":100,
  //       "offset":0
  //   },
  //   "search":{
  //       "keyword":null,
  //       "location":null //jakarta, bogor, dll
  //   },
  //   "filter":{
  //       "job_role":null, // id nya (1,2,3,...)
  //       "newest":false, // kalo match false, kalo newest true
  //       "working_type":null, // FT, PT, CONT, FL, INTR
  //       "experience":null, // 0, 1-3, 
  //       "remotely":false, // job_type(true, false)
  //       "updated":null, // 24 Jam Terakhir, Seminggu Terakhir, Sebulan Terakhir
  //       "status":null, //publish, draft, remove
  //       "open":null // 0,1
  //   }
  // }

  const [filters, setFilters] = useState({
    keyword: null,
    location: null,
    job_role: null,
    newest: false,
    working_type: null,
    experience: null,
    remotely: false,
    updated: null,
    status: null,
    open: null,
  });

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  // Apply filters to the job_post array
  // const filteredItems = job_post?.filter((data: any) => {
  //   // Check if data matches the filter conditions
  //   if (filters.keyword && !data.jopo_title.toLowerCase().includes(filters.keyword.toLowerCase())) {
  //     return false; // Skip if keyword filter doesn't match
  //   }
  //   if (filters.location && data.city_name !== filters.location) {
  //     return false; // Skip if location filter doesn't match
  //   }
  //   if (filters.job_role && data.job_role !== filters.job_role) {
  //     return false; // Skip if job role filter doesn't match
  //   }
  //   // Add more filter conditions as per your requirements
  //   // ...

  //   return true; // Include data if it matches all the filter conditions
  // });

  useEffect(()=>{
    dispatch(doRequestGetJobPost())
    setTimeout(()=>{console.log('post',job_post); console.log("CURRENT ITEMS",currentItems);},2000)

  },[currentPage, itemsPerPage, refresh])
  
  return (
    <>
    {(currentItems || []).map((data: any) => (
      <Link href={{
        pathname: "/jobs/jobdetail",
        query: {
          id: data.jopo_entity_id,
          title: data.jopo_title,
          name: data.clit_name
        },
      }}>
        <div className="grid grid-cols-1 flex-wrap">
          <div className="hover:opacity-70 transition ease-in-out pb-1">
            <div className="w-auto p-5 bg-white border shadow-lg block ">
              <div className="flex items-center">
                {/*---- Gambar ----*/}
                <img src={`http://localhost:3003/image/${data.jopho_filename}`} alt="gambar"
                className="object-contain h-14 w-24 mr-5"/>
                <div className="">
                  {/*---- Title ----*/}
                  <h1 className="text-xl font-semibold">
                    {data.jopo_title}
                  </h1>
                  {/*---- Nama Perusahaan ----*/}
                  <h1 className="text-md font-medium">
                    {data.clit_name}
                  </h1>
                </div>
              </div>
              <div className="pt-6">
                <div className="my-2">
                  <div className="flex">
                    <AiOutlineEnvironment className="pt-1" />
                    <h3 className="text-sm">{data.city_name}</h3>
                  </div>
                  <div className="flex">
                    <AiOutlineFieldTime className="pt-1" />
                    <h3 className="text-sm">{data.jopo_min_experience}-{data.jopo_max_experience} Tahun</h3>
                  </div>
                </div>
                {/*---- Active Hiring, Tgl Dibuat ----*/}
                <div className="flex justify-between pt-2">
                  <div className="flex rounded-md text-green-500">
                    <AiOutlineSchedule className="pt-1" />
                    <h3 className="text-sm">
                      Actively Hiring
                    </h3>
                  </div>
                  <div className="flex">
                  {data.jopo_publish_date ? (
                    <>
                      {(() => {
                        const publishedDate = new Date(data.jopo_publish_date);
                        const currentDate = new Date();
                        const timeDiff: number = Math.abs(currentDate.getTime() - publishedDate.getTime());
                        const daysDiff: number = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                        const createdDaysAgo: string = `Dibuat ${daysDiff} hari lalu`;
                        return (
                          <>
                            <AiOutlineHistory className="pt-1" />
                            <h3 className="text-sm">{createdDaysAgo}</h3>
                          </>
                        );
                      })()}
                    </>
                  ) : (
                    <>
                      <AiOutlineHistory className="pt-1" />
                      <h3 className="text-sm">Dibuat 1 hari lalu</h3>
                    </>
                  )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))}
    </>
  );
};

export default CardJob;
