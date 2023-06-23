import { Fragment, useState } from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Card,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import { HiCheck } from 'react-icons/hi';

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? 'rotate-180' : ''
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Example() {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  const materialData = [
    {
      name: 'week 1',
      material: ['Conditional if', 'Iteration', 'Arrays'],
    },
    {
      name: 'week 2',
      material: [
        'Constructor',
        'Method',
        'Encapsulation',
        'Inheritance',
        'Polymorphism',
      ],
    },
    {
      name: 'week 3',
      material: ['Expressjs', 'Multer', 'Rest-api'],
    },
  ];

  return (
    <Card className="shadow-none">
      <CardBody>
        <Typography
          variant="h6"
          color="blue-gray"
          className="mb-2 font-semibold"
        >
          Bootcamp Material
        </Typography>
        {/* <Typography> */}
        <Fragment>
          {materialData.map((item, index) => (
            <Accordion
              key={index}
              open={open === index + 1}
              icon={<Icon id={index} open={open - 1} />}
            >
              <AccordionHeader
                className="text-base font-normal"
                onClick={() => handleOpen(index + 1)}
              >
                {item.name}
              </AccordionHeader>
              <AccordionBody>
                {item.material.map((dt, index) => (
                  <div key={index} className="flex gap-3">
                    {' '}
                    <HiCheck /> {dt}
                  </div>
                ))}
              </AccordionBody>
            </Accordion>
          ))}
        </Fragment>
        {/* </Typography> */}
      </CardBody>
    </Card>
  );
}
