import React, { useEffect, useState } from "react"
import imgDummy from "../../../public/logohitam.png"
import Image from 'next/image'
import { ShareIcon, CurrencyDollarIcon, BuildingOfficeIcon, ChevronRightIcon, ClockIcon } from '@heroicons/react/24/outline'
import CardJob from "../komponen/cardjob"
import { useRouter } from "next/router"
import Header from "../shared/header"
import { useDispatch, useSelector } from "react-redux"
import { doRequestGetEmprange, doRequestGetJobById, doRequestGetJobPost } from "../redux/jobhire-schema/action/actionReducer"
import { AiOutlineHistory } from "react-icons/ai"
import { Button, Spinner } from "@material-tailwind/react"
import { doRequestGetIndustry, doRequestGetJobrole, doRequestGetWorktype } from "../redux/master-schema/action/actionReducer"


const JobDetail = () => {
    const router = useRouter()
    const {id,title,name}:any=router.query
    const { job_detail, refresh } = useSelector((state:any) => state.JobPostReducers,);
    const { job_post, refresh: refreshJopo } = useSelector((state:any) => state.JobPostReducers,);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = job_post?.slice(startIndex, endIndex);

    const dispatch = useDispatch();

    useEffect(()=>{
        // console.log("ID", id);
        dispatch(doRequestGetJobById(id))
        // setTimeout(()=>{console.log('jopoById',job_detail)},2000)
    },[refresh,id])

    const { industry } = useSelector((state: any) => state.IndustryReducers);
    const { emp_range } = useSelector((state: any) => state.EmprangeReducers);
    const { job_role } = useSelector((state: any) => state.JobroleReducers);
    const { work_type } = useSelector((state: any) => state.WorktypeReducers);

    useEffect(()=>{
        dispatch(doRequestGetJobrole())
        dispatch(doRequestGetWorktype())
        dispatch(doRequestGetIndustry())
        dispatch(doRequestGetEmprange())
    },[job_detail])

    if(!id){
        return (
            <div className="relative flex min-h-screen flex-col justify-center items-center">
                <Spinner className="h-40 w-40" />
            </div>
        )
    }

    {/* Format Salary */}
    const formatSalary = (value:any) => {
        const formatter = new Intl.NumberFormat('id-ID');
        return formatter.format(value);
      };
      
    const formattedMinSalary = formatSalary(job_detail?.jopo_min_salary);
    const formattedMaxSalary = formatSalary(job_detail?.jopo_max_salary);

    return (
        <>
        <Header/>
        <div className="container grid lg:grid-cols-2 w-3/4 mx-auto">
            <div >
                {/* Section Nama Perusahaan Start    */}
                <section className="p-8 border-b-2">
                    <div className="container">
                        <div className="flex">
                            <img src={`http://localhost:3003/image/${job_detail?.jopho_filename}`} alt="gambar" className="float-left mr-3 object-contain w-20 pr-2 md:h-24 md:w-24 lg:h-28 lg:w-28" />
                            <div className="w-full">
                                <h1 className="text-lg font-semibold md:text-xl lg:text-2xl ">{title}</h1>
                                <h2 className="text-sm font-light lg:text-base">{name}</h2>
                                <div className="flex items-center">
                                    <CurrencyDollarIcon height="20" width="20" />
                                    <h3 className="text-sm font-normal pl-2 md:text-base lg:text-lg">IDR {formattedMinSalary} - {formattedMaxSalary}/month</h3>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-">
                                        <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z" clip-rule="evenodd" />
                                    </svg>

                                    {/* Job Role */}
                                    {job_role.map((option:any) =>
                                    job_detail?.jopo_joro_id === option.joro_id ? (
                                        <h2 key={option.joro_id} className="text-sm underline text-blue-500  font-normal pl-2 md:text-base lg:text-lg">
                                        {option.joro_name}
                                        </h2>
                                    ) : null
                                    )}
                                </div>
                                <div className="grid grid-cols-2 max-w-sm pt-2 lg:pt-4">
                                    <div className=" flex items-center">
                                        <BuildingOfficeIcon height="20" width="20" />

                                        {/* Working Type */}
                                        {work_type.map((option:any) =>
                                        job_detail?.jopo_work_code === option.woty_code ? (
                                            <h2 key={option.woty_code} className="text-xs font-light pl-2 md:text-sm lg:text-md">
                                            {option.woty_name}
                                            </h2>
                                        ) : null
                                        )}
                                    </div>
                                    <div className=" flex  items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fill-rule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                                            <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                                        </svg>
                                        <h3 className="text-xs  font-light pl-2 md:text-sm lg:text-md">{job_detail?.jopo_min_experience}-{job_detail?.jopo_max_experience} tahun</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 max-w-sm pt-2 lg:pt-4">
                                    <div className=" flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                                        </svg>
                                        <h3 className="text-xs  font-light pl-2 md:text-sm lg:text-md">{job_detail?.city_name}</h3>
                                    </div>
                                    <div className=" flex items-center">
                                        <ClockIcon height="20" width="20" />
                                        <h3 className="text-xs  font-light pl-2 md:text-sm lg:text-md">{job_detail?.jopo_publish_date ? (
                                            <>
                                            {(() => {
                                                const publishedDate = new Date(job_detail.jopo_publish_date);
                                                const currentDate = new Date();
                                                const timeDiff: number = Math.abs(currentDate.getTime() - publishedDate.getTime());
                                                const daysDiff: number = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                                                const createdDaysAgo: string = `Dibuat ${daysDiff} hari lalu`;
                                                return (
                                                <>
                                                    <h3 className="text-sm">{createdDaysAgo}</h3>
                                                </>
                                                );
                                            })()}
                                            </>
                                        ) : (
                                            <>
                                            <h3 className="text-sm">Baru saja dibuat</h3>
                                            </>
                                        )}</h3>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 pt-5 max-w-lg gap-4">
                                    <div className="flex items-center w-full">
                                        <Button fullWidth>
                                            Apply
                                        </Button>
                                    </div>
                                    <div className="flex items-center w-full">
                                        <Button fullWidth variant="outlined" className="flex items-center gap-3 justify-center">
                                            <ShareIcon className="h-5 w-5" /> Share
                                        </Button>
                                    </div>
                                    {/* <div className="flex items-center gap-3 w-full">
                                        <Button className="">
                                            <ShareIcon className="h-5 w-5" /> Share
                                        </Button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Section Nama Perusahaan End   */}

                {/* Section Description Start    */}
                <section className="pt-6 pb-6">
                    <div className="container">
                        <div className="flex flex-wrap">
                            <div className="w-full ">
                                <h1 className="text-lg mb-5 md:text-xl lg:text-2xl">Description</h1>
                                <p className="font-medium text-sm max-w-2xl mb-16 md:text-lg">{job_detail?.jopo_description}</p>

                                <h1 className="text-lg mb-5 md:text-xl lg:text-2xl">Primary Skills</h1>
                                <div className="flex gap-2">
                                    {job_detail?.jopo_primary_skill?.split(',').map((skill:any) => (
                                        <p
                                        className="text-base bg-blue-700 text-white rounded-lg px-2 py-1 md:px-3 lg:px-4"
                                        >
                                        {skill.trim()}
                                        </p>
                                    ))}
                                </div>
                                <h1 className="pt-5 text-lg mb-5 md:text-xl lg:text-2xl">Seconday Skills</h1>
                                <div className="flex gap-2 items-center">
                                    {job_detail?.jopo_secondary_skill?.split(',').map((skill:any) => (
                                        <p
                                        className="text-base bg-blue-700 text-white rounded-lg px-2 py-1 md:px-3 lg:px-4"
                                        >
                                        {skill.trim()}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Section Description End    */}

                {/* Section Tentang Perusahaan Start    */}
                <section className="pt-6 pb-6">
                    <div className="container">
                        <div className="flex flex-wrap">
                            <div className="w-full border border-slate-500 px-3 py-2 shadow-lg">
                                <h1 className="text-lg md:text-xl lg:text-2xl pb-6">Tentang Perusahaan</h1>
                                <div className="pb-3 md:pb-4 lg:pb-12">
                                    <img src={`http://localhost:3003/image/${job_detail?.jopho_filename}`} alt="gambar" className="float-left mr-3 object-contain w-20 pr-2 md:h-24 md:w-24 lg:h-28 lg:w-28" />
                                    <div className="grid grid-cols-1 pl-2">
                                        <h1 className="text-lg font-semibold pb-2 md:text-xl">{name}</h1>

                                        {/* Industry */}
                                        {industry.map((option:any) =>
                                        job_detail?.clit_indu_code === option.indu_code ? (
                                            <h2 key={option.indu_code} className="text-sm font-light pb-2 md:text-lg">
                                            {option.indu_name}
                                            </h2>
                                        ) : null
                                        )}

                                        {/* Employee Range */}
                                        {emp_range.map((option:any) =>
                                        job_detail?.clit_emra_id === option.emra_id ? (
                                            <h2 key={option.emra_id} className="text-sm font-light pb-2 md:text-lg">
                                            {option.emra_range_min}-{option.emra_range_max} karyawan
                                            </h2>
                                        ) : null
                                        )}
                                    </div>
                                </div>
                                <p className="text-sm max-w-xl pb-6 md:text-lg">{job_detail?.clit_about}</p>
                                <h1 className="text-lg md:text-xl lg:text-2xl pb-3">Address</h1>
                                <p className="text-sm max-w-xl pb-6 md:text-lg">{job_detail?.addr_line1}, {job_detail?.addr_line2?`${job_detail?.addr_line2},`:''} {job_detail?.city_name}</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Section Tentang Perusahaan End  */}
            </div>

            {/* Similar Jobs Start */}
            <div className="container">
                <div className="xl:pl-48 lg:pl-10 md:pl-0 py-6 md:pt-28">
                    <h1 className="text-lg font-semibold pb-3">Similar jobs for you</h1>
                    <div className="grid grid-cols-1 gap-4">
                        <CardJob currentPage={currentPage} itemsPerPage={itemsPerPage} data={job_post} filtering={{ title, id }}/>
                    </div>
                </div>
            </div>
            {/* Similar Jobs End */}
        </div>
        </>
    )

}
export default JobDetail