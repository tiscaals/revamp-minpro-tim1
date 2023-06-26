import React, { useState, useEffect } from "react";

import Image from "next/image";
import logo from "../../public/logo.png";
import courseImage from "../../public/logo.png";
import ReactPlayer from "react-player";
// import FAQ from "./components/faq";
// import Footer from "./components/footer";
import { MyPage } from "npm";
import astra from "../../public/astra.png";
import bumn from "../../public/bumn.png";
import mahaka from "../../public/mahakax.png";
import { alumniTestimoni, partnerShip } from "@/data";
import AccordionLandingPage from "./accordion";
import { useRouter } from "next/router";
import node from '../../public/node.png'
import java from '../../public/java.png'
import flutter from '../../public/flutter.png'
import dotnet from '../../public/dotnet.png'
import next from '../../public/next.png'
import { useDispatch, useSelector } from "react-redux";
import { reqGetProgName } from "@/redux/bootcampSchema/action/actionReducer";
import Footer from "./footer";

const LandingPage: MyPage = () => {
  let { progname, refresh } = useSelector((state: any) => state.prognameReducer);
  const [isClient, setIsClient] = useState(false);

  // console.log('gambar',partnerShip.gambar)

  console.log(progname)
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    setIsClient(true);
    dispatch(reqGetProgName())
  }, [refresh]);

  return (
    <div>
      <div>
        <div>
          {/* <Navbar /> */}
          <div className="grid grid-cols-2 min-h-screen bg-gray-100 p-8">
            <div className="flex flex-col justify-center" id="join">
              <h1 className="text-left text-4xl font-bold text-gray-800 mb-6">
                Upgrade Your Skills and Grasp Your Dream to Become a Software
                Engineer
              </h1>
              <p className="text-left text-xl text-gray-600 mb-8">
                Code Academy has organized over 20 coding bootcamps, empowering
                more than 250 alumni to secure positions in 33 leading
                companies.
              </p>
              <button 
              onClick={()=> router.push('bootcamp')}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg">
                Join the Bootcamp
              </button>
            </div>
            <div
              className="flex items-center justify-center w-full "
              id="alumni"
            >
              {/* Konten kolom kedua */}
              <div className="bg-white shadow-lg p-2 w-5/12 ml-3 text-sm rounded-lg">
                <Image
                  alt="logo alumni"
                  src={logo}
                  className="w-full h-28 mb-2 bg-white "
                />
                <h1>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Error esse tempore eos ipsa nulla perferendis blanditiis quam
                  tempora voluptatum
                </h1>
                <Image alt="astra" src={astra} className="w-full h-28 mb-2 " />
              </div>

              <div className="bg-white shadow-lg p-2 w-5/12 mr-3 z-2 -ml-14 -mt-20 text-sm rounded-lg">
                <Image
                  alt="logo alumni"
                  src={logo}
                  className="w-full h-28 mb-2 bg-white "
                />
                <h1>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Error esse tempore eos ipsa nulla perferendis blanditiis quam
                  tempora voluptatum
                </h1>
                <Image
                  alt="mahaka"
                  src={mahaka}
                  className="w-full h-28 mb-2 "
                />
              </div>

              <div className="bg-white shadow-lg p-2 w-5/12 -ml-20 z-3 text-sm rounded-lg">
                <Image
                  alt="logo alumni"
                  src={logo}
                  className="w-full h-28 mb-2 bg-white "
                />
                <h1>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Error esse tempore eos ipsa nulla perferendis blanditiis quam
                  tempora voluptatum
                </h1>
                <Image alt="bumn" src={bumn} className="w-full h-28 mb-2 " />
              </div>
            </div>
          </div>
          <hr className="my-8 border-t-2 border-gray-300" />

          <div className="flex flex-col items-center mt-8">
            <p className="text-2xl font-bold text-gray-800 mb-4">
              Our alumni have worked at:
            </p>
            <div className="flex justify-center">
              <div className="grid grid-cols-5 gap-16">
                {(partnerShip || []).map((item: any, index: any) => (
                  <div key={index} className="p-3 ">
                    <Image
                      alt={`${item.name}`}
                      src={item.gambar}
                      className="w-20 h-20"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr className="my-8 border-t-2 border-gray-300" />

          <p className="text-center text-2xl font-bold text-gray-800 mt-8 mb-4">
            Alumni Success Story
          </p>
          <div className="flex justify-center">
            {isClient && (
              <>
                <div style={{ margin: "0 10px" }}>
                  <ReactPlayer
                    url="https://youtu.be/o8oLQVYlpqw"
                    controls={true}
                    width="100%"
                    height="auto"
                  />
                  <p className="text-center text-gray-800 mt-2">John Doe</p>
                  <p className="text-center text-gray-600">
                    Software Engineer at ABC Company
                  </p>
                  <p className="text-center text-gray-600">
                    John Doe mengikuti bootcamp kami dan saat ini bekerja
                    sebagai software engineer di ABC Company.
                  </p>
                </div>
                <div style={{ margin: "0 10px" }}>
                  <ReactPlayer
                    url="https://youtu.be/o8oLQVYlpqw"
                    controls={true}
                    width="100%"
                    height="auto"
                  />
                  <p className="text-center text-gray-800 mt-2">John Doe</p>
                  <p className="text-center text-gray-600">
                    Software Engineer at ABC Company
                  </p>
                  <p className="text-center text-gray-600">
                    John Doe mengikuti bootcamp kami dan saat ini bekerja
                    sebagai software engineer di ABC Company.
                  </p>
                </div>
                <div style={{ margin: "0 10px" }}>
                  <ReactPlayer
                    url="https://youtu.be/o8oLQVYlpqw"
                    controls={true}
                    width="100%"
                    height="auto"
                  />
                  <p className="text-center text-gray-800 mt-2">John Doe</p>
                  <p className="text-center text-gray-600">
                    Software Engineer at ABC Company
                  </p>
                  <p className="text-center text-gray-600">
                    John Doe mengikuti bootcamp kami dan saat ini bekerja
                    sebagai software engineer di ABC Company.
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-center mt-8">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg">
              Watch More Success Stories
            </button>
          </div>

          <div className="flex flex-col items-center mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Bootcamp
            </h2>
            <p className="text-center text-xl text-gray-600">
              Kurikulum bootcamp kami sesuaikan dengan kebutuhan industri agar
              kamu selepas bootcamp siap untuk bekerja
            </p>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-40 mt-8">
              <div className="flex items-center p-2 border border-gray-300 rounded-lg max-w-xs">
                <Image
                  src={node}
                  alt="Course Image"
                  className="h-12 w-24 mr-2"
                />
                <div className="flex flex-col">
                  <p className=" font-bold text-lg text-gray-800">Nodejs Fullstack</p>
                  <p className="text-gray-600 text-sm">Learn Nodejs Technologi with our mentor</p>
                  <button
                  onClick={() => router.push('bootcamp/node js fullstack')}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-lg transition-colors duration-300 shadow-lg">
                    Curriculum
                  </button>
                </div>
              </div>

              <div className="flex items-center p-2 border border-gray-300 rounded-lg max-w-xs">
              <Image
                  src={java}
                  alt="Course Image"
                  className="h-12 w-24 mr-2"
                />
                <div className="flex flex-col">
                  <p className=" text-lg font-bold text-gray-800">Java Fullstack</p>
                  <p className="text-sm text-gray-600">Learn java lastest technology from zero to hero</p>
                  <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-lg transition-colors duration-300 shadow-lg">
                    Curriculum
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-40 mt-8">
              <div className="flex items-center p-2 border border-gray-300 rounded-lg max-w-xs">
              <Image
                  src={dotnet}
                  alt="Course Image"
                  className="h-16 w-48 mr-2"
                />
                <div className="flex flex-col">
                  <p className="text-base font-bold text-gray-800">.NET Framwork</p>
                  <p className="text-gray-600">.NET is cool technology framwork to building dekstop app and web app</p>
                  <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-lg transition-colors duration-300 shadow-lg">
                    Curriculum
                  </button>
                </div>
              </div>

              <div className="flex items-center p-2 border border-gray-300 rounded-lg max-w-xs">
                <Image
                  src={flutter}
                  alt="Course Image"
                  className="h-12 w-20 mr-2"
                />
                <div className="flex flex-col">
                  <p className="text-base font-bold text-gray-800">Flutter</p>
                  <p className="text-gray-600">Flutter is lastest technology for develop mobile app</p>
                  <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-lg transition-colors duration-300 shadow-lg">
                    Curriculum
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button onClick={() => router.push('bootcamp')} className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg">
              More Bootcamps
            </button>
          </div>

          <div className="flex flex-col items-center mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Alumni Testimony
            </h2>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-10 mt-10">
              {alumniTestimoni.map((data, index) => (
                <>
                  <div className="flex items-center p-2 border border-gray-300 rounded-lg max-w-xs">
                    <div>
                      <img
                        src={data.gambar}
                        alt={"alumniTestimoni"}
                        className="h-24 w-32 mr-2"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-lg">
                          {data.nama}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {data.batch}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 ml-auto">
                      <p className="text-xs">{data.review}</p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="flex justify-center mx-auto mt-10">
            <div className="items-center p-4 border border-gray-300 rounded-lg max-w-5xl relative h-60">
              <div className="flex-1 ml-4 flex items-center">
                {" "}
                <div>
                  <Image
                    src={courseImage}
                    alt="Course Image"
                    className="h-32 w-32 mr-4"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    Kenapa pilih Code X Academy?
                  </h2>
                  <p className="text-sm">
                    CodeId Academy telah berdiri tahun 2017 dan sekarang telah
                    mencapai 20 batch, dan telah menyalurkan lebih dari 250
                    lulusan bootcamp ke 33 perusahaan ternama. Kamu tidak usah
                    bayar, semua gratis
                  </p>
                </div>
              </div>
              <div className="flex justify-between pl-4 gap-2 h-40">
                <div className="w-1/3 border rounded-md shadow-md hover:shadow-lg transition duration-300 bg-white">
                  <h1 className="text-xl font-bold text-center">Trainer</h1>
                  <p className="text-xs text-justify px-4 py-2">
                    Trainer kami merupakan tenaga profesional yang berpengalaman
                    lebih dari 5 tahun dan tahu kebutuhan industri baik legacy
                    ataupun latest technology. Jadi kamu akan diguide bagaimana
                    menguasai coding mulai dari fundamental sampai advance
                  </p>
                </div>
                <div className="w-1/3 border rounded-md shadow-md hover:shadow-lg transition duration-300 bg-white">
                  <h1 className="text-xl font-bold text-center">Materi</h1>
                  <p className="text-xs text-justify px-4 py-2">
                    Materi di CodeId Academy telah settle dengan roadmap
                    terstruktur dan dinamis mengikuti kebutuhan industri, kamu
                    bisa belajar langsung dari trainer, kami sediakan juga
                    materi berupa video
                  </p>
                </div>
                <div className="w-1/3 border rounded-md shadow-md hover:shadow-lg transition duration-300 bg-white">
                  <h1 className="text-xl font-bold text-center">Placement</h1>
                  <p className="text-xs text-justify px-4 py-2">
                    Kami akan salurkan ke client kami ketika kamu telah selesai
                    bootcamp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Online Course
          </h2>
          <p className="text-center text-xl text-gray-600">
            Bagi kamu yang tidak punya waktu untuk mengikuti full bootcamp, kami
            menyediakan online course, dimana kamu bisa belajar kapan saja dan
            fulltime access
          </p>
        </div>
        <div>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-14 mt-8">
              <div className="flex items-center p-2 border border-gray-300 rounded-lg max-w-xs">
                <Image
                  src={flutter}
                  alt="Course Image"
                  className="h-12 w-32"
                />
                <div className="flex flex-col">
                  <p className="text-base font-bold text-gray-800">Android Development</p>
                  <p className="text-gray-600 text-sm">Flutter is lastest technology for develop mobile app</p>
                  <button onClick={() => router.push('bootcamp/online/flutter')} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-lg transition-colors duration-300 shadow-lg">
                    Curriculum
                  </button>
                </div>
              </div>

              <div className="flex items-center p-2 border border-gray-300 rounded-lg max-w-xs">
                <Image
                  src={java}
                  alt="Course Image"
                  className="h-12 w-20 mr-2"
                />
                <div className="flex flex-col">
                  <p className="text-base font-bold text-gray-800">Java OOP</p>
                  <p className="text-gray-600 text-sm">Learn java lastest technology from zero to hero</p>
                  <button onClick={() => router.push('bootcamp/online/java')} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-lg transition-colors duration-300 shadow-lg">
                    Curriculum
                  </button>
                </div>
              </div>

              <div className="flex items-center p-2 border border-gray-300 rounded-lg max-w-xs">
                <Image
                  src={node}
                  alt="Course Image"
                  className="h-12 w-20 mr-2"
                />
                <div className="flex flex-col">
                  <p className="text-base font-bold text-gray-800">Nodejs</p>
                  <p className="text-gray-600 text-sm">Learn Nodejs Technologi with our mentor</p>
                  <button onClick={() => router.push('bootcamp/online/nodejs')} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-lg transition-colors duration-300 shadow-lg">
                    Curriculum
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Frequently Askes Question
          </h2>
        </div>
        {/* <FAQ /> */}
        <AccordionLandingPage />
      </div>
      <div className="mt-8">
        <Footer />
        </div>
    </div>
  );
};

LandingPage.Layout = "Guest";
export default LandingPage;
