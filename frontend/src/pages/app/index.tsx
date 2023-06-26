import React, { useEffect, useState } from 'react';
import BreadcrumbsSlice from '../shared/breadcrumbs';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';

function Dashboard() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('settings');
  };

  const isUser = () => {
    let decoded: any;
    const token = Cookies.get('access_token');

    if (token) {
      try {
        decoded = jwt.decode(token) as JwtPayload;

        if (decoded.user_current_role == 2) {
          router.push('/');
        }

      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('tokens not found');
    }
  };

  useEffect(()=>{
    isUser();
  },[])

  return (
    <>
      <div className="h-screen">
        <div className="my-4">
          <p className="text-gray-700 text-2xl font-bold">Dashboard</p>
          <BreadcrumbsSlice />
        </div>
        <div className="rounded-sm bg-white h-96 -z-10">
          <h4 className="text-black">SETTINGS INI BUAT NYOBA BREADCRUMBS</h4>
          <Button onClick={handleButtonClick} className="bg-blue-500">
            Settings
          </Button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
