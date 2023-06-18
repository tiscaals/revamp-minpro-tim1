import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Avatar,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Typography,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getAllTraineesByBatchReq } from '@/pages/redux/bootcamp-schema/action/actionReducer';
import { Disclosure } from '@headlessui/react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import SkillAccordion from './components/accordion';

export default function DetailEvals() {
  const { trainees } = useSelector((state: any) => state.traineeReducers);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, batrid } = router.query;

  const [score, setScore] = useState(0);

  const getOne = trainees.filter((tr: any) => tr.batr_id == batrid);

  useEffect(() => {
    if (batrid && id) {
      dispatch(getAllTraineesByBatchReq(id));
    }
  }, [batrid, id]);

  if (trainees.length === 0) {
    return <div>Loading...</div>;
  }

  const skills = [
    {
      section: 'Technical',
      skills: [
        {name: "Fundamental", tags: "fundamental"},
        {name: "Object Oriented Programming", tags: "oop"},
        {name: "Database", tags: "database"},
      ],
    },
    {
      section: 'Softskill',
      skills: [
        {name: "Communication", tags: "communication"},
        {name: "Team Work", tags: "teamwork"},
        {name: "Selft Learning", tags: "selft_learning"},
      ],
    },
    {
      section: 'Presentation',
      skills: [
        {name: "Public Speaking", tags: "public_speaking"},
        {name: "Self Confident", tags: "self_confident"},
        {name: "Adaptation", tags: "adaptation"},
      ],
    },
  ];

  return (
    <div className="w-full">
      <div className="bg-white shadow-md dark:bg-gray-800 md:rounded-lg py-2 px-11 divide-y divide-gray-300">
        <div className="flex flex-col lg:flex-row text-center lg:text-start items-center mt-4 justify-between mb-6">
          <Typography variant="h6">
            {getOne[0].batch_name} BootCamp {getOne[0].prog_title} Evaluation
          </Typography>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between w-full pt-6 mb-5">
          <div className="lg:flex">
            <Avatar src={getOne[0].user_photo} className="w-16 h-16 mr-5" />
            <div>
              <Typography variant="small" className="italic font-bold">
                {getOne[0].full_name}
              </Typography>
              <Typography variant="small">
                {getOne[0].batch_name},{getOne[0].prog_title},
                {getOne[0].batr_status}
              </Typography>
              <Typography variant="small">
                {getOne[0].batch_start_date} until {getOne[0].batch_end_date}
              </Typography>
            </div>
          </div>
          <div>
            <Typography variant="small">{getOne[0].usdu_school}</Typography>
            <Typography variant="small">
              <p>{getOne[0].usdu_field_study}</p>
            </Typography>
            <Typography variant="small">
              <p>GPA : {getOne[0].usdu_grade}</p>
            </Typography>
          </div>
          <div>
            <Typography variant="h5">{score} / 100</Typography>
            <Typography variant="h5">Score</Typography>
          </div>
        </div>
        <SkillAccordion skills={skills}/>
      </div>
    </div>
  );
}
