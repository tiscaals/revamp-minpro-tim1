import React, { useEffect } from 'react'
import Navigation from './components/navbar'
import {
    Card,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
import { HiTicket } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllParogPrapUserReq } from '../redux/bootcamp-schema/action/actionReducer';

export default function () {
    const dispatch = useDispatch()
    const {praps} = useSelector((state:any)=> state.prapsReducers)
    
    useEffect(()=>{
        dispatch(getAllParogPrapUserReq(100))
    },[])
    console.log(praps,'anjay');
  return (
    <div>
        <Navigation/>
        <div className='flex gap-3'>
          {
            praps?.map((item:any)=>(
              <>
              <Card className="mt-6 w-60">
              <CardBody>
                <HiTicket className="text-blue-500 w-12 h-12 mb-4" />
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  {item.prog_title} App
                </Typography>
                <Typography variant='small'>
                  Apply Date: {item.to_char} <br />
                  Status: {item.prap_status} <br />
                  Last Progress: {item.parog_progress_name}
                </Typography>
              </CardBody>
                </Card>
              </>
            ))
          }
        </div>
    </div>
  )
}