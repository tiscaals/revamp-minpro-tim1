import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

import Slider from "react-slick";
import { doRequestGetJobPhoto } from "../redux/jobhire-schema/action/actionReducer";

const ImgSlide=()=>{
  const { job_photo, refresh } = useSelector((state:any) => state.JobPostReducers,);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(doRequestGetJobPhoto())
    console.log('photo',job_photo);
  },[refresh])

  const settings = {
    arrows: false,
    autoplay: true,
    autoplayspeed: 500,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h2>Our Network</h2>
      <Slider {...settings}>
        {(job_photo || []).map((photo:any, index:any) => (
          <div
          className="p-2"
          key={index}
          >
            <div className="shadow-md bg-white h-28 rounded-md flex items-center justify-center p-2">
            <img
              src={`http://localhost:3003/image/${photo.jopho_filename}`}
              className="object-contain h-28 w-auto m-4"
              alt="profile picture"
            />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImgSlide