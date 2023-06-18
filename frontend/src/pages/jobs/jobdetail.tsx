import React, { useEffect, useState } from "react"
import imgDummy from "../../../public/logohitam.png"
import Image from 'next/image'
import { ShareIcon, CurrencyDollarIcon, BuildingOfficeIcon, ChevronRightIcon, ClockIcon } from '@heroicons/react/24/outline'
import CardJob from "../komponen/cardjob"
import { useRouter } from "next/router"
import Header from "../shared/header"
import { useDispatch, useSelector } from "react-redux"
import { doRequestGetJobById, doRequestGetJobPost } from "../redux/jobhire-schema/action/actionReducer"
import { AiOutlineHistory } from "react-icons/ai"
import { Spinner } from "@material-tailwind/react"


const JobDetail = () => {
    const router = useRouter()
    const {id,title,name}:any=router.query
    const { job_detail, refresh } = useSelector((state:any) => state.JobPostReducers,);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = job_detail?.slice(startIndex, endIndex);

    const dispatch = useDispatch();

    useEffect(()=>{
        console.log("ID", id);
        dispatch(doRequestGetJobById(id))
        setTimeout(()=>{console.log('jopoById',job_detail)},2000)
    },[refresh,id])

    if(!id){
        return (
            <div className="relative flex min-h-screen flex-col justify-center items-center">
                <Spinner className="h-40 w-40" />
            </div>
        )
    }

    return (
        <>
        <Header/>
        <div className="container grid lg:grid-cols-2 w-3/4 mx-auto">
            <div >
                {/* Section Nama Perusahaan Start    */}
                <section className="p-8 border-b-2">
                    <div className="container">
                        <div className="flex">
                            <img src={`http://localhost:3003/image/${job_detail[0]?.jopho_filename}`} alt="gambar" className="float-left mr-3 object-contain w-20 pr-2 md:h-24 md:w-24 lg:h-28 lg:w-28" />
                            <div className="w-full">
                                <h1 className="text-lg font-semibold md:text-xl lg:text-2xl ">{title}</h1>
                                <h2 className="text-sm font-light lg:text-base">{name}</h2>
                                <div className="flex items-center">
                                    <CurrencyDollarIcon height="20" width="20" />
                                    <h3 className="text-sm font-normal pl-2 md:text-base lg:text-lg">IDR 10.000.000 - 15.000.000/month</h3>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-">
                                        <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z" clip-rule="evenodd" />
                                    </svg>

                                    <h3 className="text-sm underline text-blue-500  font-normal pl-2 md:text-base lg:text-lg">Software Enginnering</h3>
                                </div>
                                <div className="grid grid-cols-2 max-w-sm pt-2 lg:pt-4">
                                    <div className=" flex items-center">
                                        <BuildingOfficeIcon height="20" width="20" />
                                        <h3 className="text-xs font-light pl-2 md:text-sm lg:text-md">Full-Time</h3>
                                    </div>
                                    <div className=" flex  items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fill-rule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                                            <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                                        </svg>
                                        <h3 className="text-xs  font-light pl-2 md:text-sm lg:text-md">{job_detail[0]?.jopo_min_experience}-{job_detail[0]?.jopo_max_experience} tahun</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 max-w-sm pt-2 lg:pt-4">
                                    <div className=" flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                                        </svg>
                                        <h3 className="text-xs  font-light pl-2 md:text-sm lg:text-md">{job_detail[0]?.city_name}</h3>
                                    </div>
                                    <div className=" flex items-center">
                                        <ClockIcon height="20" width="20" />
                                        <h3 className="text-xs  font-light pl-2 md:text-sm lg:text-md">{job_detail[0]?.jopo_publish_date ? (
                                            <>
                                            {(() => {
                                                const publishedDate = new Date(job_detail[0].jopo_publish_date);
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
                                            <h3 className="text-sm">Dibuat 1 hari lalu</h3>
                                            </>
                                        )}</h3>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 pt-5 max-w-lg">
                                    <div className="flex items-center">
                                        <button className=" text-sm font-bold text-white px-8 py-1 bg-blue-700 shadow-md rounded-lg border border-blue-200 md:px-12 md:py-1 hover:bg-blue-500 ">
                                            Apply
                                        </button>
                                    </div>
                                    <div>
                                        <button className="flex items-center">
                                            <ShareIcon height="25" width="25" className="fill-current" />
                                            <p className="text-lg font-semibold pl-1">
                                                Share</p>
                                            <ChevronRightIcon height="20" width="20" />
                                        </button>
                                    </div>
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
                                <p className="font-medium text-sm max-w-2xl mb-16 md:text-lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam deserunt minima aliquam perspiciatis blanditiis reiciendis consequatur voluptatibus? Ex, consequatur. Id cupiditate magnam quos maxime ad reiciendis necessitatibus ab consequatur? Laudantium, possimus iure.</p>

                                <h1 className="text-lg mb-5 md:text-xl lg:text-2xl">Primary Skills</h1>
                                <div className="flex gap-2">
                                    <p className="text-base  bg-blue-700 text-white rounded-lg px-2 py-1 md:px-3 lg:px-4">Java</p>
                                    <p className="text-base  bg-blue-700 text-white rounded-lg px-2 py-1 md:px-3 lg:px-4">Javascript</p>
                                    <p className="text-base  bg-blue-700 text-white rounded-lg px-2 py-1 md:px-3 lg:px-4">React</p>
                                </div>
                                <h1 className="pt-5 text-lg mb-5 md:text-xl lg:text-2xl">Seconday Skills</h1>
                                <div className="flex gap-2 items-center">
                                    <p className="text-base  bg-blue-700 text-white rounded-lg px-2 py-1 md:px-3 lg:px-4">HTML/CSS</p>
                                    <p className="text-base  bg-blue-700 text-white rounded-lg px-2 py-1 md:px-3 lg:px-4">git</p>
                                    <p className="text-base  bg-blue-700 text-white rounded-lg px-2 py-1 md:px-3 lg:px-4">SDLC</p>
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
                                    <img src={`http://localhost:3003/image/${job_detail[0]?.jopho_filename}`} alt="gambar" className="float-left mr-3 object-contain w-20 pr-2 md:h-24 md:w-24 lg:h-28 lg:w-28" />
                                    <div className="grid grid-cols-1 pl-2">
                                        <h1 className="text-lg font-semibold pb-2 md:text-xl">PT Codeid Development</h1>
                                        <h2 className="text-sm font-light pb-2 md:text-lg">Information Technology & Service</h2>
                                        <h3 className="text-sm font-light md:text-lg">50-200 Karyawan</h3>
                                    </div>
                                </div>
                                <p className="text-sm max-w-xl pb-6 md:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam minima laborum laudantium atque minus voluptatem suscipit obcaecati architecto, dignissimos doloremque excepturi doloribus repellat quasi quidem facere amet laboriosam. Praesentium placeat possimus libero?</p>
                                <h1 className="text-lg md:text-xl lg:text-2xl pb-3">Address</h1>
                                <p className="text-sm max-w-xl pb-6 md:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio asperiores natus debitis deleniti rem dignissimos vitae?</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Section Tentang Perusahaan Start    */}
            </div>
            <div className="container">
                <div className="xl:pl-48 lg:pl-10 md:pl-0 py-6 md:pt-28">
                <h1 className="text-lg font-semibold pb-3">Similiar jobs for you</h1>
                <div className="grid grid-cols-1 gap-4">
                    <CardJob currentPage={currentPage} itemsPerPage={itemsPerPage}/>
                </div>
                </div>
            </div>
        </div>
        </>
    )

}
export default JobDetail