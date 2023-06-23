import { AiOutlineEnvironment, AiOutlineFieldTime, AiOutlineSchedule, AiOutlineHistory } from 'react-icons/ai'
import { useRouter } from "next/router";
import Link from 'next/link'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { doRequestGetJobPost } from "../redux/jobhire-schema/action/actionReducer";

function calculateSimilarityScore(a:any, b:any) {
  const matrix = [];
  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Calculate distances
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

const CardJob = ({ currentPage, itemsPerPage, data, filtering }: { currentPage: number; itemsPerPage: number, data:any, filtering?:any }) => {
  let { job_post } = useSelector((state:any) => state.JobPostReducers,);
  const dispatch = useDispatch();
  const router = useRouter()
  const {id,title,name}:any=router.query

  console.log("ID", id);

  let job_data:any;
  if (filtering) {
    console.log(job_post);
    const itemSimilarityScore = job_post.map((post: { jopo_title: any; })=>{
      const similarityScore = calculateSimilarityScore(title, post.jopo_title);
      return {
        ...post,
        similarityScore: similarityScore,
      }
    })
    // console.log("itemSimilarityScore", itemSimilarityScore);
    const filteredItems = itemSimilarityScore.filter((item: any) => item.jopo_entity_id != id);
    // console.log("filteredItems", filteredItems);
    job_data = filteredItems.sort((a: any, b: any) => a.similarityScore - b.similarityScore);
    // console.log("job_data", job_data);
  } else {
    job_data = data;
  }

  // console.log("SORTED JOBS", job_data);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = job_data?.slice(startIndex, endIndex);
  
  useEffect(()=>{
    dispatch(doRequestGetJobPost())
    setTimeout(()=>{console.log('post',job_post); console.log("CURRENT ITEMS",currentItems);},2000)

  },[currentPage, itemsPerPage])
  
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
                        const publishedDate = new Date(data.jopo_modified_date);
                        const currentDate = new Date();
                        const timeDiff: number = Math.abs(currentDate.getTime() - publishedDate.getTime());
                        const daysDiff: number = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                        const createdDaysAgo: string = `Diperbarui ${daysDiff} hari lalu`;
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
                      <h3 className="text-sm">Diperbarui 1 hari lalu</h3>
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
