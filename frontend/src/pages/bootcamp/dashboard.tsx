import React, { useEffect, useState } from 'react'
import Navigation from './components/navbar'
import {
    Card,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  import Cookies from 'js-cookie';
  import jwt, { JwtPayload } from 'jsonwebtoken';
import { HiTicket } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllParogPrapUserReq } from '../redux/bootcamp-schema/action/actionReducer';

export default function () {
  const [decoded, setDecoded] = useState<any>()
    const dispatch = useDispatch()
    const {praps} = useSelector((state:any)=> state.prapsReducers)
    
    const token = Cookies.get('access_token')
    
    useEffect(()=>{
      if(token){
        try {
          setDecoded(jwt.decode(token) as JwtPayload)
        } catch (error) {
          console.log(error)
        }
      }else{
        console.log('token not found')
      }
    },[token])

    useEffect(()=>{
        dispatch(getAllParogPrapUserReq(decoded?.user_entity_id))
    },[token,decoded])

    console.log(decoded,'anjay');
  return (
    <div>
        <Navigation/>
        <div className='flex gap-3'>
          {
            praps.length === 0? 
            <div>data tidak ada</div>:
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