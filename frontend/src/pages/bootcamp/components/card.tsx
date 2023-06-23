import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineFolderOpen,
  HiOutlineUserGroup,
} from 'react-icons/hi';

import BreadcrumbsSlice from '@/pages/shared/breadcrumbs';

export default function BootcampCard({ dataCurriculum, whatWillYouLearn }) {
  const batchDate = new Date(dataCurriculum.currentBatch);
  const batchDateResult = batchDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <Card className="mt-6 w-full shadow-none">
      <BreadcrumbsSlice />
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 ">
          {dataCurriculum.name}
        </Typography>
        <Typography>{dataCurriculum.description}</Typography>
      </CardBody>
      <CardFooter className="flex justify-center lg:justify-start gap-3 lg:gap-7 pt-2 text-sm">
        <div className="lg:flex gap-2">
          <HiOutlineUserGroup className="w-5 h-5" />
          <span>{dataCurriculum.totalTalent} talents</span>
        </div>
        <div className="lg:flex gap-2">
          <HiOutlineFolderOpen className="w-5 h-5" />
          <span>{dataCurriculum.totalBatch} batches</span>
        </div>
        <div className="lg:flex gap-2">
          <HiOutlineClock className="w-5 h-5" />
          <span>{dataCurriculum.duration} months</span>
        </div>
        <div className="lg:flex gap-2">
          <HiOutlineCalendar className="w-5 h-5" />
          <span>Current batch, until {batchDateResult}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
