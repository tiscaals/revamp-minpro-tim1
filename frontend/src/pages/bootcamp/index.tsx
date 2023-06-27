import React from 'react'
import Navigation from './components/navbar'
import MyCarousel from './components/carousel'
import { Input, Typography } from '@material-tailwind/react'
import { HiArrowCircleLeft, HiSearch } from 'react-icons/hi'
import Card3 from './components/bootcampcard'
import MyFooter from './components/footer'
import Testi from './components/testimonials'
import ComplexNavbar from '../shared/header_1'

export default function index() {
  const data = [
    {
      "id": 1,
      "judul": "Node.js",
      "deskripsi": "Build Rest API with Node.js",
      "durasi": "3 Bulan",
      "pembelajaran": "Online",
      "harga": "2500000"
    },
    {
      "id": 2,
      "judul": "Python",
      "deskripsi": "Develop Web Applications with Python",
      "durasi": "3 Bulan",
      "pembelajaran": "Offline",
      "harga": "3500000"
    },
    {
      "id": 3,
      "judul": "Ruby",
      "deskripsi": "Create Web Services with Ruby",
      "durasi": "3 Bulan",
      "pembelajaran": "Online",
      "harga": "2700000"
    },
    {
      "id": 4,
      "judul": "Java",
      "deskripsi": "Build Enterprise Applications with Java",
      "durasi": "3 Bulan",
      "pembelajaran": "Offline",
      "harga": "2000000"
    },
    {
      "id": 5,
      "judul": "Golang",
      "deskripsi": "Develop Scalable Applications with Golang",
      "durasi": "3 Bulan",
      "pembelajaran": "Online",
      "harga": "2300000"
    },
    {
      "id": 6,
      "judul": "PHP",
      "deskripsi": "Create Dynamic Websites with PHP",
      "durasi": "3 Bulan",
      "pembelajaran": "Offline",
      "harga": "4500000"
    },
    {
      "id": 7,
      "judul": "C#",
      "deskripsi": "Build Desktop Applications with C#",
      "durasi": "3 Bulan",
      "pembelajaran": "Online",
      "harga": "2800000"
    },
    {
      "id": 8,
      "judul": "Swift",
      "deskripsi": "Develop iOS Apps with Swift",
      "durasi": "3 Bulan",
      "pembelajaran": "Offline",
      "harga": "3600000"
    },
    {
      "id": 9,
      "judul": "Rust",
      "deskripsi": "Create Fast and Reliable Software with Rust",
      "durasi": "3 Bulan",
      "pembelajaran": "Online",
      "harga": "2100000"
    },
    {
      "id": 10,
      "judul": "JavaScript",
      "deskripsi": "Build Interactive Web Pages with JavaScript",
      "durasi": "3 Bulan",
      "pembelajaran": "Offline",
      "harga": "2900000"
    }
  ]
  return (
    <div>
        <ComplexNavbar />
        <div className='max-w-screen-xl mx-auto mt-5 '>
            <MyCarousel/>
            <br />
            <div className='flex justify-end '>
                <div className='w-1/3'>
                    <Input label="search" icon={<HiSearch/>}/>
                </div>
            </div>
            <br />
            <div>
              <Typography variant="h5" className="my-3">
                Recommended for you
              </Typography>
                  <div className='grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                    {
                      data.slice(0,5).map((item:any)=>(
                        <Card3 item={item}/>
                      ))
                    }
                  </div>
            </div>
            <br />
            <div>
              <Typography variant="h5" className="my-3">
                Recently Opened
              </Typography>
                  <div className='grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                    {
                      data.slice(5,10).map((item:any)=>(
                        <Card3 item={item}/>
                      ))
                    }
                  </div>
            </div>
            <div className='grid grid-cols-3 gap-10 mt-8'>
              <Testi/>
              <Testi/>
              <Testi/>
            </div>
        </div>
        <MyFooter/>
    </div>
  )
}
