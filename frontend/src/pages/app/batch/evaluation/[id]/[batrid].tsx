import React, { useEffect, useState } from 'react';
import { Avatar, Button, Typography } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getAllTraineesByBatchReq } from '@/pages/redux/bootcamp-schema/action/actionReducer';
import SkillAccordion from './components/accordion';
import SkillAccordion2 from '../../coba';
import SkillAccordion3 from '../../coba2';

export default function DetailEvals() {
  const { trainees, refresh } = useSelector(
    (state: any) => state.traineeReducers
  );
  const [isi, setIsi] = useState<any>([
    {
      section: 'Softskill',
      type: 'softskill',
      skills: [
        { name: 'Communication', tags: 'communication', week: 12 },
        { name: 'Team Work', tags: 'teamwork', week: 12 },
        { name: 'Self Learning', tags: 'selft_learning', week: 12 },
        { name: 'Problem Solving', tags: 'problem_solving', week: 12 },
      ],
    },
  ]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, batrid } = router.query;

  const [score, setScore] = useState(0);

  const getOne = trainees?.filter((tr: any) => tr.batr_id == batrid);

  // useEffect(()=>{

  // },[trainees])

  if (!trainees && trainees.length === 0 && !batrid && !id) {
    return <div>Loading...</div>;
  }

  const skills = [
    {
      section: 'Technical',
      type: 'hardskill',
      skills: [
        { name: 'Fundamental', tags: 'fundamental', week: 12 },
        { name: 'Object Oriented Programming', tags: 'oop', week: 12 },
        { name: 'Database', tags: 'database', week: 12 },
      ],
    },
    {
      section: 'Softskill',
      type: 'softskill',
      skills: [
        { name: 'Communication', tags: 'communication', week: 12 },
        { name: 'Team Work', tags: 'teamwork', week: 12 },
        { name: 'Self Learning', tags: 'selft_learning', week: 12 },
        { name: 'Problem Solving', tags: 'problem_solving', week: 12 },
      ],
    },
    {
      section: 'Presentation',
      type: 'softskill',
      skills: [
        { name: 'Public Speaking', tags: 'public_speaking', week: 12 },
        { name: 'Self Confident', tags: 'self_confident', week: 12 },
        { name: 'Adaptation', tags: 'adaptation', week: 12 },
      ],
    },
  ];
  // console.log(trainees);

  useEffect(() => {
    if (batrid && id) {
      dispatch(getAllTraineesByBatchReq(id));
    }
    console.log(skills);
  }, [batrid, id, refresh, isi]);

  const addSub = (value: any) => {
    setIsi([...isi, value]);
  };

  return (
    <div className="w-full">
      <div className="bg-white shadow-md dark:bg-gray-800 md:rounded-lg py-2 px-11 divide-y divide-gray-300">
        <div className="flex flex-col lg:flex-row text-center lg:text-start items-center mt-4 justify-between mb-6">
          <Typography variant="h6">
            {getOne[0]?.batch_name} BootCamp {getOne[0]?.prog_title} Evaluation
          </Typography>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between w-full pt-6 mb-5">
          <div className="lg:flex">
            <Avatar src={getOne[0]?.user_photo} className="w-16 h-16 mr-5" />
            <div>
              <Typography variant="small" className="italic font-bold">
                {getOne[0]?.full_name}
              </Typography>
              <Typography variant="small">
                {getOne[0]?.batch_name},{getOne[0]?.prog_title},
                {getOne[0]?.batr_status}
              </Typography>
              <Typography variant="small">
                {getOne[0]?.batch_start_date} until {getOne[0]?.batch_end_date}
              </Typography>
            </div>
          </div>
          <div>
            <Typography variant="small">{getOne[0]?.usdu_school}</Typography>
            <Typography variant="small">
              {getOne[0]?.usdu_field_study}
            </Typography>
            <Typography variant="small">
              GPA : {getOne[0]?.usdu_grade}
            </Typography>
          </div>
          <div>
            <Typography variant="h5">{score} / 100</Typography>
            <Typography variant="h5">Score</Typography>
          </div>
        </div>
        <SkillAccordion
          skills={skills}
          additionalInfo={{
            header: `${getOne[0]?.batch_name} BootCamp ${getOne[0]?.prog_title} Evaluation`,
            trainee_id: getOne[0]?.batr_trainee_entity_id,
            batch_id: getOne[0]?.batr_batch_id,
          }}
        />
        {/* <SkillAccordion2 skills={skills} additionalInfo = {{
          header: `${getOne[0]?.batch_name} BootCamp ${getOne[0]?.prog_title} Evaluation`,
          trainee_id: getOne[0]?.batr_trainee_entity_id,
          batch_id: getOne[0]?.batr_batch_id
        }}/> */}
        {/* <SkillAccordion3 skills={isi} additionalInfo = {{
          header: `${getOne[0]?.batch_name} BootCamp ${getOne[0]?.prog_title} Evaluation`,
          trainee_id: getOne[0]?.batr_trainee_entity_id,
          batch_id: getOne[0]?.batr_batch_id
        }}/> */}
      </div>
    </div>
  );
}
